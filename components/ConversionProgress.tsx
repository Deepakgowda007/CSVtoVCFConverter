
import React from 'react';

interface ConversionProgressProps {
  statusText: string;
}

export const ConversionProgress: React.FC<ConversionProgressProps> = ({ statusText }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 w-full animate-fade-in">
       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-400 mb-6"></div>
       <p className="text-xl font-semibold text-slate-300">{statusText}</p>
    </div>
  );
};
