import React, { useState, useEffect } from 'react';
import { ActiveTab, Drug, Interaction, MultiDrugCheckResult, HistoryItem, FavoriteItem } from './types';
import { getHistory, getFavorites, isFavorite, toggleFavorite } from './lib/storage';
import { checkMultiDrugInteractions, findDrugByNameOrId } from './lib/matcher';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HomeDashboard } from './components/HomeDashboard';
import { InteractionChecker } from './components/InteractionChecker';
import { InteractionResultCard } from './components/InteractionResultCard';
import { AIExplanationModal } from './components/AIExplanationModal';
import { DrugDatabase } from './components/DrugDatabase';
import { DrugDetailPage } from './components/DrugDetailPage';
import { FavoritesView } from './components/FavoritesView';
import { HistoryView } from './components/HistoryView';
import { StudyModeView } from './components/StudyModeView';
import { Footer } from './components/Footer';
import { ArrowLeft, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [studentMode, setStudentMode] = useState<boolean>(() => {
    return localStorage.getItem('pharmacheck_student_mode') === 'true';
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => getHistory());
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => getFavorites());

  // Current checker input drugs & current check results
  const [checkerInputDrugs, setCheckerInputDrugs] = useState<string[]>(['', '']);
  const [checkResult, setCheckResult] = useState<MultiDrugCheckResult | null>(null);

  // Modal states
  const [selectedDrugDetail, setSelectedDrugDetail] = useState<Drug | null>(null);
  const [aiModal, setAiModal] = useState<{ isOpen: boolean; drugs: string[]; interaction?: Interaction }>({
    isOpen: false,
    drugs: []
  });

  // Save studentMode preference
  useEffect(() => {
    localStorage.setItem('pharmacheck_student_mode', String(studentMode));
  }, [studentMode]);

  const refreshStorageData = () => {
    setHistory(getHistory());
    setFavorites(getFavorites());
  };

  // Quick preset / combination selector
  const handleSelectQuickCombination = (drugs: string[]) => {
    setCheckerInputDrugs(drugs);
    const result = checkMultiDrugInteractions(drugs);
    setCheckResult(result);
    setActiveTab('checker');
    refreshStorageData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open drug detail modal by drug object or name
  const handleOpenDrugDetailByName = (drugName: string) => {
    const found = findDrugByNameOrId(drugName);
    if (found) {
      setSelectedDrugDetail(found);
    }
  };

  const handleOpenAIModal = (drugs: string[], interaction?: Interaction) => {
    setAiModal({
      isOpen: true,
      drugs,
      interaction
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        studentMode={studentMode}
        setStudentMode={setStudentMode}
        favoritesCount={favorites.length}
        historyCount={history.length}
      />

      {/* Educational Banner */}
      <DisclaimerBanner />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <HomeDashboard
            setActiveTab={setActiveTab}
            onSelectQuickCombination={handleSelectQuickCombination}
            historyCount={history.length}
            favoritesCount={favorites.length}
            studentMode={studentMode}
          />
        )}

        {/* TAB 2: INTERACTION CHECKER */}
        {activeTab === 'checker' && (
          <div className="space-y-8">
            <InteractionChecker
              initialDrugs={checkerInputDrugs}
              onCheckCompleted={(result) => {
                setCheckResult(result);
                refreshStorageData();
              }}
              studentMode={studentMode}
              onOpenDrugDetail={(drug) => setSelectedDrugDetail(drug)}
            />

            {/* CHECK RESULTS DISPLAY SECTION */}
            {checkResult && (
              <div className="max-w-4xl mx-auto space-y-6 pt-4 animate-fade-in">
                {/* Result Overview Banner */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                        Pairwise Evaluation ({checkResult.pairs.length} Pair{checkResult.pairs.length > 1 ? 's' : ''})
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900">
                      Selected: {checkResult.selectedDrugs.map(d => 'generic_name' in d ? d.generic_name : String(d)).join(' + ')}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                      checkResult.totalInteractionsCount > 0
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {checkResult.totalInteractionsCount > 0
                        ? `Highest Severity: ${checkResult.overallSeverity}`
                        : 'No Major Interactions Identified'}
                    </span>
                  </div>
                </div>

                {/* Individual Pair Results */}
                <div className="space-y-6">
                  {checkResult.pairs.map((pair, idx) => {
                    const name1 = 'generic_name' in pair.drug1 ? pair.drug1.generic_name : String(pair.drug1);
                    const name2 = 'generic_name' in pair.drug2 ? pair.drug2.generic_name : String(pair.drug2);
                    const pairList = [name1, name2];
                    const isFavNow = isFavorite(pairList);

                    return (
                      <InteractionResultCard
                        key={idx}
                        drug1={pair.drug1}
                        drug2={pair.drug2}
                        interaction={pair.interaction}
                        isFav={isFavNow}
                        onToggleFav={() => {
                          toggleFavorite(pairList, pair.interaction ? pair.interaction.severity : 'No significant interaction identified');
                          refreshStorageData();
                        }}
                        onExplainAI={(drugs, interaction) => handleOpenAIModal(drugs, interaction)}
                        studentMode={studentMode}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DRUG DATABASE */}
        {activeTab === 'database' && (
          <DrugDatabase
            onSelectDrug={(drug) => setSelectedDrugDetail(drug)}
            onCheckInteractionWithDrug={(drugName) => {
              setCheckerInputDrugs([drugName, '']);
              setCheckResult(null);
              setActiveTab('checker');
            }}
          />
        )}

        {/* TAB 4: FAVORITES */}
        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onRefreshFavorites={refreshStorageData}
            onSelectCombination={handleSelectQuickCombination}
          />
        )}

        {/* TAB 5: HISTORY */}
        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onRefreshHistory={refreshStorageData}
            onSelectCombination={handleSelectQuickCombination}
          />
        )}

        {/* TAB 6: STUDY MODE & QUIZ */}
        {activeTab === 'study' && (
          <StudyModeView
            onSelectPairForChecker={handleSelectQuickCombination}
          />
        )}
      </main>

      {/* DRUG DETAIL MODAL */}
      {selectedDrugDetail && (
        <DrugDetailPage
          drug={selectedDrugDetail}
          onClose={() => setSelectedDrugDetail(null)}
          onCheckInteractionWithDrug={(drugName) => {
            setSelectedDrugDetail(null);
            setCheckerInputDrugs([drugName, '']);
            setCheckResult(null);
            setActiveTab('checker');
          }}
          onSelectPair={(pair) => {
            setSelectedDrugDetail(null);
            handleSelectQuickCombination(pair);
          }}
        />
      )}

      {/* AI EXPLANATION MODAL */}
      {aiModal.isOpen && (
        <AIExplanationModal
          drugs={aiModal.drugs}
          interaction={aiModal.interaction}
          onClose={() => setAiModal({ isOpen: false, drugs: [] })}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
