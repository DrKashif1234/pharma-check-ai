import React from 'react';
import { ActiveTab, SeverityLevel } from '../types';
import { DRUGS_DATA } from '../data/drugs';
import { INTERACTIONS_DATA } from '../data/interactions';
import { Sparkles, BookOpen, Star, History, GraduationCap, ArrowRight, ShieldAlert, Zap, AlertCircle } from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectQuickCombination: (drugs: string[]) => void;
  historyCount: number;
  favoritesCount: number;
  studentMode: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  onSelectQuickCombination,
  historyCount,
  favoritesCount,
}) => {
  const featuredPairs = [
    {
      drugs: ['Warfarin', 'Aspirin'],
      severity: 'Major' as SeverityLevel,
      summary: 'Additive antithrombotic & anticoagulant action significantly increasing GI and intracranial bleeding risk.',
      type: 'Pharmacodynamic'
    },
    {
      drugs: ['Lisinopril', 'Spironolactone'],
      severity: 'Major' as SeverityLevel,
      summary: 'Dual aldosterone blockade causing potassium retention and potential life-threatening hyperkalemia.',
      type: 'Pharmacodynamic'
    },
    {
      drugs: ['Simvastatin', 'Clarithromycin'],
      severity: 'Major' as SeverityLevel,
      summary: 'Potent CYP3A4 inhibition spikes simvastatin exposure 10-fold, causing severe rhabdomyolysis.',
      type: 'Enzyme-Based'
    },
    {
      drugs: ['Sildenafil', 'Nitroglycerin'],
      severity: 'Major' as SeverityLevel,
      summary: 'Massive cGMP accumulation leading to profound, refractory systemic hypotension and cardiac arrest.',
      type: 'Pharmacodynamic'
    },
    {
      drugs: ['Omeprazole', 'Clopidogrel'],
      severity: 'Major' as SeverityLevel,
      summary: 'CYP2C19 inhibition prevents clopidogrel prodrug bioactivation, raising coronary stent thrombosis risk.',
      type: 'Enzyme-Based'
    },
    {
      drugs: ['Digoxin', 'Amiodarone'],
      severity: 'Major' as SeverityLevel,
      summary: 'P-glycoprotein efflux inhibition doubles serum digoxin levels, triggering digitalis toxicity.',
      type: 'Enzyme-Based'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Educational Interaction Platform
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            PharmaCheck AI
          </h1>

          <p className="text-lg text-slate-600 font-normal leading-relaxed">
            Understand potential drug interactions quickly and clearly with verified clinical pharmacology.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
            Designed for pharmacy students, healthcare learners, and clinicians to examine mechanisms of interaction, clinical significance, monitoring protocols, and AI-assisted explanations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('checker')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Check Drug Interaction
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm transition-colors shadow-2xs"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Study Mode & Quiz
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              This tool is for educational and informational purposes only. It is not a substitute for professional medical advice, clinical judgment, or consultation with a pharmacist or physician.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Dashboard Overview */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Drug Database</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{DRUGS_DATA.length}+ Medications</p>
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">Verified pharmacology</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Interactions</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{INTERACTIONS_DATA.length}+ Pairs</p>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">Clinical citations</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Search History</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{historyCount} Searches</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Saved locally</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bookmarks</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{favoritesCount} Favorites</p>
            <p className="text-[11px] text-indigo-600 font-medium mt-0.5">Quick reference</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-indigo-600/20" />
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('checker')}
            className="group p-5 bg-white hover:bg-blue-50/30 border border-slate-200 hover:border-blue-300 rounded-2xl text-left transition-all shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
              Check Interaction
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Select 2 or more medicines to view detailed interaction analysis and AI explanation.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className="group p-5 bg-white hover:bg-blue-50/30 border border-slate-200 hover:border-blue-300 rounded-2xl text-left transition-all shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
              Browse Drugs
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Search drug classes, therapeutic indications, adverse effects, and warnings.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className="group p-5 bg-white hover:bg-amber-50/30 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-800 transition-colors">
              View Favorites
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Access your saved drug combinations for clinical review and study.
            </p>
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className="group p-5 bg-white hover:bg-indigo-50/30 border border-slate-200 hover:border-indigo-300 rounded-2xl text-left transition-all shadow-2xs"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-800 transition-colors">
              Study Mode
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Test your knowledge with multiple-choice pharmacology quizzes and CYP450 cheatsheets.
            </p>
          </button>
        </div>
      </section>

      {/* Featured Clinical Interactions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              Common High-Risk Clinical Interactions
            </h2>
            <p className="text-xs text-slate-500">Click any pair to test instantly in the Interaction Checker</p>
          </div>

          <button
            onClick={() => setActiveTab('checker')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            Explore All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPairs.map((pair, idx) => (
            <div
              key={idx}
              onClick={() => onSelectQuickCombination(pair.drugs)}
              className="bg-white border border-slate-200 hover:border-red-300 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    {pair.severity}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {pair.type}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 text-base transition-colors">
                  {pair.drugs[0]} + {pair.drugs[1]}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pair.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                <span>Check Pair</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
