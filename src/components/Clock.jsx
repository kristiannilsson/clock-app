import React, { Component } from "react";

export default class Clock extends Component {
  state = { time: new Date() };

  render() {
    return (
      <>
        <h1>{this.state.time.toLocaleTimeString()}</h1>
      </>
    );
  }
}

/*
    1. Lägg till date i state
    2. Lifecycle: componentDidMount() and componentWillUnmount()
    3. Visa bild
    4. Lägg till tick.
    5. Lägg till timer, och rensa den.
    6. Recap
*/
