import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    window.HTMLMediaElement.prototype.play = jest.fn();
  });

  test("renders learn react link", () => {
    const { getByText } = render(<Timer />);
    const headerText = getByText(/Restart/i);
    expect(headerText).toBeInTheDocument();
  });

  test("Clicks the Start button", () => {
    const { getByText } = render(<Timer />);
    fireEvent.click(getByText("Start"));
    jest.runAllTimers();
    const secondsText = getByText("0");
    expect(secondsText).toBeInTheDocument();
    expect(secondsText).toHaveClass("timer-state--stopped");
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  });

  test("Clicks the Start button when seconds equals 0", () => {
    const { getByText } = render(<Timer seconds={0} />);
    fireEvent.click(getByText("Start"));
    const secondsText = getByText("0");
    expect(secondsText).toBeInTheDocument();
    expect(secondsText).toHaveClass("timer-state--running");
  });

  test("Clicks the Restart button", () => {
    const { getByText } = render(<Timer />);
    fireEvent.click(getByText("Restart"));
    const secondsText = getByText("45");
    expect(secondsText).toBeInTheDocument();
    expect(secondsText).toHaveClass("timer-state--running");
  });

  test("Clicks the Stop button", () => {
    const { getByText } = render(<Timer />);
    fireEvent.click(getByText("Stop"));
    const secondsText = getByText("45");
    expect(secondsText).toBeInTheDocument();
    expect(secondsText).toHaveClass("timer-state--stopped");
  });
});
