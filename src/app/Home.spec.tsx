import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("shows a link to the file upload page", async () => {
    render(<Home />);

    expect(
      await screen.findByRole("link", { name: "Upload a file" })
    ).toHaveAttribute("href", "/upload");
  });
});
