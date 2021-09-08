import { render, screen } from "@testing-library/react";
import City from "../components/ClockContainer/City";

describe("Clock Unit tests", () => {
  const fakeData = { city: "Stockholm", country: "SWE" };
  test("Displays given props", () => {
    render(<City city={fakeData.city} country={fakeData.country} />);
    expect(screen.getByTestId("city")).toHaveTextContent(fakeData.city);
  });
  test("Renders correctly", () => {
    const tree = render(
      <City cityu={fakeData.city} country={fakeData.country} />
    );
    expect(tree).toMatchSnapshot();
  });
});
