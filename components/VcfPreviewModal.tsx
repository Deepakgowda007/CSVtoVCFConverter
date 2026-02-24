import React from 'react';
import { Contact } from '../types';
import { XMarkIcon } from './Icon';

interface VcfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}

export const VcfPreviewModal: React.FC<VcfPreviewModalProps> = ({ isOpen, onClose, contact }) => {
  if (!isOpen || !contact) return null;

  const initials = (contact.firstName?.[0] || '') + (contact.lastName?.[0] || '');
  const fullName = [contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-br from-sky-500 to-blue-600 relative">
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 rounded-full text-white transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>

        {/* Avatar & Name */}
        <div className="px-6 relative -mt-12 text-center">
            <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold text-slate-500 shadow-md">
                {initials.toUpperCase() || '?'}
            </div>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">{fullName || 'Unnamed Contact'}</h2>
            {contact.organization && (
                <p className="text-slate-500 font-medium">{contact.organization}</p>
            )}
            {contact.jobTitle && (
                <p className="text-slate-400 text-sm">{contact.jobTitle}</p>
            )}
        </div>

        {/* Contact Details List */}
        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
            {contact.phoneMobile && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Mobile</p>
                        <p className="text-slate-700 font-medium">{contact.phoneMobile}</p>
                    </div>
                </div>
            )}

            {contact.email && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</p>
                        <p className="text-slate-700 font-medium break-all">{contact.email}</p>
                    </div>
                </div>
            )}

            {(contact.street || contact.city || contact.state || contact.zip || contact.country) && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Address</p>
                        <p className="text-slate-700 font-medium">
                            {[contact.street, contact.city, contact.state, contact.zip, contact.country].filter(Boolean).join(', ')}
                        </p>
                    </div>
                </div>
            )}
            
            {contact.website && (
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1011.476 0 11.288 11.288 0 00-11.476 0zM12 20.25a8.25 8.25 0 01-6.38-12.63 9.79 9.79 0 0112.76 0A8.25 8.25 0 0112 20.25z" clipRule="evenodd" />
                            <path d="M12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Website</p>
                        <p className="text-slate-700 font-medium truncate">{contact.website}</p>
                    </div>
                </div>
            )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Preview of generated VCF card</p>
        </div>
      </div>
    </div>
  );
};
