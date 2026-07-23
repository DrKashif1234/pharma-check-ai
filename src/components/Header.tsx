import React from 'react';
import { ActiveTab } from '../types';
import { Pill, Activity, BookOpen, Star, History, GraduationCap, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  studentMode: boolean;
  setStudentMode: (val: boolean) => void;
  favoritesCount: number;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentMode,
  setStudentMode,
  favoritesCount,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-700 transition-colors">
              <Pill className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">
                  PharmaCheck
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  AI Studio
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Clinical Interaction & Pharmacology Platform
              </p>
            </div>
          </div>

          {/* Student Mode Toggle & Status Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStudentMode(!studentMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                studentMode
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Toggle Student Mode for additional pharmacology notes, mechanisms, and mnemonics"
            >
              <div className={`w-2 h-2 rounded-full ${studentMode ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
              <GraduationCap className={`w-4 h-4 ${studentMode ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span className="hidden md:inline">Student Mode</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold uppercase ${studentMode ? 'bg-emerald-200/80 text-emerald-900' : 'bg-slate-200 text-slate-500'}`}>
                {studentMode ? 'Active' : 'Off'}
              </span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-100 text-sm font-medium">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'home'
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => setActiveTab('checker')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'checker'
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Checker
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'database'
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Drug Database
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'favorites'
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            Favorites
            {favoritesCount > 0 && (
              <span className="ml-1 text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full border border-amber-200">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <History className="w-4 h-4" />
            History
            {historyCount > 0 && (
              <span className="ml-1 text-[10px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded-full border border-slate-200">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('study')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'study'
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Study Mode & Quiz
          </button>
        </nav>
      </div>
    </header>
  );
};
