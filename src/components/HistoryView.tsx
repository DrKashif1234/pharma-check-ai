import React from 'react';
import { HistoryItem } from '../types';
import { deleteHistoryItem, clearHistory } from '../lib/storage';
import { History, Trash2, ArrowRight, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryItem[];
  onRefreshHistory: () => void;
  onSelectCombination: (drugs: string[]) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onRefreshHistory,
  onSelectCombination
}) => {
  const handleDeleteSingle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteHistoryItem(id);
    onRefreshHistory();
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire search history?")) {
      clearHistory();
      onRefreshHistory();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <History className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Interaction Check History</h1>
            <p className="text-xs text-slate-500">Recently checked drug combinations stored locally</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Clear All History
          </button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-2xs">
          <Clock className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-900">No interaction history found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your checked drug combinations will automatically appear here for convenient clinical review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCombination(item.drugs)}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4.5 cursor-pointer transition-all hover:shadow-md flex items-center justify-between group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                  item.hasInteraction
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                }`}>
                  {item.hasInteraction ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 text-sm transition-colors">
                    {item.drugs.join(' + ')}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                    <span>Severity: <strong className={item.hasInteraction ? 'text-red-600 font-bold' : 'text-emerald-700 font-bold'}>{item.severity}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Checked: {item.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleDeleteSingle(item.id, e)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
