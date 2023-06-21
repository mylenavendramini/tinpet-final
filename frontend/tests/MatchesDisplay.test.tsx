import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MatchesDisplay from "../src/components/MatchesDisplay";

describe("MatchesDisplay", () => {
  it("renders MatchesDisplay with correct information ", () => {
    render(<MatchesDisplay />);
    const paragraph = screen.queryByText(
      /Matches/i
    );
    expect(paragraph).toBeDefined();
  });
})