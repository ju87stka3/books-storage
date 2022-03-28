import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Book from "./Book";
import { BrowserRouter } from "react-router-dom";

describe("<Book>", () => {
  const setOpen = jest.fn();
  const item = {
    id: "20",
    title: "Dune: The Duke of Caladan",
    year: "2020",
    author: ["Brian Herbert", "Kevin J. Anderson"],
    wiki_url: "https:/en.wikipedia.org/wiki/Dune:_The_Duke_of_Caladan",
  };
  const open = {
    id: "20",
    title: "Dune: The Duke of Caladan",
    year: "2020",
    author: ["Brian Herbert", "Kevin J. Anderson"],
    wiki_url: "https:/en.wikipedia.org/wiki/Dune:_The_Duke_of_Caladan",
  };
  it("click on row ", async () => {
    render(
      <BrowserRouter>
        <Book item={item} open={open} setOpen={setOpen} />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/Dune: The Duke of Caladan/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    await waitFor(() => {
      expect(setOpen).toHaveBeenCalledWith(null);
    });
  });
  it("get wrong data ", async () => {
    const item = {
      id: "",
      title: "",
      year: "",
      author: [],
      wiki_url: "",
    };
    render(
      <BrowserRouter>
        <Book item={item} open={open} setOpen={setOpen} />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/No title/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("click on button ", async () => {
    render(
      <BrowserRouter>
        <Book item={item} open={open} setOpen={setOpen} />
      </BrowserRouter>
    );

    const buttonElement = await screen.findByText(/Open in additional page/i);
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/books/20");
    });
  });
  it("click on link ", async () => {
    render(
      <BrowserRouter>
        <Book item={item} open={open} setOpen={setOpen} />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/Link for wiki/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    await waitFor(() => {
      expect(linkElement.closest("a")).toHaveAttribute(
        "href",
        "https:/en.wikipedia.org/wiki/Dune:_The_Duke_of_Caladan"
      );
    });
  });
});
