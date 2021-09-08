import styles from "./Clock.module.css";
import PropTypes from "prop-types";

function Clock(props) {
  return (
    <div>
      <h1 data-testid="time" className={styles.time}>
        {props.time}
      </h1>
      <span className={styles.timezone}>{props.timezone}</span>
    </div>
  );
}

Clock.propTypes = {
  time: PropTypes.string.isRequired,
};

export default Clock;
