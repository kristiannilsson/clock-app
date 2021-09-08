import React, { Component } from "react";
import styles from "./ProgrammingQuotes.module.css";
import refresh from "../assets/desktop/icon-refresh.svg";

export default class ProgrammingQuotes extends Component {
  state = { quote: undefined, author: undefined };

  componentDidMount() {
    this.updateQuote();
  }

  updateQuote = async () => {
    const res = await this.getQuote();
    this.setState({ quote: res.quote, author: res.author });
  };

  async getQuote() {
    try {
      const api_call = await fetch(
        "http://quotes.stormconsultancy.co.uk/random.json"
      );
      return await api_call.json();
    } catch (err) {
      alert(`${err}`);
    }
  }
  render() {
    return (
      <div className={styles.container}>
        {this.state.quote && (
          <p data-testid="quote" className={styles.quote}>
            "{this.state.quote}"<br /> <br />
            <strong className={styles.author}>{this.state.author}</strong>
          </p>
        )}
        <input
          className={styles.refresh}
          type="image"
          src={refresh}
          onClick={this.updateQuote}
          alt="refresh"
        />
      </div>
    );
  }
}
