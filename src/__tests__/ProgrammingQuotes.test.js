import { render, screen, fireEvent } from "@testing-library/react";
import ProgrammingQuotes from "../components/ProgrammingQuotes";

describe("ProgrammingQuotes Unit Test", () => {
  test("Renders correctly", () => {
    const tree = render(<ProgrammingQuotes />);
    expect(tree).toMatchSnapshot();
  });
  test("Refreshes quote on click", async () => {
    const sampleData1 = { quote: "lorem", author: "ipsum" };
    const sampleData2 = {
      quote: "Yxmördaren Julia Blomqvist på fäktning i Schweiz",
      author: "ipsum",
    };
    const spy = jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce({
        json: () => Promise.resolve(sampleData1),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(sampleData2),
      });
    render(<ProgrammingQuotes />);

    //fetches once in mount
    expect(spy).toBeCalledTimes(1);

    //Right quote is rendered initally
    let quote = await screen.findByTestId("quote");
    expect(quote).toHaveTextContent(sampleData1.quote);

    //User presses refresh button
    const refresh = screen.getByAltText("refresh");
    fireEvent.click(refresh);

    //Fetch should now be called twice
    expect(spy).toBeCalledTimes(2);

    //Right quote is displayed after hitting refresh
    quote = await screen.findByTestId("quote");
    expect(quote).toHaveTextContent(sampleData2.quote);
  });
});
