import {  afterEach, describe, expect, it, vi  } from "vitest";
import { Routes, Route, BrowserRouter, MemoryRouter } from "react-router-dom";
import Home from "../../frontend/src/pages/Home";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

    const paragraph = screen.queryByText(/Your dog is lonely and has no friends/i)
    expect(paragraph).toBeDefined()
  });



  // fireEvent.click(screen.getByRole("button", { name: /Log In/i }));
  //   expect(screen.getByText("LOG IN")).toBeInTheDocument();
  // });


it('displays buttons when not authenticated', () => {
// afterEach(() => {
// vi.restoreAllMocks()
// })

// const mockContext={
// authenticated: false,
// updateSignUp: vi.fn(),
// }

// const mockNavigate = vi.fn(() => useNavigate("/login"));

// vi.mocked(mockContext)
// vi.mocked(mockNavigate)

render(
  <BrowserRouter>
    <Routes>
    {<Route path='/' element={<Home />} />}
    </Routes>
  </BrowserRouter>
);


expect(
  screen.getByRole("button", { name: /Create Account/i })
).toBeDefined()
});
})