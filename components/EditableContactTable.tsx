import React from 'react';
import { Contact } from '../types';
import { TrashIcon } from './Icon';

interface EditableContactTableProps {
  contacts: Contact[];
  onContactChange: (index: number, field: keyof Contact, value: string) => void;
  onDeleteRow: (index: number) => void;
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

const MemoizedEditableContactTable: React.FC<EditableContactTableProps> = ({ contacts, onContactChange, onDeleteRow, errors }) => {

  const hasError = (rowIndex: number, field: keyof Contact) => {
    return errors.some(err => err.rowIndex === rowIndex && err.field === field);
  };

  return (
    <div className="overflow-x-auto bg-slate-900/50 rounded-lg border border-slate-700 max-h-96">
      <table className="w-full text-sm text-left text-slate-300 table-fixed">
        <thead className="text-xs text-sky-300 uppercase bg-slate-800 sticky top-0 z-10">
          <tr>
            {tableHeaders.map(({ label, key }) => (
              <th key={key} scope="col" className="px-4 py-3 w-1/6">{label}</th>
            ))}
            <th scope="col" className="px-4 py-3 w-[50px]"><span className="sr-only">Delete</span></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index} className="bg-slate-900/30 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50">
              {tableHeaders.map(({ key }) => (
                <td key={key} className="p-1">
                  <input
                    type="text"
                    value={contact[key] || ''}
                    onChange={(e) => onContactChange(index, key, e.target.value)}
                    placeholder={key === 'firstName' || key === 'phoneMobile' ? 'Required' : 'Optional'}
                    className={`w-full px-3 py-2 bg-transparent border-2 rounded-md transition-colors focus:outline-none focus:border-sky-500 focus:bg-slate-700
                      ${hasError(index, key) ? 'border-red-500 placeholder-red-400/70' : 'border-transparent placeholder-slate-500'}`
                    }
                  />
                </td>
              ))}
              <td className="text-center p-1">
                {contacts.length > 1 && (
                    <button onClick={() => onDeleteRow(index)} className="p-2 text-slate-500 hover:text-red-400 rounded-md transition-colors">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const EditableContactTable = React.memo(MemoizedEditableContactTable);
