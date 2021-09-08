import styles from "./City.module.css";

function City(props) {
  return (
    <h2 data-testid="city" className={styles.city}>
      In {props.city}, {props.country}
    </h2>
  );
}

export default City;
