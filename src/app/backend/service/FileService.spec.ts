import { S3ServiceImpl } from "@/app/backend/service/S3Service";

describe("FileService", () => {
  it("pubObject() triggers repository's pubObject()", () => {
    const fileRepositorySpy = {
      pubObject: jest.fn(),
    };
    const fileService = new S3ServiceImpl(fileRepositorySpy);
    const file = new File(["dummy"], "dummy.png", { type: "image/png" });

    fileService.pubObject(file);

    expect(fileRepositorySpy.pubObject).toBeCalled();
    expect(fileRepositorySpy.pubObject).toBeCalledWith(file);
  });
});
