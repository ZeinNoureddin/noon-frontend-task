import styles from "./MovieDetails.module.scss";

export function BackdropHeader({
  backdropPath,
}: {
  backdropPath: string | null;
}) {
  if (!backdropPath) return null;

  return (
    <div
      className={styles.backdrop}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})`,
      }}
      aria-hidden="true"
    />
  );
}
