import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Books from "./Books";
import { HOST_NAME } from "../../Constants/constants";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.get(`${HOST_NAME}/books/10`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "20",
          title: "Dune: The Duke of Caladan",
          year: "2020",
          author: ["Brian Herbert", "Kevin J. Anderson"],
          wiki_url: "https:/en.wikipedia.org/wiki/Dune:_The_Duke_of_Caladan",
        },
        {
          id: "15",
          title: "Paul of Dune",
          year: "2008",
          author: ["Brian Herbert", "Kevin J. Anderson"],
          wiki_url: "https:/en.wikipedia.org/wiki/Paul_of_Dune",
        },
        {
          id: "4",
          title: "God Emperor of Dune",
          year: "1981",
          author: "Frank Herbert",
          wiki_url: "https:/en.wikipedia.org/wiki/God_Emperor_of_Dune",
        },
      ])
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

describe("<Books>", () => {
  it("success loading data,click on row ", async () => {
    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(/Paul of Dune/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    await waitFor(() => {
      const author = screen.getAllByText(/Brian Herbert,Kevin J. Anderson/i);
      expect(author[0]).toBeInTheDocument();
    });
  });
  it("failed loading data ", async () => {
    server.use(
      rest.get(`${HOST_NAME}/books/10`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    const linkElement = await screen.findByText(
      /Unexpected end of JSON input/i
    );
    expect(linkElement).toBeInTheDocument();
  });
});
