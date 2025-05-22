// components/MovieCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/MovieCard.module.scss";
import StarFill from "@/components/StarFill";
import { Star, Heart } from "lucide-react";
import { useFavoritesStore, MovieSummary } from "@/stores/useFavoritesStore";

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
  // const rating = vote_average.toFixed(1);
  const rating =
    typeof vote_average === "number" && !Number.isNaN(vote_average)
      ? vote_average.toFixed(1)
      : "N/A";

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
      isFav ? removeFav(id) : addFav(movie);
    } catch (error) {
      console.error(`Failed to update favorites for movie "${title}":`, error);
      alert("An error occurred while updating favorites. Please try again.");
    }
  };
  console.log(`${title} isFav:`, isFav);

  const starColor =
    vote_average >= 7 ? "#facc15" : vote_average >= 5 ? "#f97316" : "#f43f5e";

  return (
    <Link href={`/movie/${id}`} className={styles.cardLink}>
      <div className={styles.movieCard}>
        <div className={styles.posterWrapper}>
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${poster_path}`}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <div
            className={styles.heartIcon}
            onClick={(e) => {
              e.preventDefault(); // prevent navigation
              toggleFavorite();
            }}
          >
            <Heart
              size={16}
              strokeWidth={2}
              style={{ fill: isFav ? "#e25555" : "none" }}
              color={isFav ? "#e25555" : "#34346b"}
            />
          </div>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <span className={styles.year}>{year}</span>
          <span className={styles.rating}>
            <Star size={14} fill={starColor} color={starColor} />
            {rating}
            {/* <StarFill value={vote_average} />
            <span className={styles.ratingValue}>{rating}</span> */}
          </span>
        </div>
      </div>
    </Link>
  );
}
