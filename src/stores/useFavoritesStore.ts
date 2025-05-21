// src/stores/useFavoritesStore.ts
import { create } from 'zustand';

export type MovieSummary = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

interface FavoritesState {
  favorites: MovieSummary[];
  addFavorite: (m: MovieSummary) => void;
  removeFavorite: (id: number) => void;
}

const readStorage = (): MovieSummary[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('favorites');
  return raw ? JSON.parse(raw) : [];
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: readStorage(),
  addFavorite: (movie) => {
    set((state) => {
      if (state.favorites.find((f) => f.id === movie.id)) return state;
      const next = [...state.favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(next));
      return { favorites: next };
    });
  },
  removeFavorite: (id) => {
    set((state) => {
      const next = state.favorites.filter((f) => f.id !== id);
      localStorage.setItem('favorites', JSON.stringify(next));
      return { favorites: next };
    });
  },
}));
