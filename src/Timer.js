import React, { Component } from "react";
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

const DEFAULT_SECONDS = 45;

export default class Timer extends Component {
  constructor(props) {
    super(props);

    const seconds =
      parseInt(localStorage.getItem("seconds"), 10) || DEFAULT_SECONDS;
    this.state = {
      initialSeconds: seconds,
      seconds,
      isEditingSeconds: false,
      timerState: "timer-state--stopped",
      quote: getRandomQuote()
    };
  }

  tick = () => {
    const { seconds } = this.state;
    const newSeconds = seconds - 1;
    if (newSeconds > 0) {
      this.setState({ seconds: newSeconds });
    } else {
      this.setState({ seconds: 0 });
      this.stopTimer();
      completed();
    }
  };

  startTimer = () => {
    const { seconds, initialSeconds } = this.state;
    clearInterval(this.timer);
    this.setState({
      timerState: "timer-state--running"
    });
    if (seconds <= 0) {
      this.setState(
        {
          seconds: initialSeconds,
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
        seconds: this.state.initialSeconds,
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

  editSeconds = () => {
    this.setState({
      isEditingSeconds: true
    });
  };

  saveSeconds = event => {
    if (event.key === "Enter") {
      const { seconds, initialSeconds } = this.state;
      const newSeconds = event.target.value;
      localStorage.setItem("seconds", newSeconds);
      this.setState({
        isEditingSeconds: false,
        initialSeconds: newSeconds
      });
      if (seconds === initialSeconds || newSeconds < seconds) {
        this.setState({
          seconds: newSeconds
        });
      }
    }
  };

  render() {
    const {
      seconds,
      timerState,
      quote,
      isEditingSeconds,
      initialSeconds
    } = this.state;
    return (
      <>
        <div className="buttons">
          <button onClick={this.startTimer}>Start</button>
          <button onClick={this.stopTimer}>Stop</button>
          <button onClick={this.restartTimer}>Restart</button>
        </div>
        {isEditingSeconds ? (
          <div className="edit-seconds">
            <input
              type="text"
              autoFocus
              defaultValue={initialSeconds}
              onKeyPress={this.saveSeconds}
            />
          </div>
        ) : (
          <h2 className={`timer-state ${timerState}`} onClick={this.editSeconds}>
            {seconds}
          </h2>
        )}
        <Quote quote={quote} />
      </>
    );
  }
}
