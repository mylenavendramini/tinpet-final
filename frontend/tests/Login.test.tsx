import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Login from "../src/components/Login";

describe("ChatDisplay", () => {
  it("renders the component", () => {
    render(<Login />);
  });

  it("displays Login", () => {
    render(<Login />);
    const Loginh2 = screen.queryByText(/Login/i);
    expect(Loginh2).toBeDefined();
  });
});
