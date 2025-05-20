'use client';

import { useSearchStore } from '@/stores/useSearchStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.scss';

export default function SearchResultsPage() {
  const params = useSearchParams();
const query = params.get('query') || '';
  const { setQuery, fetchResults, results } = useSearchStore();

  // whenever `?query=` changes, fetch
  useEffect(() => {
    if (!query) return;
    setQuery(query);
    fetchResults();
  }, [query, setQuery, fetchResults]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.glassCard}>
        {/* Title */}
        <h1 className={styles.results}>
          Results for “{query}”
        </h1>

        {/* Grid of movie cards */}
        <div className={styles.films}>
          {results.length === 0 ? (
            <p className={styles.noResults}>
              No films found.
            </p>
          ) : (
            results.map((m) => (
              <div key={m.id} className={styles.movieCard}>
                <div className={styles.posterWrapper}>
                  {m.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                      alt={m.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={styles.noImage}>No Image</div>
                  )}
                </div>
                <h2>{m.title}</h2>
                <p>
                  {new Date(m.release_date).getFullYear()} · ⭐️{' '}
                  {m.vote_average.toFixed(1)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
