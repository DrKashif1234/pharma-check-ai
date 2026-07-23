import React from 'react';
import { FavoriteItem } from '../types';
import { removeFavorite } from '../lib/storage';
import { Star, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favorites: FavoriteItem[];
  onRefreshFavorites: () => void;
  onSelectCombination: (drugs: string[]) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onRefreshFavorites,
  onSelectCombination
}) => {
  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(id);
    onRefreshFavorites();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Bookmarked Favorites</h1>
            <p className="text-xs text-slate-500">Quickly re-check your saved drug combinations</p>
          </div>
        </div>

        <span className="text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Saved: <strong className="text-amber-600">{favorites.length}</strong>
        </span>
      </div>

      {/* List */}
      {favorites.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-2xs">
          <Star className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-900">No favorite combinations saved yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Click the star icon (⭐) on any interaction result card in the checker to bookmark combinations for quick study and reference.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              onClick={() => onSelectCombination(fav.drugs)}
              className="bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md flex items-center justify-between group shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
                  <h3 className="font-extrabold text-slate-900 group-hover:text-amber-700 text-base transition-colors">
                    {fav.drugs.join(' + ')}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className="font-bold text-red-600">Severity: {fav.severity}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Saved: {fav.addedAt}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleRemove(fav.id, e)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-xl transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
