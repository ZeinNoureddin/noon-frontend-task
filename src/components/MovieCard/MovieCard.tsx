"use client";

import Image from "next/image";
import Link from "next/link";
import animateHeartStyles from "../FavouriteButton/FavouriteButton.module.scss";
import styles from "./MovieCard.module.scss";
import { Star, Heart } from "lucide-react";
import { useFavoritesStore, MovieSummary } from "@/stores/useFavoritesStore";
import { useState } from "react";

interface Props {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export default function MovieCard({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Props) {
  const year = new Date(release_date).getFullYear();
  const rating =
    typeof vote_average === "number" && !Number.isNaN(vote_average)
      ? vote_average.toFixed(1)
      : "N/A";

  const [animateHeart, setAnimateHeart] = useState(false);

  const isFav = useFavoritesStore((s) => s.favorites.some((f) => f.id === id));
  const addFav = useFavoritesStore((s) => s.addFavorite);
  const removeFav = useFavoritesStore((s) => s.removeFavorite);

  const toggleFavorite = () => {
    try {
      const movie: MovieSummary = {
        id,
        title,
        poster_path,
        release_date,
        vote_average,
      };
      if (!isFav) {
        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 300);
      }
      isFav ? removeFav(id) : addFav(movie);
    } catch (error) {
      console.error(`Failed to update favorites for movie "${title}":`, error);
      alert("An error occurred while updating favorites. Please try again.");
    }
  };

  const starColor =
    vote_average >= 7 ? "#facc15" : vote_average >= 5 ? "#f97316" : "#f43f5e";

  return (
    <Link href={`/movie/${id}`} className={styles.cardLink}>
      <div className={styles.movieCard}>
        <div className={`${styles.posterWrapper} ${styles.wrapper}`}>
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${poster_path}`}
              alt={`Poster of the movie ${title}`}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <div
            className={styles.heartIcon}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
          >
            <Heart
              size={16}
              strokeWidth={2}
              style={{ fill: isFav ? "#e25555" : "none" }}
              color={isFav ? "#e25555" : "#34346b"}
              aria-hidden="true"
              className={`${animateHeartStyles.heart} ${
                animateHeart ? animateHeartStyles.animate : ""
              }`}
            />
          </div>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.rating}>
            <Star size={19} fill={starColor} color={starColor} />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
