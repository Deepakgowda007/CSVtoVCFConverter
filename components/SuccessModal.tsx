import React from 'react';
import { DownloadIcon, XMarkIcon, CheckCircleIcon } from './Icon';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  conversionType: 'single' | 'multiple';
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onDownload, conversionType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-200 border border-slate-700">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
            <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">VCF Ready!</h2>
            <p className="text-slate-400 mb-8">
                Your contacts have been successfully converted. You can now download your {conversionType === 'single' ? 'VCF file' : 'ZIP archive'}.
            </p>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => {
                        onDownload();
                        onClose();
                    }}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
                >
                    <DownloadIcon className="w-6 h-6" />
                    Download {conversionType === 'single' ? '.vcf' : '.zip'}
                </button>
                
                <button 
                    onClick={onClose}
                    className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
