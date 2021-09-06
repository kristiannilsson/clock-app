import { render, screen, fireEvent } from "@testing-library/react";
import ProgrammingQuotes from "../components/ProgrammingQuotes/ProgrammingQuotes";

describe("ProgrammingQuotes Unit Test", () => {
  test("Refreshes quote on click", async () => {
    const sampleData1 = { quote: "lorem", author: "ipsum" };
    const sampleData2 = {
      quote: "Yxmördaren Julia Blomqvist på fäktning i Schweiz",
      author: "ipsum",
    };
    const spy = jest
      .spyOn(ProgrammingQuotes.prototype, "getQuote")
      .mockImplementationOnce(() => {
        return sampleData1;
      })
      .mockImplementationOnce(() => {
        return sampleData2;
      });
    render(<ProgrammingQuotes />);

    //getQuote() is called exactly once in mount
    expect(spy).toBeCalledTimes(1);

    let quote = await screen.findByTestId("quote");
    expect(quote).toHaveTextContent(sampleData1.quote);

    const refresh = screen.getByAltText("refresh");
    fireEvent.click(refresh);

    expect(spy).toBeCalledTimes(2);

    quote = await screen.findByTestId("quote");
    expect(quote).toHaveTextContent(sampleData2.quote);
  });
});
