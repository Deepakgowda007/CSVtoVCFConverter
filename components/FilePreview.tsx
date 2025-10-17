
import React from 'react';
import { Contact } from '../types';
import { CsvIcon, ArrowRightIcon } from './Icon';

interface FilePreviewProps {
  contacts: Contact[];
  fileName: string;
  onConvert: () => void;
  onCancel: () => void;
}

const PREVIEW_ROW_COUNT = 5;
const PREVIEW_HEADERS = ['fullName', 'firstName', 'lastName', 'email', 'phoneMobile', 'organization'];

export const FilePreview: React.FC<FilePreviewProps> = ({ contacts, fileName, onConvert, onCancel }) => {
  const tableHeaders = PREVIEW_HEADERS.filter(header => 
    contacts.slice(0, PREVIEW_ROW_COUNT).some(contact => contact[header])
  );
  
  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center gap-3 mb-4 text-lg font-medium text-slate-300">
        <CsvIcon className="w-6 h-6 text-sky-400"/>
        <span>{fileName}</span>
        <span className="text-sm px-2 py-1 bg-slate-700 rounded-md">{contacts.length} contacts found</span>
      </div>

      <p className="text-slate-400 mb-4">Preview of the first {Math.min(PREVIEW_ROW_COUNT, contacts.length)} contacts:</p>
      
      <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700 max-h-60 mb-6">
        <table className="w-full text-sm text-left text-slate-300">
          <thead className="text-xs text-sky-300 uppercase bg-slate-800 sticky top-0">
            <tr>
              {tableHeaders.map(header => <th key={header} scope="col" className="px-6 py-3">{header.replace(/([A-Z])/g, ' $1').trim()}</th>)}
            </tr>
          </thead>
          <tbody>
            {contacts.slice(0, PREVIEW_ROW_COUNT).map((contact, index) => (
              <tr key={index} className="bg-slate-900/30 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
                {tableHeaders.map(header => (
                  <td key={`${index}-${header}`} className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{contact[header] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-slate-600 hover:bg-slate-700 rounded-md font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConvert}
          className="px-6 py-2 bg-sky-600 hover:bg-sky-700 rounded-md font-semibold transition-colors flex items-center gap-2"
        >
          Convert to VCF
          <ArrowRightIcon className="w-5 h-5"/>
        </button>
      </div>
    </div>
  );
};
