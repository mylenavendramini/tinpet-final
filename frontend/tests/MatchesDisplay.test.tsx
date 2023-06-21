import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import apiService from "../src/services/APIServices";
import { Message } from "../src/types/Types";
import { Routes, Route, BrowserRouter, MemoryRouter } from "react-router-dom";
import MatchesDisplay from "../src/components/MatchesDisplay";

describe("ChatDisplay", () => {
  it("renders the component", () => {
    render(
      <BrowserRouter>
        <Routes>{<Route path="/" element={<MatchesDisplay />} />}</Routes>
      </BrowserRouter>
    );
  });

  it("displays button to submit a message", () => {
    render(<MatchesDisplay />);


    const paragraph = screen.queryByText(
      /Matches/i
    );
    expect(paragraph).toBeDefined();
  });
});
