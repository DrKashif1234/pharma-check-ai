import React from 'react';
import { Pill, Shield, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-10 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Pill className="w-4 h-4 rotate-45" />
            </div>
            <span className="font-extrabold text-base text-slate-900">PharmaCheck AI</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            An open educational platform for healthcare students, pharmacy learners, and clinicians to explore drug interactions, mechanisms of action, and clinical monitoring considerations.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Verified Clinical References
          </h4>
          <ul className="space-y-1.5 text-slate-600 font-medium">
            <li>• Stockley's Drug Interactions (12th Edition)</li>
            <li>• FDA Drug Safety Communications & Boxed Warnings</li>
            <li>• AHA/ACC Cardiovascular Clinical Practice Guidelines</li>
            <li>• Lexicomp Clinical Drug Reference</li>
            <li>• EHRA Practical Guide on Direct Oral Anticoagulants</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-amber-600" />
            Safety & Deployment Notice
          </h4>
          <p className="text-slate-600 leading-relaxed mb-3 font-medium">
            This tool does not collect or store patient health information (PHI) or personal identifiers. Ready for single-click deployment via GitHub to Vercel or Netlify.
          </p>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <span>Vercel / Netlify Compatible</span>
            <span>•</span>
            <span>Serverless Ready</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
        <p>© 2026 PharmaCheck AI. Educational & Learning Resource.</p>
        <p className="text-[11px] text-slate-500">
          Always consult a licensed medical professional for patient-specific therapeutic decisions.
        </p>
      </div>
    </footer>
  );
};
