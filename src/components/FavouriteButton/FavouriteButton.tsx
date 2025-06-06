"use client";

import { MovieSummary, useFavoritesStore } from "@/stores/useFavoritesStore";
import styles from "./FavouriteButton.module.scss";
import { Heart } from "lucide-react";
import { useState } from "react";

export function FavoriteButton({ movie }: { movie: MovieSummary }) {
  const favs = useFavoritesStore((s) => s.favorites);
  const add = useFavoritesStore((s) => s.addFavorite);
  const remove = useFavoritesStore((s) => s.removeFavorite);
  const isFav = favs.some((f) => f.id === movie.id);

  const [animate, setAnimate] = useState(false);

  const toggle = () => {
    try {
      if (!isFav) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
      }
      isFav ? remove(movie.id) : add(movie);
    } catch (error) {
      console.error(
        `Failed to update favourites for movie "${movie.title}":`,
        error
      );
      alert("An error occurred while updating favourites. Please try again.");
    }
  };

  return (
    <button
      className={styles.button}
      onClick={toggle}
      aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
      type="button"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toggle();
          e.preventDefault();
        }
      }}
    >
      <Heart
        size={20}
        strokeWidth={2}
        style={{ fill: isFav ? "#e25555" : "none" }}
        color={isFav ? "#e25555" : "#34346b"}
        aria-hidden="true"
        className={`${styles.heart} ${animate ? styles.animate : ""}`}
      />
      <span style={{ marginLeft: 8 }}>
        {isFav ? "Remove from favourites" : "Add to favourites"}
      </span>
    </button>
  );
}
