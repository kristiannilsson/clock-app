import { render, screen } from "@testing-library/react";
import Clock from "../components/ClockContainer/Clock";

describe("Clock Unit tests", () => {
  const fakeTime = `11:34`;
  test("Displays given props", () => {
    render(<Clock time={fakeTime} />);
    expect(screen.getByTestId("time")).toHaveTextContent(fakeTime);
  });
  test("Renders correctly", () => {
    const tree = render(<Clock time={fakeTime} />);
    expect(tree).toMatchSnapshot();
  });
});
