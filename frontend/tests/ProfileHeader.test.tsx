import { describe, expect } from "vitest";
import { render, screen,} from "@testing-library/react";
import ProfileHeader from "../src/components/ProfileHeader";




describe("ProfileHeader", () => {
  test("renders the component correctly", () => {
    render(<ProfileHeader />);
  });
});