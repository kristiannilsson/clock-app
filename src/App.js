import "./App.css";
import ProgrammingQuotes from "./components/ProgrammingQuotes";
import React, { Component } from "react";
import ClockContainer from "./components/ClockContainer/ClockContainer";

export default class App extends Component {
  state = { windowWidth: window.innerWidth, timeOfDay: undefined };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    console.log(this.state.windowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

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

  setTimeOfDay = (timeOfDay) => {
    if (this.state.timeOfDay !== timeOfDay) {
      this.setState({
        timeOfDay: timeOfDay,
      });
    }
  };

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
        <ClockContainer setBackgroundPathCB={this.setTimeOfDay} />
      </div>
    );
  }
}
