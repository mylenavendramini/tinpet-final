import {  describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Login from "../src/components/Login";

describe("Login", () => {
  it("renders Login and displays Login", () => {
    render(<Login />);
    const Loginh2 = screen.queryByText(/Login/i);
    expect(Loginh2).toBeDefined();
  });
});
