import React, { Component } from "react";

export default class Location extends Component {
  async componentDidMount() {
    const api_call = await fetch("https://freegeoip.app/json/");
    const response = await api_call.json();
    console.log(response);
  }
  render() {
    return <div></div>;
  }
}
