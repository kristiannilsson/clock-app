import styles from "./Button.module.css";
import arrow from "../assets/desktop/icon-arrow-up.svg";

function Button(props) {
  return (
    <div className={styles.buttonContainer}>
      <span className={styles.buttonText}>MORE</span>
      <button onClick={props.callback} className={styles.button}>
        <img
          style={{ transform: "rotate(180deg)" }}
          className={styles.button}
          src={arrow}
          alt="button"
        />
      </button>
    </div>
  );
}

export default Button;
