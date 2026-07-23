import React, { useState, useMemo } from 'react';
import { Drug } from '../types';
import { DRUGS_DATA } from '../data/drugs';
import { Search, Filter, BookOpen, Pill, ArrowRight } from 'lucide-react';

interface DrugDatabaseProps {
  onSelectDrug: (drug: Drug) => void;
  onCheckInteractionWithDrug: (drugName: string) => void;
}

export const DrugDatabase: React.FC<DrugDatabaseProps> = ({
  onSelectDrug,
  onCheckInteractionWithDrug
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('All');

  // Extract unique drug classes
  const allClasses = useMemo(() => {
    const set = new Set<string>();
    DRUGS_DATA.forEach(d => {
      if (d.drug_class) set.add(d.drug_class);
    });
    return ['All', ...Array.from(set).sort()];
  }, []);

  // Filtered drugs
  const filteredDrugs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DRUGS_DATA.filter(drug => {
      const matchesSearch = !q ||
        drug.generic_name.toLowerCase().includes(q) ||
        drug.brand_names.some(b => b.toLowerCase().includes(q)) ||
        drug.drug_class.toLowerCase().includes(q) ||
        drug.pharmacological_class.toLowerCase().includes(q);

      const matchesClass = selectedClass === 'All' || drug.drug_class === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [searchQuery, selectedClass]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Drug Database</h1>
              <p className="text-xs text-slate-500">Explore verified drug pharmacology, mechanisms, indications, and adverse effects</p>
            </div>
          </div>

          <div className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            Total Items: <strong className="text-blue-700">{filteredDrugs.length}</strong> / {DRUGS_DATA.length}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by drug name, brand, or pharmacological class..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 text-sm font-medium rounded-xl transition-all outline-none"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-4 h-4" />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full pl-10 pr-8 py-3 bg-slate-50/70 border border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 text-sm font-medium rounded-xl appearance-none cursor-pointer outline-none"
            >
              {allClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Drug Grid */}
      {filteredDrugs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
          <Pill className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-900">No matching drugs found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or clearing class filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedClass('All'); }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-blue-700 rounded-xl text-xs font-bold transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrugs.map(drug => (
            <div
              key={drug.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all hover:shadow-md flex flex-col justify-between space-y-4 group shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {drug.generic_name}
                    </h3>
                    {drug.brand_names.length > 0 && (
                      <p className="text-xs text-blue-600 font-semibold mt-0.5">
                        Brand: {drug.brand_names.join(', ')}
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    {drug.drug_class.split('/')[0]}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {drug.mechanism}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    Key Indications:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {drug.common_uses.slice(0, 2).map((use, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectDrug(drug)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                >
                  View Details
                </button>

                <button
                  onClick={() => onCheckInteractionWithDrug(drug.generic_name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors"
                >
                  Check Interactions
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
