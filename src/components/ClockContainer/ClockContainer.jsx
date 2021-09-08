import { Component } from "react";
import styles from "./ClockContainer.module.css";
import moon from "../../assets/desktop/icon-moon.svg";
import sun from "../../assets/desktop/icon-sun.svg";
import Clock from "./Clock";
import Greeting from "./Greeting";
import City from "./City";
import timezones from "./timezones.json";

export default class ClockContainer extends Component {
  //maps the right abbreviation to the right timezone
  timeZoneMapper() {
    return timezones[this.props.location.time_zone];
  }

  //Return icon and appropiate greeting dependent on hour.
  greetingGenerator(hour) {
    if (hour > 5 && hour < 12) {
      return { icon: sun, greeting: "Good morning" };
    } else if (hour > 12 && hour < 18) {
      return { icon: sun, greeting: "Good afternoon" };
    } else {
      return { icon: moon, greeting: "Good evening" };
    }
  }

  /* Returns hours and minutes from given date in string format. 
  Also Prefixes "0" to hours and minutes < 10. */
  timeToString(date) {
    //Prefixes "0" to hours and minutes < 10.
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

    return `${hours}:${minutes}`;
  }

  render() {
    //Returns object from greetingGenerator() with current date as parameter
    const greetingRes = this.greetingGenerator(this.props.time.getHours());
    return (
      <div className={styles.clockContainer}>
        {this.props.location && (
          <>
            <Greeting icon={greetingRes.icon} greeting={greetingRes.greeting} />
            <Clock
              time={this.timeToString(this.props.time)}
              timezone={this.timeZoneMapper()}
            />
            <City
              city={this.props.location.city}
              country={this.props.location.country_code}
            />
          </>
        )}
      </div>
    );
  }
}
