// app/movie/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "@/styles/MovieDetails.module.scss";
import { FavoriteButton } from "@/components/FavouriteButton";
import { Star } from "lucide-react";

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
  let movie: MovieDetails;
  console.log("Fetching movie details for ID:", id);
  try {
    movie = await fetchMovieDetails(id);
  } catch {
    console.log("Movie not found");
    console.log(
      "URL:",
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits`
    );

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
      {/* 1) Backdrop header */}
      {movie.backdrop_path && (
        <div
          className={styles.backdrop}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 2) Info card */}
      <article className={styles.infoCard}>
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
              {movie.title}{" "}
              <span>({new Date(movie.release_date).getFullYear()})</span>
            </h1>
            <p className={styles.meta}>
              {movie.runtime} min •{" "}
              <Star size={23} fill={starFill} color={starColor} />{" "}
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
        <div className={styles.right}>
          {/* favorite toggle */}
          <FavoriteButton
            movie={{
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              release_date: movie.release_date,
              vote_average: movie.vote_average,
            }}
          />
          <section aria-labelledby="cast-heading">
            <h2 id="cast-heading">Cast</h2>
            <div className={styles.castGrid}>
              {movie.credits.cast.slice(0, 12).map((c) => (
                <div key={c.id} className={styles.castCard}>
                  {c.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                      alt={c.name}
                      width={100}
                      height={150}
                      style={{ objectFit: "cover", borderRadius: "0.09rem" }}
                    />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                  <p className={styles.castName}>{c.name}</p>
                  <p className={styles.castChar}>{c.character}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
