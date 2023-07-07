import { FileServiceImpl } from "@/app/backend/service/FileService";

describe("FileService", () => {
  it("saveFile() triggers repository's saveFile()", () => {
    const fileRepositorySpy = {
      saveFile: jest.fn(),
    };
    const fileService = new FileServiceImpl(fileRepositorySpy);
    const file = new File(["dummy"], "dummy.png", { type: "image/png" });

    fileService.saveFile(file);

    expect(fileRepositorySpy.saveFile).toBeCalled();
    expect(fileRepositorySpy.saveFile).toBeCalledWith(file);
  });
});
