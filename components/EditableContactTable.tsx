import React from 'react';
import { Contact } from '../types';
import { TrashIcon, EyeIcon } from './Icon';

interface EditableContactTableProps {
  contacts: Contact[];
  onContactChange: (index: number, field: keyof Contact, value: string) => void;
  onBulkChange: (contacts: Contact[]) => void;
  onDeleteRow: (index: number) => void;
  onClearColumn: (key: keyof Contact) => void;
  onPreview: (contact: Contact) => void;
  errors: { rowIndex: number; field: keyof Contact }[];
}

const tableHeaders: { label: string; key: keyof Contact }[] = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone', key: 'phoneMobile' },
  { label: 'Email', key: 'email' },
  { label: 'Organization', key: 'organization' },
  { label: 'Group', key: 'group' },
];

const MemoizedEditableContactTable: React.FC<EditableContactTableProps> = ({ contacts, onContactChange, onBulkChange, onDeleteRow, onClearColumn, onPreview, errors }) => {

  const hasError = (rowIndex: number, field: keyof Contact) => {
    return errors.some(err => err.rowIndex === rowIndex && err.field === field);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, rowIndex: number, colKey: keyof Contact) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData('text');
    if (!clipboardData) return;

    // Split by newline to get rows (handling different OS line endings and Excel copy behavior)
    let rows = clipboardData.split(/\r\n|\n|\r/);
    
    // Excel often adds a trailing newline, remove it if empty
    if (rows.length > 0 && rows[rows.length - 1] === '') {
        rows.pop();
    }
    
    if (rows.length === 0) return;

    const startColIndex = tableHeaders.findIndex(h => h.key === colKey);
    if (startColIndex === -1) return;

    // Deep copy not strictly necessary as we are replacing objects, but good practice
    const newContacts = [...contacts];

    rows.forEach((row, rIdx) => {
        const targetRowIndex = rowIndex + rIdx;
        
        // Extend contacts array if needed, filling gaps to prevent sparse arrays
        while (newContacts.length <= targetRowIndex) {
            newContacts.push({});
        }

        const cells = row.split('\t');

        cells.forEach((cellValue, cIdx) => {
            const targetColIndex = startColIndex + cIdx;
            
            // Ensure column is within bounds of our defined headers
            if (targetColIndex < tableHeaders.length) {
                const targetKey = tableHeaders[targetColIndex].key;
                
                // Update the specific field
                newContacts[targetRowIndex] = {
                    ...newContacts[targetRowIndex],
                    [targetKey]: cellValue.trim()
                };
            }
        });
    });

    onBulkChange(newContacts);
  };

  return (
    <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700 max-h-96 shadow-inner">
      <table className="w-full text-sm text-left text-slate-300 table-fixed border-collapse">
        <thead className="text-xs text-sky-300 uppercase bg-slate-800 sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-4 py-3 w-10 text-slate-500 border-b border-slate-700 font-normal">#</th>
            {tableHeaders.map(({ label, key }) => (
              <th key={key} scope="col" className="px-4 py-3 w-1/6 border-b border-l border-slate-700 first:border-l-0 group">
                <div className="flex items-center justify-between">
                    <span>{label}</span>
                    <button 
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to clear all data in the "${label}" column?`)) {
                                onClearColumn(key);
                            }
                        }}
                        className="text-slate-600 hover:text-red-400 opacity-50 hover:opacity-100 transition-opacity p-1"
                        title={`Clear all ${label}`}
                    >
                        <TrashIcon className="w-3 h-3" />
                    </button>
                </div>
              </th>
            ))}
            <th scope="col" className="px-4 py-3 w-[80px] border-b border-l border-slate-700 text-center">Preview</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
              <td className="text-center text-xs text-slate-600 border-r border-slate-700/50 select-none">
                {index + 1}
              </td>
              {tableHeaders.map(({ key }) => (
                <td key={key} className="p-0 border-r border-b border-slate-700/50 last:border-r-0 relative">
                  <input
                    type="text"
                    value={contact[key] || ''}
                    onChange={(e) => onContactChange(index, key, e.target.value)}
                    onPaste={(e) => handlePaste(e, index, key)}
                    placeholder={index === 0 ? (key === 'firstName' || key === 'phoneMobile' ? 'Required' : 'Optional') : ''}
                    className={`w-full h-full px-3 py-2.5 bg-transparent rounded-none transition-colors focus:outline-none focus:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-sky-500 focus:z-10
                      ${hasError(index, key) ? 'bg-red-900/10 text-red-200 placeholder-red-400/50 ring-1 ring-inset ring-red-500/50' : 'placeholder-slate-600'}`
                    }
                  />
                </td>
              ))}
              <td className="text-center p-0 border-b border-slate-700/50">
                <div className="flex items-center justify-center h-full">
                    <button 
                        onClick={() => onPreview(contact)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-sky-400 hover:bg-sky-900/20 transition-colors rounded-md mx-1"
                        title="Preview VCF Card"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </button>
                    {contacts.length > 1 && (
                        <button 
                            onClick={() => onDeleteRow(index)} 
                            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-900/20 transition-colors rounded-md mx-1"
                            title="Delete row"
                        >
                            <TrashIcon className="w-4 h-4"/>
                        </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const EditableContactTable = React.memo(MemoizedEditableContactTable);