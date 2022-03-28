import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Error from "./Error";
import { BrowserRouter } from "react-router-dom";

describe("<Error/>", () => {
  it("show error ", async () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
    render(
      <BrowserRouter>
        <Error message="Test" />
      </BrowserRouter>
    );

    const buttonElement = await screen.findByText(/Test/i);
    expect(buttonElement).toBeInTheDocument();

    await waitFor(() => {
      //   expect(
      //     buttonElement?.parentElement?.classList.contains("Error__close")
      //   ).toBe(true);
      expect(setTimeout).toHaveBeenCalled();
    });
  });
});
