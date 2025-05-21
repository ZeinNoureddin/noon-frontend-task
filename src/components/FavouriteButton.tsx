// src/components/FavoriteButton.tsx
'use client';

import { MovieSummary, useFavoritesStore } from '@/stores/useFavoritesStore';
import styles from '../styles/FavouriteButton.module.scss';

export function FavoriteButton({ movie }: { movie: MovieSummary }) {
  const favs = useFavoritesStore((s) => s.favorites);
  const add = useFavoritesStore((s) => s.addFavorite);
  const remove = useFavoritesStore((s) => s.removeFavorite);
  const isFav = favs.some((f) => f.id === movie.id);

  const toggle = () => (isFav ? remove(movie.id) : add(movie));

  return (
    <button onClick={toggle} className={styles.button}>
      {isFav ? '❤️ Remove from favorites' : '🤍 Add to favorites'}
    </button>
  );
}
