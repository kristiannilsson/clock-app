import { render, screen } from "@testing-library/react";
import ClockContainer from "../components/ClockContainer/ClockContainer";

describe("ClockContainer Integration Test", () => {
  const fakeData = {
    city: "Uppsala",
    time_zone: "America/Chicago",
    country_code: "SE",
  };
  test("Displays fetched data", async () => {
    const spy = jest.spyOn(global, "fetch").mockResolvedValue({
      json: () => Promise.resolve(fakeData),
    });
    render(<ClockContainer setBackgroundPathCB={jest.fn()} />);
    expect(spy).toBeCalledTimes(1);
    const city = await screen.findByText(fakeData.city, { exact: false });
    const time_zone = await screen.findByText(fakeData.country_code, {
      exact: false,
    });
    const time = await screen.findByText(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      exact: false,
    });
    expect(city).toBeTruthy();
    expect(time_zone).toBeTruthy();
    expect(time).toBeTruthy();
  });
});
