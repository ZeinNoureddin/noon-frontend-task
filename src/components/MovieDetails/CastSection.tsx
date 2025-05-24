import Image from "next/image";
import styles from "./MovieDetails.module.scss";

export function CastSection({ cast }: { cast: Array<{ id: number; name: string; character: string; profile_path: string | null }> }) {
  return (
    <section aria-labelledby="cast-heading">
      <h2 id="cast-heading">Cast</h2>
      <div className={styles.castGrid}>
        {cast.slice(0, 12).map((c) => (
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
  );
}