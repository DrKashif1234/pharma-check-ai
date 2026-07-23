import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizQuestion } from '../types';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, Zap, Sparkles, Award } from 'lucide-react';

interface StudyModeViewProps {
  onSelectPairForChecker: (drugs: string[]) => void;
}

export const StudyModeView: React.FC<StudyModeViewProps> = ({ onSelectPairForChecker }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'cheatsheet'>('quiz');

  // Quiz state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return; // Already answered this question

    setSelectedOption(optionIdx);
    setAnsweredCount(prev => prev + 1);
    if (optionIdx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentIdx(prev => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Student Mode & Pharmacology Quiz</h1>
            <p className="text-xs text-slate-500">Master drug interaction mechanisms, CYP450 mnemonics, and exam questions</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'quiz' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quiz Me!
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'cheatsheet' ? 'bg-white text-slate-900 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pharmacology Cheatsheet
          </button>
        </div>
      </div>

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Quiz Stats Row */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span>Category: <strong className="text-slate-900 font-bold">{currentQ.category}</strong></span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-600">Score: <strong className="text-amber-700 font-bold">{score}</strong> / {answeredCount}</span>
              <button
                onClick={handleResetQuiz}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Restart Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question text */}
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
            {currentQ.drugPair && (
              <p className="text-xs text-blue-600 font-bold">
                Clinical Pair Focus: {currentQ.drugPair}
              </p>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              const hasAnswered = selectedOption !== null;

              let btnStyle = "bg-slate-50 border-slate-200 hover:border-blue-300 text-slate-800 hover:bg-white";

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-50 border-red-300 text-red-900";
                } else {
                  btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Box */}
          {selectedOption !== null && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Explanation & Rationales
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentQ.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Next Question →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cheatsheet Tab */}
      {activeTab === 'cheatsheet' && (
        <div className="space-y-6">
          {/* CYP450 Mnemonics */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              CYP450 Enzyme Inhibitors & Inducers (High-Yield Mnemonics)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 space-y-2">
                <h4 className="font-extrabold text-red-900 text-sm">
                  Potent CYP3A4 / 2D6 Inhibitors ("SICKFACES")
                </h4>
                <p className="text-slate-700 leading-relaxed font-medium">
                  Inhibitors block metabolism → <strong>Increases drug levels</strong> → Risk of toxicity!
                </p>
                <ul className="space-y-1 text-slate-800 font-mono text-[11px] pt-1">
                  <li><strong className="text-red-700 font-bold">S</strong>ulfonamides / SSRIs (Fluoxetine)</li>
                  <li><strong className="text-red-700 font-bold">I</strong>soniazid</li>
                  <li><strong className="text-red-700 font-bold">C</strong>larithromycin / Ciprofloxacin</li>
                  <li><strong className="text-red-700 font-bold">K</strong>etoconazole / Azoles</li>
                  <li><strong className="text-red-700 font-bold">F</strong>uranocoumarins (Grapefruit juice)</li>
                  <li><strong className="text-red-700 font-bold">A</strong>miodarone</li>
                  <li><strong className="text-red-700 font-bold">C</strong>imetidine</li>
                  <li><strong className="text-red-700 font-bold">E</strong>rythromycin</li>
                  <li><strong className="text-red-700 font-bold">S</strong>odium Valproate</li>
                </ul>
              </div>

              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 space-y-2">
                <h4 className="font-extrabold text-blue-900 text-sm">
                  Potent CYP Inducers ("PS-PORCS")
                </h4>
                <p className="text-slate-700 leading-relaxed font-medium">
                  Inducers speed metabolism → <strong>Lowers drug levels</strong> → Risk of therapeutic failure!
                </p>
                <ul className="space-y-1 text-slate-800 font-mono text-[11px] pt-1">
                  <li><strong className="text-blue-700 font-bold">P</strong>henytoin</li>
                  <li><strong className="text-blue-700 font-bold">S</strong>moking (polycyclic hydrocarbons)</li>
                  <li><strong className="text-blue-700 font-bold">P</strong>henobarbital</li>
                  <li><strong className="text-blue-700 font-bold">O</strong>xcarbazepine</li>
                  <li><strong className="text-blue-700 font-bold">R</strong>ifampin</li>
                  <li><strong className="text-blue-700 font-bold">C</strong>arbamazepine</li>
                  <li><strong className="text-blue-700 font-bold">S</strong>t. John's Wort</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Narrow Therapeutic Index Drugs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Narrow Therapeutic Index (NTI) Medications
            </h3>

            <p className="text-xs text-slate-500">
              Small changes in dose or blood concentration can lead to severe therapeutic failure or adverse toxicity. Always monitor levels!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Warfarin</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Target INR: 2.0 - 3.0</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Digoxin</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Target Range: 0.5 - 0.9 ng/mL (HF)</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Theophylline</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Target Range: 5 - 15 mcg/mL</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Lithium</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Target Range: 0.6 - 1.2 mEq/L</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Phenytoin</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Target Level: 10 - 20 mcg/mL</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900">Tacrolimus / Cyclosporine</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Trough monitoring mandatory</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
