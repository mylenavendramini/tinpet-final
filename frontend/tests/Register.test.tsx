import { describe, expect } from "vitest";
import { render, screen,} from "@testing-library/react";
import Register from "../src/components/Register";




describe("Register", () => {
  test("renders the component correctly", () => {
    render(<Register />);
    expect(screen.queryByText(/Create an account/i)).toBeDefined()
  });
});