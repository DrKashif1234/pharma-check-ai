import { HistoryItem, FavoriteItem, SeverityLevel } from '../types';

const HISTORY_KEY = 'pharmacheck_history_v1';
const FAVORITES_KEY = 'pharmacheck_favorites_v1';

// History Helpers
export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading history from localStorage:', err);
    return [];
  }
}

export function addHistory(drugs: string[], severity: SeverityLevel, hasInteraction: boolean): HistoryItem[] {
  try {
    const current = getHistory();
    const cleanDrugs = drugs.map(d => d.trim()).filter(Boolean);
    if (cleanDrugs.length < 2) return current;

    // Format current date nicely
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newItem: HistoryItem = {
      id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      drugs: cleanDrugs,
      severity,
      date: dateStr,
      hasInteraction
    };

    // Keep up to 50 recent items, avoid duplicate adjacent entries
    const filtered = current.filter(item => item.drugs.sort().join(',') !== cleanDrugs.slice().sort().join(','));
    const updated = [newItem, ...filtered].slice(0, 50);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error adding history item:', err);
    return getHistory();
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  try {
    const current = getHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting history item:', err);
    return getHistory();
  }
}

export function clearHistory(): HistoryItem[] {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (err) {
    console.error('Error clearing history:', err);
    return [];
  }
}

// Favorites Helpers
export function getFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading favorites from localStorage:', err);
    return [];
  }
}

export function isFavorite(drugs: string[]): boolean {
  const current = getFavorites();
  const sortedTarget = drugs.map(d => d.toLowerCase().trim()).sort().join(',');
  return current.some(fav => fav.drugs.map(d => d.toLowerCase().trim()).sort().join(',') === sortedTarget);
}

export function toggleFavorite(drugs: string[], severity: SeverityLevel): { favorites: FavoriteItem[]; isFavNow: boolean } {
  try {
    const current = getFavorites();
    const cleanDrugs = drugs.map(d => d.trim()).filter(Boolean);
    const sortedTarget = cleanDrugs.map(d => d.toLowerCase().trim()).sort().join(',');

    const existingIndex = current.findIndex(fav => fav.drugs.map(d => d.toLowerCase().trim()).sort().join(',') === sortedTarget);

    let updated: FavoriteItem[];
    let isFavNow = false;

    if (existingIndex >= 0) {
      updated = current.filter((_, idx) => idx !== existingIndex);
      isFavNow = false;
    } else {
      const newFav: FavoriteItem = {
        id: 'fav_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        drugs: cleanDrugs,
        severity,
        addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      updated = [newFav, ...current];
      isFavNow = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return { favorites: updated, isFavNow };
  } catch (err) {
    console.error('Error toggling favorite:', err);
    return { favorites: getFavorites(), isFavNow: false };
  }
}

export function removeFavorite(id: string): FavoriteItem[] {
  try {
    const current = getFavorites();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error removing favorite:', err);
    return getFavorites();
  }
}
