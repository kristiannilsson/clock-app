import "./App.css";
import ProgrammingQuotes from "./components/ProgrammingQuotes";
import React, { Component } from "react";
import ClockContainer from "./components/ClockContainer/ClockContainer";

export default class App extends Component {
  state = {
    windowWidth: window.innerWidth,
    time: new Date(),
    location: undefined,
  };
  async componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.timer = setInterval(this.tick, 1000);
    const loc = await this.getLocation();
    this.setState({ location: loc });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    clearInterval(this.timer);
  }

  //returns "day" or "night" depending on hour
  getTimeOfDay(hour) {
    return hour > 5 && hour < 18 ? "day" : "night";
  }

  tick = () => {
    const newTime = new Date();
    const timeOfDay = this.getTimeOfDay(newTime.getHours());
    const newState = { time: newTime };
    if (this.state.timeOfDay !== timeOfDay) {
      newState.timeOfDay = timeOfDay;
    }
    this.setState(newState);
  };

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  async getLocation() {
    try {
      const api_call = await fetch("https://freegeoip.app/json/");
      return await api_call.json();
    } catch (err) {
      console.log(err);
    }
  }

  getDevice() {
    const width = this.state.windowWidth;
    if (width < 550) {
      return "mobile";
    } else if (width < 1100) {
      return "tablet";
    } else {
      return "desktop";
    }
  }

  setTimeOfDay = (timeOfDay) => {};

  render() {
    return (
      <div
        className="app"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
          url("./assets/${this.getDevice()}/bg-image-${
            this.state.timeOfDay
          }time.jpg")`,
        }}
      >
        <ProgrammingQuotes />
        <ClockContainer time={this.state.time} location={this.state.location} />
      </div>
    );
  }
}
