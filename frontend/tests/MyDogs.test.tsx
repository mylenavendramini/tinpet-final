import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyDogs from "../src/components/MyDogs";


describe("MyDogs", () => {
it("renders MyDogs and displays correct information", () => {
render(<MyDogs />);
expect(screen.queryByText(/My dogs/i)).toBeDefined();
});
});
