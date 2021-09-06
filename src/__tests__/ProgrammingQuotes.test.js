import {
  render,
  screen,
  waitFor,
  userEvent,
  getByRole,
} from "@testing-library/react";
import ProgrammingQuotes from "../components/ProgrammingQuotes/ProgrammingQuotes";

describe("ProgrammingQuotes Unit Test", () => {
  test("Initial state", async () => {
    const sampleData = { quote: "lorem", author: "ipsum" };
    render(<ProgrammingQuotes />);
    jest
      .spyOn(ProgrammingQuotes.prototype, "getQuote")
      .mockImplementation(() => {
        return sampleData;
      });
    const quote = await screen.findByTestId("quote");
    await waitFor(() => {
      expect(quote).toHaveTextContent(sampleData.quote);
    });
    test("Refreshes quote on click", async () => {
      const sampleData = {
        quote: "Flygande bäckasiner söka hwila på mjuka tuvor",
        author: "kungen",
      };

      jest
        .spyOn(ProgrammingQuotes.prototype, "getQuote")
        .mockImplementation(() => {
          return sampleData;
        });
      render(<ProgrammingQuotes />);
      const quote = await screen.findByTestId("quote");
      const refresh = getByTestId("refresh");
      await waitFor(() => {
        userEvent.click();
        expect(quote).toHaveTextContent(sampleData.quote);
      });
    });
  });
});
