import styles from "./Indicator.module.css";

export const Indicator = ({ percent, children, size = 'small' }) => {
  const color = 220 - 20 * (percent / 100);
  return (
    <div className={styles.parent}>
      <div
        style={{ backgroundColor: `hsl(${color}, ${percent * 0.7 + 30}%, 50%)` }}
        className={`${styles.child} ${styles[size]}`}
      >
        {children}
      </div>
    </div>
  );
}
