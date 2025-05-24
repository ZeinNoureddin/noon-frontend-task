// 'use client';
import { create } from "zustand";
import axios from "axios";

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
  error: any;
  setLoading: (loading: boolean) => void;
  setQuery: (q: string) => void;
  fetchResults: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: "",
  results: [],
  loading: false,
  error: null,
  setLoading: (loading: boolean) => set({ loading }),
  setQuery: (q) => set({ query: q }),
  fetchResults: async () => {
    const { query } = get();
    if (!query) return set({ results: [], error: null });

    set({ loading: true, error: null });
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query: query,
        },
      });
      set({ results: res.data.results || [], loading: false });
    } catch (err) {
      console.error(err);
      set({ results: [], loading: false, error: "Failed to fetch results" });
    }
  },
}));
