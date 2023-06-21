import { afterEach, describe, it, expect, vi } from "vitest";
import { Route, Routes, BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Onboarding from "../src/pages/Onboarding";





describe("Onboarding page", () => {
  test("renders the component correctly", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    );
    expect(screen.queryByText(/Create a dog/i)).toBeDefined()
    expect(screen.queryByText(/Name/i)).toBeDefined()
    expect(screen.queryByText(/About my Pet/i)).toBeDefined()
    expect(screen.queryByText(/Profile Picture/i)).toBeDefined()
  });
});