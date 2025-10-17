import React, { useState, useCallback, useRef } from 'react';
import { parseCsv, generateSingleVcf, generateVcf } from './services/vcfService';
import { Contact } from './types';
import { CsvIcon, PlusIcon, TrashIcon, ArrowRightIcon, DownloadIcon, RefreshIcon } from './components/Icon';
import { EditableContactTable } from './components/EditableContactTable';

// Add JSZip to the window scope for TypeScript
declare const JSZip: any;

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([{}]);
  const [conversionType, setConversionType] = useState<'single' | 'multiple'>('single');
  const [errors, setErrors] = useState<{ rowIndex: number; field: keyof Contact }[]>([]);
  const [isConverted, setIsConverted] = useState(false);
  const [vcfOutput, setVcfOutput] = useState<{ single: string; multiple: { name: string; content: string }[] }>({ single: '', multiple: [] });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setContacts([{}]);
    setErrors([]);
    setIsConverted(false);
    setVcfOutput({ single: '', multiple: [] });
  };
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    resetState();

    try {
      const text = await file.text();
      const parsedContacts = parseCsv(text);
      setContacts(parsedContacts.length > 0 ? parsedContacts : [{}]);
    } catch (e) {
      console.error("Failed to parse CSV", e);
      // You could set an error state here to show a banner
      setContacts([{}]);
    }

    // Reset file input to allow re-uploading the same file
    event.target.value = '';
  };
  
  const handleContactChange = useCallback((index: number, field: keyof Contact, value: string) => {
    setContacts(prev => {
      const newContacts = [...prev];
      newContacts[index] = { ...newContacts[index], [field]: value };
      return newContacts;
    });
    setIsConverted(false); // New edits require reconversion
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

    alert('Your file(s) have been downloaded to your default "Downloads" folder.');
  };


  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <CsvIcon className="w-12 h-12 text-sky-400" />
            <h1 className="text-4xl font-bold tracking-tight text-slate-100">CSV to VCF Converter</h1>
          </div>
          <p className="text-lg text-slate-400">
            Import, edit, and convert your contacts securely offline.
          </p>
        </header>

        <main className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6">
            <div className="flex items-center gap-4 mb-4">
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".csv" className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-md font-semibold transition-colors flex items-center gap-2">
                    <CsvIcon className="w-5 h-5" /> Import CSV
                </button>
                <button onClick={handleAddRow} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold transition-colors flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" /> Add Row
                </button>
                <button onClick={handleClearAll} className="px-4 py-2 bg-red-800 hover:bg-red-900 rounded-md font-semibold transition-colors flex items-center gap-2">
                    <RefreshIcon className="w-5 h-5" /> Clear All
                </button>
            </div>
            
            <EditableContactTable 
                contacts={contacts}
                onContactChange={handleContactChange}
                onDeleteRow={handleDeleteRow}
                errors={errors}
            />

            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700 flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-slate-200 mb-2">Conversion Options</h3>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="conversionType" value="single" checked={conversionType === 'single'} onChange={() => setConversionType('single')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500"/>
                            <span>Single File (.vcf)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="conversionType" value="multiple" checked={conversionType === 'multiple'} onChange={() => setConversionType('multiple')} className="form-radio bg-slate-700 border-slate-500 text-sky-500 focus:ring-sky-500"/>
                            <span>Multiple Files (.zip)</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <button onClick={handleConvert} className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold transition-colors flex items-center gap-2">
                        Convert to VCF
                        <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                    <button onClick={handleDownload} disabled={!isConverted} className="px-6 py-2 bg-sky-600 hover:bg-sky-700 rounded-md font-semibold transition-colors flex items-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed">
                        <DownloadIcon className="w-5 h-5"/>
                        Download
                    </button>
                </div>
            </div>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>✅ 100% Offline & Secure — No Internet Required.</p>
          <p>
            By <a href="https://github.com/Deepakgowda007" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">deepakgowda</a>.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;