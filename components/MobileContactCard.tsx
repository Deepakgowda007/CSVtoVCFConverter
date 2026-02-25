import React from 'react';
import { Contact } from '../types';
import { TrashIcon } from './Icon';

interface MobileContactCardProps {
  contact: Contact;
  index: number;
  onEdit: (index: number, field: keyof Contact, value: string) => void;
  onDelete: (index: number) => void;
  errors: { rowIndex: number; field: keyof Contact }[];
}

export const MobileContactCard: React.FC<MobileContactCardProps> = ({
  contact,
  index,
  onEdit,
  onDelete,
  errors
}) => {
  const hasError = (field: keyof Contact) => {
    return errors.some(e => e.rowIndex === index && e.field === field);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-3 border border-slate-700">
      {/* Contact Number Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sky-400 font-semibold">Contact {index + 1}</span>
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-red-400 hover:bg-red-900/20 rounded-md transition-colors"
          aria-label="Delete contact"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        {/* First Name */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={contact.firstName || ''}
            onChange={(e) => onEdit(index, 'firstName', e.target.value)}
            placeholder="John"
            className={`w-full px-3 py-3 bg-slate-900 border rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base ${
              hasError('firstName') ? 'border-red-500' : 'border-slate-600'
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Last Name</label>
          <input
            type="text"
            value={contact.lastName || ''}
            onChange={(e) => onEdit(index, 'lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-3 py-3 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={contact.phoneMobile || ''}
            onChange={(e) => onEdit(index, 'phoneMobile', e.target.value)}
            placeholder="+1234567890"
            className={`w-full px-3 py-3 bg-slate-900 border rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base ${
              hasError('phoneMobile') ? 'border-red-500' : 'border-slate-600'
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Email</label>
          <input
            type="email"
            value={contact.email || ''}
            onChange={(e) => onEdit(index, 'email', e.target.value)}
            placeholder="john@example.com"
            className="w-full px-3 py-3 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
          />
        </div>

        {/* Organization */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Organization</label>
          <input
            type="text"
            value={contact.organization || ''}
            onChange={(e) => onEdit(index, 'organization', e.target.value)}
            placeholder="Company Name"
            className="w-full px-3 py-3 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
          />
        </div>

        {/* Group */}
        <div>
          <label className="block text-xs text-slate-400 mb-1">Group</label>
          <input
            type="text"
            value={contact.group || ''}
            onChange={(e) => onEdit(index, 'group', e.target.value)}
            placeholder="Friends, Family, Work"
            className="w-full px-3 py-3 bg-slate-900 border border-slate-600 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
          />
        </div>
      </div>
    </div>
  );
};
