import UploadForm from "@/app/upload/page";
import { render, screen } from "@testing-library/react";

describe("UploadForm", () => {
  it("displays an input form for file upload", () => {
    render(<UploadForm />);

    expect(screen.getByText("A file to upload")).toBeInTheDocument();
    expect(screen.getByLabelText("File uploader")).toHaveAttribute(
      "type",
      "file"
    );
  });
});
