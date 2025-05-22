// 'use client';
import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

interface SearchState {
  query: string;
  results: Movie[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setQuery: (q: string) => void;
  fetchResults: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  results: [],
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  setQuery: (q) => set({ query: q }),
  fetchResults: async () => {
    const { query } = get();
    if (!query) return set({ results: [] });
    console.log("api key", process.env.TMDB_API_KEY);
    set({ loading: true });
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.NEXT_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      set({ results: data.results || [], loading: false });
    } catch (err) {
      console.error(err);
      set({ results: [] });
    }
  },
}));
