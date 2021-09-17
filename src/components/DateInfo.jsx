import styles from "./DateInfo.module.scss";

function DateInfo(props) {
  return (
    <div style={{ bottom: props.bottom }} className={styles.container}>
      <div className={styles.item}>
        <p className={styles.infoHeader}>CURRENT TIMEZONE</p>
        <h2 className={styles.infoContent}>LOREM</h2>
      </div>
      <div className={styles.item}>
        <p className={styles.infoHeader}>DAY OF THE YEAR</p>
        <h2 className={styles.infoContent}>LOREM</h2>
      </div>
      <div className={styles.item}>
        <p className={styles.infoHeader}>DAY OF THE WEEK</p>
        <h2 className={styles.infoContent}>LOREM</h2>
      </div>
      <div className={styles.item}>
        <p className={styles.infoHeader}>WEEK NUMBER</p>
        <h2 className={styles.infoContent}>LOREM</h2>
      </div>
    </div>
  );
}

export default DateInfo;
