import React from "react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { HOST_NAME } from "../../Constants/constants";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../../Components/AppRouter";

const server = setupServer(
  rest.get(`${HOST_NAME}/books/id/20`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: "20",
        title: "Dune: The Duke of Caladan",
        year: "2020",
        author: ["Brian Herbert", "Kevin J. Anderson"],
        wiki_url: "https:/en.wikipedia.org/wiki/Dune:_The_Duke_of_Caladan",
      })
    );
  })
);
// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe("<OneBook>", () => {
  it("success loading data ", async () => {
    window.history.pushState({}, "", `/books/20`);

    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/Dune: The Duke of Caladan/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("failed loading data ", async () => {
    server.use(
      rest.get(`${HOST_NAME}/books/id/1`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    window.history.pushState({}, "", `/books/1`);

    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(
      /Unexpected end of JSON input/i
    );
    expect(linkElement).toBeInTheDocument();
  });
  it("get wrong data ", async () => {
    server.use(
      rest.get(`${HOST_NAME}/books/id/1`, (req, res, ctx) => {
        return res(
          ctx.json({
            id: "",
            title: "",
            year: "",
            author: [],
            wiki_url: "",
          })
        );
      })
    );

    window.history.pushState({}, "", `/books/1`);

    render(
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/No title/i);
    expect(linkElement).toBeInTheDocument();
  });
});
