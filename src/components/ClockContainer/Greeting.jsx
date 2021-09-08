import styles from "./Greeting.module.css";

function Greeting(props) {
  return (
    <div className={styles.greetingContainer}>
      <img src={props.icon} alt="icon" />{" "}
      <p data-testid="greeting" className={styles.greeting}>
        {props.greeting}
      </p>
    </div>
  );
}

export default Greeting;
