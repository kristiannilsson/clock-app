import { render, screen } from "@testing-library/react";
import Greeting from "../components/ClockContainer/Greeting";

describe("Clock Unit tests", () => {
  const fakeData = { icon: "Stockholm", greeting: "Good afternoon" };
  test("Displays given props", () => {
    render(<Greeting icon={fakeData.icon} greeting={fakeData.greeting} />);
    expect(screen.getByTestId("greeting")).toHaveTextContent(fakeData.greeting);
  });
  test("Renders correctly", () => {
    const tree = render(
      <Greeting icon={fakeData.icon} greeting={fakeData.greeting} />
    );
    expect(tree).toMatchSnapshot();
  });
});
