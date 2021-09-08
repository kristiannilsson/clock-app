import { render, screen } from "@testing-library/react";
import ClockContainer from "../components/ClockContainer/ClockContainer";

describe("ClockContainer Integration Test", () => {
  const fakeData = {
    location: {
      city: "Uppsala",
      country_code: "SE",
      time_zone: "Europe/Stockholm",
    },
    time: new Date(),
  };
  test("Displays given props", async () => {
    render(
      <ClockContainer time={fakeData.time} location={fakeData.location} />
    );

    const city = await screen.findByText(fakeData.location.city, {
      exact: false,
    });
    const time_zone = await screen.findByText("WET", {
      exact: false,
    });
    const country_code = await screen.findByText(
      fakeData.location.country_code,
      {
        exact: false,
      }
    );
  });
  test("Displays time in correct format", async () => {
    render(
      <ClockContainer time={fakeData.time} location={fakeData.location} />
    );
    const time = await screen.findByText(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      exact: false,
    });
  });
  test("Displays appropiate greeting", async () => {
    render(
      <ClockContainer time={fakeData.time} location={fakeData.location} />
    );
    const time = await screen.findByText(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      exact: false,
    });
    const greeting = screen.getByText("Good", { exact: false });
    const hour = Number(time.innerHTML.substring(0, 2));
    if (hour > 5 && hour < 12) {
      expect(greeting).toHaveTextContent("morning");
    } else if (hour < 18) {
      expect(greeting).toHaveTextContent("afternoon");
    } else {
      expect(greeting).toHaveTextContent("evening");
    }
  });
});
