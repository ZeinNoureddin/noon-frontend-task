// app/movie/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "@/styles/MovieDetails.module.scss";
import { FavoriteButton } from "@/components/FavouriteButton";

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
  // **no `await`** here—just grab the string
  //   const id = params.id;

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

  return (
    <div className={styles.page}>
      {/* 1) Backdrop header */}
      {movie.backdrop_path && (
        <div
          className={styles.backdrop}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
      )}

      {/* 2) Info card */}
      <div className={styles.infoCard}>
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
          <h1>
            {movie.title}{" "}
            <span>({new Date(movie.release_date).getFullYear()})</span>
          </h1>
          <p className={styles.meta}>
            {movie.runtime} min • ⭐️ {movie.vote_average.toFixed(1)}
          </p>
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
          <h2>Cast</h2>
          <div className={styles.castGrid}>
            {movie.credits.cast.slice(0, 12).map((c) => (
              <div key={c.id} className={styles.castCard}>
                {c.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                    alt={c.name}
                    width={100}
                    height={150}
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
                <p className={styles.castName}>{c.name}</p>
                <p className={styles.castChar}>{c.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// export default function MoviePage({ params } : { params: { id: string } }) {
//     return (
//         <p>ID: {params.id}</p>
//     );
// }
