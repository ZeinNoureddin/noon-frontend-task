// app/movie/[id]/page.tsx
import { BackdropHeader } from "@/components/BackdropHeader";
import { InfoCard } from "@/components/InfoCard";
import { CastSection } from "@/components/CastSection";
import { FavoriteButton } from "@/components/FavouriteButton";
import styles from "@/styles/MovieDetails.module.scss";
import { notFound } from "next/navigation";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
  };
};

async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  await new Promise((res) => setTimeout(res, 2000));
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}` +
      `?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
      `&append_to_response=credits`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Movie not found");
  return res.json();
}

export default async function MoviePage({
  params: { id },
}: {
  params: { id: string };
}) {
  let movie;
  try {
    movie = await fetchMovieDetails(id);
  } catch {
    return notFound();
  }

  const starFill =
    movie.vote_average >= 7
      ? "#facc15"
      : movie.vote_average >= 5
      ? "#f97316"
      : "#f43f5e";

  const starColor = starFill === "#facc15" ? "#d5ae15" : starFill;

  return (
    <main className={styles.page}>
      <BackdropHeader backdropPath={movie.backdrop_path} />
      <article className={styles.infoCard}>
        <div className={styles.left}>
          <InfoCard movie={movie} starFill={starFill} starColor={starColor} />
        </div>
        <div className={styles.right}>
          <FavoriteButton
            movie={{
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
            }}
          />
          <CastSection cast={movie.credits.cast} />
        </div>
      </article>
    </main>
  );
}
