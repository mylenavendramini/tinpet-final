import { describe, it, expect } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../frontend/src/pages/Home";
import { render, screen } from "@testing-library/react";
import { assertType, expectTypeOf } from "vitest";

describe("Home", () => {
  it("renders", () => {
    render(
      <BrowserRouter>
        <Routes>
        {<Route path='/' element={<Home />} />}
        </Routes>
      </BrowserRouter>
    );
    const pet = screen.getByTestId('tinPet')
    expect(pet).toBe('TinPet')
  });
});
