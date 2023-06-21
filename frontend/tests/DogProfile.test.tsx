import { afterEach, describe, expect, it, vi } from "vitest";
import { Routes, Route, BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DogProfile from "../src/components/DogProfile";

describe("ChatDisplay", () => {
  it("renders the component", () => {
    render(<DogProfile />);
  });
});
