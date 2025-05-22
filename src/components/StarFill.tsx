// components/StarFill.tsx
import styles from "@/styles/StarFill.module.scss";

interface Props {
  value: number; // from 0 to 10
}

export default function StarFill({ value }: Props) {
  const percentage = Math.min(Math.max(value, 0), 10) * 10; // 0–100%

  return (
    <div
      className={styles.starWrapper}
      title={`${value.toFixed(1)} / 10`}
      aria-hidden="true"
    >
      <div className={styles.starBackground} />
      <div className={styles.starFill} style={{ width: `${percentage}%` }} />
    </div>
  );
}
