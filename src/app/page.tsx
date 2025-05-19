'use client';

import styles from '@/styles/Home.module.scss';
import SearchBar from '@/components/SearchBar';
import { useSearchStore } from '@/stores/useSearchStore';
import Image from 'next/image';

export default function Home() {
  const results = useSearchStore((s) => s.results);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {/* Left pane */}
        <div className={styles.left}>
          <h1 className={styles.siteTitle}>The Film Fanatic</h1>
          <SearchBar />
        </div>

        {/* Right pane */}
        <div className={styles.right}>
          {results.length === 0 ? (
            <p className={styles.noResults}>
              Try searching for a movie…
            </p>
          ) : (
            results.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <div className={styles.posterWrapper}>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888',
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>
                <h2>{movie.title}</h2>
                <p>
                  {new Date(movie.release_date).getFullYear()} · ⭐️{' '}
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}