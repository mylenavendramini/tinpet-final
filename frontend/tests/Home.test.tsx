import {  afterEach, beforeEach, describe, expect, it, vi  } from "vitest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../frontend/src/pages/Home";
import { render, screen} from "@testing-library/react";
import { assertType, expectTypeOf } from "vitest";
import { useNavigate } from "react-router";
import { Context } from "../src/Context/Context";
import { useContext } from "react";
import React from 'react'

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
    expect(pet).toBeDefined()
  });

it('displays buttons when not authenticated', () => {
afterEach(() => {
vi.restoreAllMocks()
})

const mockContext={
authenticated: false,
updateSignUp: vi.fn(),
}

const mockNavigate = vi.fn();

vi.mocked(mockContext)
vi.mocked(mockNavigate)

render(
  <BrowserRouter>
    <Routes>
    {<Route path='/' element={<Home />} />}
    </Routes>
  </BrowserRouter>
);
expect(screen.getByText('Create Account')).toBeDefined();
expect(screen.getByText('Login')).toBeDefined();
})
})

  