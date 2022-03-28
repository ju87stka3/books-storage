import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { showAuthors } from "./Books";

describe("Show authors helper", () => {
  it("without data ", () => {
    expect(showAuthors("")).toBe(undefined);
  });
});
