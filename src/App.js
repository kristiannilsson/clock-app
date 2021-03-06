import "./App.css";
import ProgrammingQuotes from "./components/ProgrammingQuotes";
import React, { Component } from "react";
import ClockContainer from "./components/ClockContainer/ClockContainer";
import Button from "./components/Button";
import DateInfo from "./components/DateInfo";

export default class App extends Component {
  state = {
    windowWidth: window.innerWidth,
    time: new Date(),
    location: undefined,
    styles: {
      appClassname: "app",
      quotesDisplay: "flex",
      dateInfoPos: "-40vh",
    },
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
    if (newTime.getMinutes() !== this.state.time.getMinutes()) {
      this.setState({ time: new Date() });
    }
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

  handleButtonClick = () => {
    clearInterval(this.timer);
    if (this.state.styles.appClassname === "app") {
      this.setState({
        styles: {
          appClassname: "app app-collapse",
          quotesDisplay: "none",
          dateInfoPos: 0,
        },
      });
    } else {
      this.setState({
        styles: {
          appClassname: "app",
          quotesDisplay: "flex",
          dateInfoPos: "-40vh",
        },
      });
    }
    this.timer = setInterval(this.tick, 1000);
  };

  render() {
    console.log("render");
    const hour = this.state.time.getHours();
    return (
      <>
        <div
          className="bg-container"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
          url("./assets/${this.getDevice()}/bg-image-${this.getTimeOfDay(
              hour
            )}time.jpg")`,
            height: "100vh",
          }}
        >
          <div className={this.state.styles.appClassname}>
            <ProgrammingQuotes display={this.state.styles.quotesDisplay} />
            <main>
              <ClockContainer
                time={this.state.time}
                location={this.state.location}
              />
              <Button callback={this.handleButtonClick} />
            </main>
          </div>
        </div>
        <DateInfo bottom={this.state.styles.dateInfoPos} />
      </>
    );
  }
}
