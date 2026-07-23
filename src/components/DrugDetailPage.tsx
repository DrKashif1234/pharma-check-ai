import React from 'react';
import { Drug } from '../types';
import { INTERACTIONS_DATA } from '../data/interactions';
import { X, BookOpen, AlertTriangle, ShieldAlert, ArrowRight, Pill, Activity, CheckCircle2 } from 'lucide-react';

interface DrugDetailPageProps {
  drug: Drug;
  onClose: () => void;
  onCheckInteractionWithDrug: (drugName: string) => void;
  onSelectPair: (drugs: string[]) => void;
}

export const DrugDetailPage: React.FC<DrugDetailPageProps> = ({
  drug,
  onClose,
  onCheckInteractionWithDrug,
  onSelectPair
}) => {
  // Find known interactions involving this drug
  const drugIdLower = drug.id.toLowerCase();
  const genericLower = drug.generic_name.toLowerCase();

  const knownInteractions = INTERACTIONS_DATA.filter(item => {
    const a = item.drug_a.toLowerCase();
    const b = item.drug_b.toLowerCase();
    return a === drugIdLower || a === genericLower || b === drugIdLower || b === genericLower;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8 relative text-slate-800">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Drug Header */}
        <div className="flex items-start gap-4 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Pill className="w-6 h-6 rotate-45" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">{drug.generic_name}</h2>
              {drug.brand_names.length > 0 && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Brand: {drug.brand_names.join(', ')}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">{drug.drug_class}</span>
              <span>•</span>
              <span>{drug.pharmacological_class}</span>
              <span>•</span>
              <span>{drug.therapeutic_class}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => onCheckInteractionWithDrug(drug.generic_name)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Check Interactions for {drug.generic_name}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mechanism of Action */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            Mechanism of Action
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {drug.mechanism}
          </p>
        </div>

        {/* Indications / Common Uses */}
        <div className="space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Common Clinical Indications
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
            {drug.common_uses.map((use, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Adverse Effects & Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Common Adverse Effects
            </h3>
            <ul className="space-y-1 text-xs text-slate-700">
              {drug.adverse_effects.map((ae, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{ae}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Important Warnings & Black Box
            </h3>
            <ul className="space-y-1 text-xs text-slate-700">
              {drug.warnings.map((warn, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{warn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documented Interactions List */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Documented Interactions in Database ({knownInteractions.length})
          </h3>

          {knownInteractions.length === 0 ? (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              No specific pairs documented for this drug in the sample dataset. Use the Interaction Checker for custom combinations.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {knownInteractions.map((item) => {
                const partnerName = item.drug_a.toLowerCase() === genericLower || item.drug_a.toLowerCase() === drugIdLower
                  ? item.drug_b
                  : item.drug_a;

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectPair([drug.generic_name, partnerName])}
                    className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 capitalize">
                          {drug.generic_name} + {partnerName}
                        </span>
                      </div>
                      <span className="text-[10px] text-red-600 font-bold uppercase">
                        Severity: {item.severity}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Close Button Footer */}
        <div className="pt-2 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Close Detail
          </button>
        </div>
      </div>
    </div>
  );
};
