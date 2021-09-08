import { Component } from "react";
import styles from "./ClockContainer.module.css";
import moon from "../../assets/desktop/icon-moon.svg";
import sun from "../../assets/desktop/icon-sun.svg";
import Clock from "./Clock";
import Greeting from "./Greeting";
import City from "./City";
import timezones from "./timezones.json";

export default class ClockContainer extends Component {
  state = { time: new Date(), location: undefined };

  async componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
    const loc = await this.getLocation();
    this.setState({ location: loc });
  }

  //Send up timeOfDay to App.js and update state if necessary.
  componentDidUpdate() {
    const hour = this.state.time;
    const timeOfDay = hour > 5 && hour < 18 ? "day" : "night";
    this.props.setBackgroundPathCB(timeOfDay);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async getLocation() {
    try {
      const api_call = await fetch("https://freegeoip.app/json/");
      return await api_call.json();
    } catch (err) {
      console.log(err);
    }
  }

  //maps the right abbreviation to the right timezone
  timeZoneMapper() {
    return timezones[this.state.location.time_zone];
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

  /* Returns hours and minutes from this.state.time in string format. 
  Also Prefixes "0" to hours and minutes < 10. */
  timeToString() {
    const time = this.state.time;
    //Prefixes "0" to hours and minutes < 10.
    const hours =
      time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    const minutes =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;

    return `${hours}:${minutes}`;
  }

  //Updates time
  tick = () => {
    this.setState({ time: new Date() });
  };

  render() {
    //Returns object from greetingGenerator() with current time as parameter
    const greetingRes = this.greetingGenerator(this.state.time.getHours());
    return (
      <div className={styles.clockContainer}>
        {this.state.location && (
          <>
            <Greeting icon={greetingRes.icon} greeting={greetingRes.greeting} />
            <Clock
              time={this.timeToString()}
              timezone={this.timeZoneMapper()}
            />

            <City
              city={this.state.location.city}
              country={this.state.location.country_code}
            />
          </>
        )}
      </div>
    );
  }
}
