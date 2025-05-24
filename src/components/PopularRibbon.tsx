"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/PopularRibbon.module.scss";

interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
}

export default function PopularRibbon() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const cachedMovies = localStorage.getItem("popularMovies");
        const cacheTimestamp = localStorage.getItem("popularMoviesTimestamp");
        const now = Date.now();

        if (
          cachedMovies &&
          cacheTimestamp &&
          now - parseInt(cacheTimestamp, 10) < 3 * 24 * 60 * 60 * 1000
        ) {
          setMovies(JSON.parse(cachedMovies));
          return;
        }

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        const json = await res.json();
        setMovies(json.results || []);
        localStorage.setItem(
          "popularMovies",
          JSON.stringify(json.results || [])
        );
        localStorage.setItem("popularMoviesTimestamp", now.toString());
      } catch (e) {
        console.error("Failed to fetch popular:", e);
      }
    }
    load();
  }, []);

  const track = [...movies, ...movies];

  return (
    <div className={styles.ribbon}>
      <div className={styles.track}>
        {track.map((m, i) =>
          m.poster_path ? (
            <div key={`${m.id}-${i}`} className={styles.slide}>
              <Image
                src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                alt={m.title}
                width={120}
                height={180}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
