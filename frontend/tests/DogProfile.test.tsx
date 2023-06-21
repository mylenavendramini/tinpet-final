import { describe,it } from "vitest";
import { render} from "@testing-library/react";
import DogProfile from "../src/components/DogProfile";

describe("DogProfile", () => {
  it("renders DogProfile", () => {
    render(<DogProfile />);
  });
});
