import React, { useState, useEffect, useRef } from 'react';
import { Drug, MultiDrugCheckResult } from '../types';
import { searchDrugs, checkMultiDrugInteractions } from '../lib/matcher';
import { addHistory } from '../lib/storage';
import { Plus, X, Search, Sparkles, Pill, AlertCircle } from 'lucide-react';

interface InteractionCheckerProps {
  initialDrugs?: string[];
  onCheckCompleted: (result: MultiDrugCheckResult) => void;
  studentMode: boolean;
  onOpenDrugDetail: (drug: Drug) => void;
}

export const InteractionChecker: React.FC<InteractionCheckerProps> = ({
  initialDrugs = [],
  onCheckCompleted,
  onOpenDrugDetail
}) => {
  // Array of drug search slot strings or selected drug objects
  const [drugSlots, setDrugSlots] = useState<string[]>(() => {
    if (initialDrugs && initialDrugs.length >= 2) return initialDrugs;
    return ['', '']; // Default 2 drug slots
  });

  // Active search query per slot index
  const [activeSearchIdx, setActiveSearchIdx] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initialDrugs if changed externally
  useEffect(() => {
    if (initialDrugs && initialDrugs.length >= 2) {
      setDrugSlots(initialDrugs);
    }
  }, [initialDrugs]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveSearchIdx(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...drugSlots];
    updated[index] = value;
    setDrugSlots(updated);

    if (value.trim().length >= 1) {
      const matches = searchDrugs(value);
      setSearchResults(matches);
      setActiveSearchIdx(index);
    } else {
      setSearchResults([]);
      setActiveSearchIdx(null);
    }
  };

  const handleSelectDrug = (index: number, drug: Drug) => {
    const updated = [...drugSlots];
    updated[index] = drug.generic_name;
    setDrugSlots(updated);
    setActiveSearchIdx(null);
    setSearchResults([]);
  };

  const handleAddSlot = () => {
    setDrugSlots(prev => [...prev, '']);
  };

  const handleRemoveSlot = (index: number) => {
    if (drugSlots.length <= 2) {
      // Keep at least 2 slots, clear text of target index
      const updated = [...drugSlots];
      updated[index] = '';
      setDrugSlots(updated);
      return;
    }
    setDrugSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckInteractions = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanDrugs = drugSlots.map(d => d.trim()).filter(Boolean);
    if (cleanDrugs.length < 2) return;

    const result = checkMultiDrugInteractions(cleanDrugs);
    
    // Save to history
    addHistory(
      result.selectedDrugs.map(d => 'generic_name' in d ? d.generic_name : String(d)),
      result.overallSeverity,
      result.totalInteractionsCount > 0
    );

    onCheckCompleted(result);
  };

  // Quick preset shortcuts
  const popularPresets = [
    { label: 'Warfarin + Aspirin', drugs: ['Warfarin', 'Aspirin'] },
    { label: 'Lisinopril + Spironolactone', drugs: ['Lisinopril', 'Spironolactone'] },
    { label: 'Simvastatin + Clarithromycin', drugs: ['Simvastatin', 'Clarithromycin'] },
    { label: 'Fluoxetine + Tramadol', drugs: ['Fluoxetine', 'Tramadol'] },
    { label: 'Metformin + Contrast Media', drugs: ['Metformin', 'Iodinated Radiocontrast Media'] },
    { label: '3-Drug Combo: Lisinopril + Ibuprofen + Spironolactone', drugs: ['Lisinopril', 'Ibuprofen', 'Spironolactone'] }
  ];

  const canCheck = drugSlots.filter(d => d.trim().length > 0).length >= 2;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Checker Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Drug Interaction Checker</h1>
            <p className="text-xs text-slate-500">Search and evaluate drug-drug interactions for 2 or more medications</p>
          </div>
        </div>

        {/* Inputs list */}
        <form onSubmit={handleCheckInteractions} className="mt-6 space-y-4">
          {drugSlots.map((value, idx) => (
            <div key={idx} className="relative space-y-1">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Drug {idx + 1}
              </label>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>

                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onFocus={() => {
                      if (value.trim().length >= 1) {
                        setSearchResults(searchDrugs(value));
                        setActiveSearchIdx(idx);
                      }
                    }}
                    placeholder={idx === 0 ? "Search for a medicine (e.g. Warfarin)..." : idx === 1 ? "Search for another medicine (e.g. Aspirin)..." : "Search for additional medicine..."}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50/70 border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl transition-all outline-none"
                  />

                  {value && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...drugSlots];
                        updated[idx] = '';
                        setDrugSlots(updated);
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {drugSlots.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(idx)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                    title="Remove medicine"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {activeSearchIdx === idx && searchResults.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-slate-100"
                >
                  {searchResults.map((drug) => (
                    <div
                      key={drug.id}
                      onClick={() => handleSelectDrug(idx, drug)}
                      className="p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{drug.generic_name}</span>
                          {drug.brand_names.length > 0 && (
                            <span className="text-xs text-blue-600 font-medium">
                              ({drug.brand_names.join(', ')})
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{drug.drug_class}</p>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDrugDetail(drug);
                        }}
                        className="text-[11px] text-slate-500 hover:text-blue-600 underline px-2 py-1 rounded bg-slate-100"
                      >
                        Info
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleAddSlot}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 font-semibold text-xs transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              + Add Another Drug
            </button>

            <button
              type="submit"
              disabled={!canCheck}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
                canCheck
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transform hover:-translate-y-0.5'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Check Interaction
            </button>
          </div>
        </form>
      </div>

      {/* Popular Presets */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Pill className="w-4 h-4 text-blue-600" />
          Common Clinical Combinations to Test
        </h3>

        <div className="flex flex-wrap gap-2">
          {popularPresets.map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDrugSlots(preset.drugs);
                const result = checkMultiDrugInteractions(preset.drugs);
                addHistory(preset.drugs, result.overallSeverity, result.totalInteractionsCount > 0);
                onCheckCompleted(result);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs font-medium transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
