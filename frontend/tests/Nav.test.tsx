import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "../src/components/Nav";


describe("Nav", () => {
it("renders Nav and displays correct buttons ", () => {
render(<Nav />);
expect(
    screen.getByRole("button", { name: /Home/i })
  ).toBeDefined()
expect(
    screen.getByRole("button", { name: /Log In/i })
  ).toBeDefined()
// expect(
//     screen.getByRole("button", { name: /Add new dog/i })
//   ).toBeDefined()
// expect(
//     screen.getByRole("button", { name: /Log Out/i })
//   ).toBeDefined()
});
});
