// test.js
import { render, screen, fireEvent } from "@testing-library/react";
import { mockNavigate } from "./mock";
import { register } from "../services/APIServices";
import AuthModal from "../components/AuthModal";

jest.mock("../services/APIServices", () => ({
  register: jest.fn().mockResolvedValue({ username: "testuser" }),
}));

test("handles form submission and navigates to dashboard", async () => {
  render(<AuthModal />);

  //user inputs
  const usernameInput = screen.getByPlaceholderText("username");
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
});
