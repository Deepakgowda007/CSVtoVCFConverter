
import React, { useCallback } from 'react';
import { CheckCircleIcon, DownloadIcon, RefreshIcon } from './Icon';

interface ResultsViewProps {
  vcfContent: string;
  fileName: string;
  contactCount: number;
  processingTime: number;
  onConvertAnother: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ vcfContent, fileName, contactCount, processingTime, onConvertAnother }) => {

  const handleDownload = useCallback(() => {
    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [vcfContent, fileName]);

  return (
    <div className="text-center p-8 w-full animate-fade-in">
      <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto mb-4" />
      <h2 className="text-3xl font-bold text-slate-100 mb-2">Conversion Successful!</h2>
      <p className="text-slate-400 mb-6">
        Successfully converted <span className="font-semibold text-sky-300">{contactCount}</span> contacts in <span className="font-semibold text-sky-300">{(processingTime / 1000).toFixed(2)}</span> seconds.
      </p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onConvertAnother}
          className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold transition-colors flex items-center gap-2"
        >
          <RefreshIcon className="w-5 h-5"/>
          Convert Another File
        </button>
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md font-bold text-lg transition-colors flex items-center gap-2"
        >
          <DownloadIcon className="w-6 h-6"/>
          Download .vcf File
        </button>
      </div>
    </div>
  );
};
