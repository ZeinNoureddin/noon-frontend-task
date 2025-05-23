import Image from "next/image";
import { Star } from "lucide-react";
import styles from "@/styles/MovieDetails.module.scss";

export function InfoCard({
  movie,
  starFill,
  starColor,
}: {
  movie: {
    title: string;
    poster_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    overview: string;
    genres: { id: number; name: string }[];
  };
  starFill: string;
  starColor: string;
}) {
  return (
    <div className={styles.left}>
      {movie.poster_path && (
        <div className={styles.poster}>
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <header>
        <h1>
          {movie.title} <span>({new Date(movie.release_date).getFullYear()})</span>
        </h1>
        <p className={styles.meta}>
          {movie.runtime} min • <Star size={23} fill={starFill} color={starColor} />{" "}
          {movie.vote_average.toFixed(1)}
        </p>
      </header>
      <p className={styles.overview}>{movie.overview}</p>
      <div className={styles.genres}>
        {movie.genres.map((g) => (
          <span key={g.id}>{g.name}</span>
        ))}
      </div>
    </div>
  );
}