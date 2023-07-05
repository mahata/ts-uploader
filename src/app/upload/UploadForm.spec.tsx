import UploadForm from "@/app/upload/page";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const originalFetch = global.fetch;

describe("UploadForm", () => {
  afterEach(() => {
    if (jest.isMockFunction(global.fetch)) {
      global.fetch = originalFetch;
    }
  });

  it("displays an input form for file upload", () => {
    render(<UploadForm />);

    expect(screen.getByText("A file to upload")).toBeInTheDocument();

    const fileInputEl = screen.getByLabelText("File uploader");
    expect(fileInputEl).toHaveAttribute("type", "file");
    expect(fileInputEl).toHaveAttribute("multiple");

    const uploadButtonEl = screen.getByRole("button", { name: "Upload" });
    expect(uploadButtonEl).toBeInTheDocument();
  });

  it("shows the filenames of the uploaded files", async () => {
    const imageFileName = "my.png";

    const stubResponse = { message: "success", filename: imageFileName };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(stubResponse),
      })
    );

    render(<UploadForm />);

    const fileInputEl = screen.getByLabelText("File uploader");
    const file = new File(["dummy"], imageFileName, { type: "image/png" });

    await userEvent.upload(fileInputEl, file);

    const uploadButtonEl = screen.getByRole("button", { name: "Upload" });
    await userEvent.click(uploadButtonEl);

    new Promise((done) => setTimeout(done, 1000));

    expect(
      await screen.findByText(`Uploaded: ${imageFileName}`)
    ).toBeInTheDocument();
  });
});
