const React = require("react");
const {
  render,
  screen,
  fireEvent,
  waitFor,
} = require("@testing-library/react");
const mock = require('./mocks');
const { register } = require('../services/APIServices');
import AuthModal from "../components/AuthModal";

jest.mock('../services/APIServices', () => ({
  register: jest.fn().mockResolvedValue({ username: 'testuser' }),
}));

describe("AuthModal", () => {
  test("renders AuthModal component", () => {
    render(<AuthModal />);

    const authModalElement = screen.getByTestId("auth-modal");
    expect(authModalElement).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  test("handles form submission and displays error", async () => {
    render(<AuthModal />);

    const usernameInput = screen.getByPlaceholderText("username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen.getByPlaceholderText("password");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    //submit the event
    fireEvent.submit(submitButton);

    await waitFor(() => {
      const errorElement = screen.getByText("Passwords needs to match!");
      expect(errorElement).toBeInTheDocument();
    });
  });

  test('handles form submission and navigates to dashboard', async () => {
    render(<AuthModal />);

    const usernameInput = screen.getByPlaceholderText('username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

  });
});
