"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./PopularRibbon.module.scss";

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
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              language: "en-US",
              page: 1,
            },
          }
        );
        setMovies(res.data.results || []);
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
