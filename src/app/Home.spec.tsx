import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("shows 'Hello, world!'", () => {
    render(<Home />);

    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
});
