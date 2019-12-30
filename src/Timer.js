import React, { Component } from "react";
import PropTypes from "prop-types";
import Quote from "./Quote";

import quotes from "./quotes.json";

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
const soundFilePath = "/mp3s/";
const soundFiles = [
  "A Festivus for the Rest of Us.mp3",
  "Festivus Is Back.mp3",
  "Festivus miracle.mp3",
  "Festivus rolls on.mp3",
  "Happy Festivus.mp3",
  "I celebrate Festivus.mp3"
];
const completed = () => {
  new Audio(
    `${soundFilePath}${
      soundFiles[Math.floor(Math.random() * soundFiles.length)]
    }`
  ).play();
};

export default class Timer extends Component {
  static propTypes = {
    seconds: PropTypes.number
  };

  static defaultProps = {
    seconds: 45
  };

  state = {
    seconds: this.props.seconds,
    timerState: "timer-state--stopped",
    quote: getRandomQuote()
  };

  tick = () => {
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setState({ seconds: seconds - 1 });
    } else {
      this.stopTimer();
      completed();
    }
  };

  startTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerState: "timer-state--running"
    });
    if (this.state.seconds <= 0) {
      this.setState(
        {
          seconds: this.props.seconds,
          quote: getRandomQuote()
        },
        () => (this.timer = setInterval(this.tick, 1000))
      );
    } else {
      this.timer = setInterval(this.tick, 1000);
    }
  };

  restartTimer = () => {
    clearInterval(this.timer);
    this.setState(
      {
        seconds: this.props.seconds,
        timerState: "timer-state--running",
        quote: getRandomQuote()
      },
      () => this.startTimer()
    );
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerState: "timer-state--stopped"
    });
  };

  render() {
    const { seconds, timerState, quote } = this.state;
    return (
      <>
        <div className="buttons">
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          <button onClick={this.restartTimer}>Restart</button>
        </div>
        <h2 className={timerState}>{seconds}</h2>
        <Quote quote={quote} />
      </>
    );
  }
}
