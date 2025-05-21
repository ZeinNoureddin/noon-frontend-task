import styles from "@/styles/Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <span>Loading...</span>
    </div>
  );
}
