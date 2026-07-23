import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50/90 border-b border-amber-200/80 text-amber-900 text-xs px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Educational & Informational Purpose Only:</strong> This tool is designed primarily for pharmacy students and healthcare learners. It is not a substitute for professional medical advice, clinical judgment, or consultation with a qualified pharmacist or physician.
        </p>
      </div>
    </div>
  );
};
