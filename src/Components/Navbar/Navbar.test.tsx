import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("<Navbar>", () => {
  it("click on link ", async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const buttonElement = await screen.findAllByText(/Books/i);
    expect(buttonElement.length).toBe(2);
    fireEvent.click(buttonElement[1]);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/books");
    });
  });
});
