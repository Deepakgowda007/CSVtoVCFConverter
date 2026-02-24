import React from 'react';
import { Contact } from '../types';
import { XMarkIcon, EraserIcon } from './Icon';

interface ClearColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearColumn: (key: keyof Contact) => void;
}

const columns: { label: string; key: keyof Contact }[] = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone', key: 'phoneMobile' },
  { label: 'Email', key: 'email' },
  { label: 'Organization', key: 'organization' },
  { label: 'Group', key: 'group' },
];

export const ClearColumnModal: React.FC<ClearColumnModalProps> = ({ isOpen, onClose, onClearColumn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200 border border-slate-700">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
            <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <EraserIcon className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Clear Column Data</h2>
            <p className="text-slate-400 text-sm">
                Select a column to clear all its data. This action cannot be undone.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
            {columns.map((col) => (
                <button
                    key={col.key}
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to clear all ${col.label}s?`)) {
                            onClearColumn(col.key);
                            onClose();
                        }
                    }}
                    className="p-3 bg-slate-700 hover:bg-red-900/30 hover:ring-1 hover:ring-red-500/50 rounded-xl text-slate-200 hover:text-red-200 transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                    {col.label}
                </button>
            ))}
        </div>
        
        <button 
            onClick={onClose}
            className="w-full mt-6 py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg font-medium transition-colors text-sm"
        >
            Cancel
        </button>
      </div>
    </div>
  );
};
