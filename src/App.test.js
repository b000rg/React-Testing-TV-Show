import React from "react";
import { screen, render } from "@testing-library/react";
import App from "./App";
import { default as mockFetchShow } from "./api/fetchShow";
import showData from "./testData/showData.json";
import userEvent from "@testing-library/user-event";

jest.mock("./api/fetchShow.js");

test("App renders correctly", () => {
  mockFetchShow.mockResolvedValueOnce(showData);

  const app = render(<App />);
  screen.findByText(/select a season/i).then((button) => {
    userEvent.click(button);
    screen.findAllByRole("option").then((options) => {
      userEvent.click(options[0]);
      expect(screen.getByTestId("episode")).toBeInTheDocument();
    });
  });
});
