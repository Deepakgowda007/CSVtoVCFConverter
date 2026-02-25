import React, { useState, useCallback, useRef } from 'react';
import { parseCsv, generateSingleVcf, generateVcf } from './services/vcfService';
import { Contact } from './types';
import { CsvIcon, PlusIcon, ArrowRightIcon, DownloadIcon, RefreshIcon } from './components/Icon';
import { MobileContactCard } from './components/MobileContactCard';
import { SuccessModal } from './components/SuccessModal';

// Add JSZip to the window scope for TypeScript
declare const JSZip: any;

const AppMobile: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([{}]);
  const [conversionType, setConversionType] = useState<'single' | 'multiple'>('single');
  const [errors, setErrors] = useState<{ rowIndex: number; field: keyof Contact }[]>([]);
  const [isConverted, setIsConverted] = useState(false);
  const [vcfOutput, setVcfOutput] = useState<{ single: string; multiple: { name: string; content: string }[] }>({ single: '', multiple: [] });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setContacts([{}]);
    setErrors([]);
    setIsConverted(false);
    setVcfOutput({ single: '', multiple: [] });
    setShowSuccessModal(false);
  };
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    resetState();

    try {
      const text = await file.text();
      const parsedContacts = parseCsv(text);
      
      if (parsedContacts.length > 0) {
        setContacts(parsedContacts);
      } else {
        alert("No valid contacts found in CSV. Please ensure your CSV has headers like 'First Name', 'Last Name', 'Phone', etc.");
        setContacts([{}]);
      }
    } catch (e) {
      console.error("Failed to parse CSV", e);
      alert("Failed to parse the CSV file. Please ensure it is a valid CSV format.");
      setContacts([{}]);
    }

    event.target.value = '';
  };
  
  const handleContactChange = useCallback((index: number, field: keyof Contact, value: string) => {
    setContacts(prev => {
      const newContacts = [...prev];
      newContacts[index] = { ...newContacts[index], [field]: value };
      return newContacts;
    });
    setIsConverted(false);
  }, []);

  const handleAddRow = useCallback(() => {
    setContacts(prev => [...prev, {}]);
  }, []);

  const handleDeleteRow = useCallback((index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
    setIsConverted(false);
  }, []);

  const handleClearAll = useCallback(() => {
    resetState();
  }, []);

  const handleConvert = useCallback(() => {
    setErrors([]);
    const newErrors: { rowIndex: number; field: keyof Contact }[] = [];
    const nonEmptyContacts = contacts.filter(c => Object.keys(c).some(k => c[k as keyof Contact]));

    if (nonEmptyContacts.length === 0) {
      alert("Please add at least one contact to convert.");
      return;
    }

    nonEmptyContacts.forEach((contact, index) => {
      if (!contact.firstName) {
        newErrors.push({ rowIndex: index, field: 'firstName' });
      }
      if (!contact.phoneMobile) {
        newErrors.push({ rowIndex: index, field: 'phoneMobile' });
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      alert("Please fill in First Name and Phone for all contacts.");
      return;
    }

    const singleVcfContent = generateVcf(nonEmptyContacts);
    const multipleVcfContent = nonEmptyContacts.map(contact => {
        const safeFirstName = contact.firstName?.replace(/[^a-z0-9]/gi, '_') || 'contact';
        const safeLastName = contact.lastName?.replace(/[^a-z0-9]/gi, '_') || '';
        const fileName = `${safeFirstName}${safeLastName ? `_${safeLastName}` : ''}.vcf`;
        return {
            name: fileName,
            content: generateSingleVcf(contact),
        };
    });

    setVcfOutput({ single: singleVcfContent, multiple: multipleVcfContent });
    setIsConverted(true);
    setShowSuccessModal(true);

  }, [contacts]);
  
  const handleDownload = async () => {
    if (!isConverted) return;

    if (conversionType === 'single') {
        const blob = new Blob([vcfOutput.single], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.vcf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        const zip = new JSZip();
        vcfOutput.multiple.forEach(file => {
            zip.file(file.name, file.content);
        });
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contacts.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      {/* Header - Fixed */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 px-4 py-4">
        <div className="flex items-center justify-center gap-3">
          <CsvIcon className="w-8 h-8 text-sky-400" />
          <h1 className="text-xl font-bold tracking-tight text-slate-100">CSV to VCF</h1>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="px-4 py-4">
        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            accept=".csv" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="w-full px-4 py-4 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-base active:scale-95"
          >
            <CsvIcon className="w-5 h-5" /> Import CSV
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={handleAddRow} 
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <PlusIcon className="w-5 h-5" /> Add Contact
            </button>
            <button 
              onClick={handleClearAll} 
              className="flex-1 px-4 py-3 bg-red-800 hover:bg-red-900 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm active:scale-95"
            >
              <RefreshIcon className="w-5 h-5" /> Clear All
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-3">
            Contacts ({contacts.length})
          </h2>
          {contacts.map((contact, index) => (
            <MobileContactCard
              key={index}
              contact={contact}
              index={index}
              onEdit={handleContactChange}
              onDelete={handleDeleteRow}
              errors={errors}
            />
          ))}
        </div>

        {/* Conversion Options */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6 border border-slate-700">
          <h3 className="font-semibold text-slate-200 mb-3">Export Format</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-900 rounded-lg border border-slate-700">
              <input 
                type="radio" 
                name="conversionType" 
                value="single" 
                checked={conversionType === 'single'} 
                onChange={() => setConversionType('single')} 
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <div className="font-medium">Single File</div>
                <div className="text-xs text-slate-400">All contacts in one .vcf file</div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-900 rounded-lg border border-slate-700">
              <input 
                type="radio" 
                name="conversionType" 
                value="multiple" 
                checked={conversionType === 'multiple'} 
                onChange={() => setConversionType('multiple')} 
                className="w-5 h-5 text-sky-500 focus:ring-sky-500"
              />
              <div>
                <div className="font-medium">Multiple Files</div>
                <div className="text-xs text-slate-400">Separate .vcf files in .zip</div>
              </div>
            </label>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 px-4 py-3">
        <div className="flex gap-3">
          <button 
            onClick={handleConvert} 
            className="flex-1 px-4 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-base active:scale-95"
          >
            Convert to VCF
            <ArrowRightIcon className="w-5 h-5"/>
          </button>
          <button 
            onClick={handleDownload} 
            disabled={!isConverted} 
            className="flex-1 px-4 py-4 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed text-base active:scale-95 disabled:active:scale-100"
          >
            <DownloadIcon className="w-5 h-5"/>
            Download
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center px-4 py-6 text-slate-500 text-xs">
        <p className="mb-1">🔒 100% Offline & Secure</p>
        <p>
          Built as part of{' '}
          <a 
            href="https://vibecodeforgood-18492.web.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sky-400 font-semibold"
          >
            VibeCodeForGood
          </a>
        </p>
      </footer>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onDownload={handleDownload}
        conversionType={conversionType}
      />
    </div>
  );
};

export default AppMobile;
