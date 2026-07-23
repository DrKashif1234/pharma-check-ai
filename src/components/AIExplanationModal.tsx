import React, { useState, useEffect } from 'react';
import { Interaction, AIExplanation } from '../types';
import { X, Sparkles, Loader2, BookOpen, AlertCircle, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

interface AIExplanationModalProps {
  drugs: string[];
  interaction?: Interaction;
  onClose: () => void;
}

export const AIExplanationModal: React.FC<AIExplanationModalProps> = ({
  drugs,
  interaction,
  onClose
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAIExplanation() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            drugs,
            interaction
          })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to generate AI explanation.');
        }

        if (isMounted) {
          if (data.explanation) {
            setExplanation(data.explanation);
          } else {
            throw new Error('Invalid response structure received from server.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error connecting to AI service.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchAIExplanation();

    return () => {
      isMounted = false;
    };
  }, [drugs, interaction]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8 relative text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* AI Banner Card */}
        <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">AI Student Assistant</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-800 text-indigo-200 border border-indigo-700">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Medications: <strong className="text-white">{drugs.join(" + ")}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p>
            This AI explanation uses verified clinical database facts as its primary context. AI explanations do not replace underlying interaction data.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <div>
              <p className="font-bold text-slate-900 text-sm">Analyzing Drug Interaction with AI...</p>
              <p className="text-xs text-slate-500 mt-1">Formulating simple student explanation, mechanisms, and clinical takeaways.</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Unable to Generate AI Explanation
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              {error}
            </p>
            <p className="text-xs text-slate-500">
              Note: You can still review the complete verified interaction details from our clinical database directly on the interaction card.
            </p>
          </div>
        )}

        {/* Result Content */}
        {explanation && !loading && (
          <div className="space-y-5 text-sm">
            {/* Simple Explanation */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Simple Explanation
              </h4>
              <p className="text-slate-800 leading-relaxed text-sm font-medium">
                {explanation.simpleExplanation}
              </p>
            </div>

            {/* Why It Happens */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Why It Happens (Pharmacology Mechanism)
              </h4>
              <p className="text-slate-700 leading-relaxed text-xs">
                {explanation.whyItHappens}
              </p>
            </div>

            {/* Clinical Importance */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                Clinical Importance
              </h4>
              <p className="text-slate-700 leading-relaxed text-xs">
                {explanation.clinicalImportance}
              </p>
            </div>

            {/* Hypothetical Example */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Hypothetical Student Case Scenario
              </h4>
              <p className="text-slate-700 leading-relaxed text-xs italic">
                "{explanation.hypotheticalExample}"
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Key Student Takeaway
              </h4>
              <p className="text-xs font-bold text-blue-950">
                {explanation.keyPoint}
              </p>
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="pt-2 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
