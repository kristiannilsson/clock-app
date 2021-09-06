import "./App.css";
import ProgrammingQuotes from "./components/ProgrammingQuotes/ProgrammingQuotes";
import React, { Component } from "react";
import Location from "./components/Location.jsx";

export default class App extends Component {
  render() {
    return (
      <>
        <ProgrammingQuotes />
        <Location />
      </>
    );
  }
}
