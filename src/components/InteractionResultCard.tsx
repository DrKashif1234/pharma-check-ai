import React from 'react';
import { Interaction, Drug, SeverityLevel } from '../types';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, Star, Sparkles, BookOpen, Activity, ShieldAlert, GraduationCap } from 'lucide-react';

interface InteractionResultCardProps {
  drug1: Drug | { generic_name: string };
  drug2: Drug | { generic_name: string };
  interaction?: Interaction;
  isFav: boolean;
  onToggleFav: () => void;
  onExplainAI: (drugs: string[], interaction?: Interaction) => void;
  studentMode: boolean;
}

export const InteractionResultCard: React.FC<InteractionResultCardProps> = ({
  drug1,
  drug2,
  interaction,
  isFav,
  onToggleFav,
  onExplainAI,
  studentMode
}) => {
  const name1 = 'generic_name' in drug1 ? drug1.generic_name : String(drug1);
  const name2 = 'generic_name' in drug2 ? drug2.generic_name : String(drug2);
  const pairNames = [name1, name2];

  if (!interaction) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                {name1} + {name2}
              </h3>
              <p className="text-xs text-slate-500">Pairwise Interaction Check</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No significant interaction identified
            </span>

            <button
              onClick={onToggleFav}
              className={`p-2 rounded-xl border transition-colors ${
                isFav
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
              }`}
              title={isFav ? "Remove Bookmark" : "Bookmark Combination"}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          No well-documented major or moderate pharmacokinetic or pharmacodynamic interactions were found between <strong>{name1}</strong> and <strong>{name2}</strong> in our current clinical database.
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">Source: Verified Standard Pharmacology Database</span>
          <button
            onClick={() => onExplainAI(pairNames, undefined)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs transition-colors shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-300" />
            Explain with AI
          </button>
        </div>
      </div>
    );
  }

  // Severity styling for Clean Utility / Minimal Theme
  const severityConfig: Record<SeverityLevel, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
    'Major': {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: <AlertOctagon className="w-4 h-4 text-red-600" />
    },
    'Moderate': {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    'Minor': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: <Info className="w-4 h-4 text-blue-600" />
    },
    'No significant interaction identified': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    }
  };

  const currentSev = severityConfig[interaction.severity] || severityConfig['Moderate'];

  return (
    <div className={`bg-white border ${interaction.severity === 'Major' ? 'border-red-200 shadow-sm' : 'border-slate-200 shadow-sm'} rounded-2xl p-6 space-y-6`}>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {interaction.interaction_type}
            </span>
            <span className="text-xs text-slate-400 font-mono">ID: {interaction.id}</span>
          </div>

          <h3 className="font-extrabold text-xl text-slate-900">
            {name1} + {name2}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${currentSev.bg} ${currentSev.text} ${currentSev.border}`}>
            {currentSev.icon}
            <span>Severity: {interaction.severity}</span>
          </div>

          <button
            onClick={onToggleFav}
            className={`p-2.5 rounded-xl border transition-all ${
              isFav
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
            title={isFav ? "Remove Bookmark" : "Bookmark Combination"}
          >
            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          Interaction Summary
        </h4>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {interaction.educational_summary}
        </p>
      </div>

      {/* Mechanism & Clinical Significance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            Pharmacological Mechanism
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {interaction.mechanism}
          </p>
        </div>

        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Clinical Significance
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {interaction.clinical_significance}
          </p>
        </div>
      </div>

      {/* Possible Effects & Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Possible Effects
          </h4>
          <ul className="space-y-1 text-xs text-slate-600">
            {interaction.possible_effects.map((effect, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                <span className="text-red-600 font-bold">•</span>
                <span>{effect}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Monitoring Considerations
          </h4>
          <ul className="space-y-1 text-xs text-slate-600">
            {interaction.monitoring.map((item, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                <span className="text-blue-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Management Considerations */}
      <div className="space-y-2 bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Management Considerations
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {interaction.management_considerations.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-slate-400 italic pt-1">
          Note: Management depends on individual patient factors and must be determined by a qualified healthcare professional.
        </p>
      </div>

      {/* Student Mode Special Section */}
      {studentMode && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2 text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-bold text-emerald-800 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Student Pharmacology Key Takeaway
          </div>
          <p className="leading-relaxed text-emerald-800">
            <strong>Exam Note:</strong> Recognize whether this is a <em>Pharmacokinetic</em> (ADME, enzyme inhibition/induction like CYP3A4 or CYP2D6) or <em>Pharmacodynamic</em> (additive receptor, pathway, or organ effect) interaction. Always check for Black Box warnings on clinical exams!
          </p>
        </div>
      )}

      {/* Footer / Actions */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Information Source: <strong>{interaction.source_reference}</strong></span>
        </div>

        <button
          onClick={() => onExplainAI(pairNames, interaction)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4 text-indigo-300" />
          Explain with AI
        </button>
      </div>
    </div>
  );
};
