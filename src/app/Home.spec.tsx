import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("shows a link to the upload objects page", async () => {
    render(<Home />);

    expect(
      await screen.findByRole("link", { name: "Upload a file" })
    ).toHaveAttribute("href", "/upload");
  });

  it("shows a link to the showcase page", async () => {
    render(<Home />);

    expect(
      await screen.findByRole("link", { name: "Go Showcase" })
    ).toHaveAttribute("href", "/showcase");
  });
});
