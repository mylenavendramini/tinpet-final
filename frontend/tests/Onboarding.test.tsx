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
    expect(screen.getByText("Create a dog")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("About my Pet")).toBeInTheDocument();
    expect(screen.getByText("Profile Picture")).toBeInTheDocument();

  });
});