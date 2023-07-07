import { LocalFileRepository } from "@/app/backend/repository/FileRepository";
import { writeFile } from "fs/promises";

jest.mock("fs/promises", () => ({
  writeFile: jest.fn(),
}));

describe("LocalFileRepository", () => {
  let localFileRepository: LocalFileRepository;
  let writeFileMock: jest.MockedFunction<typeof writeFile>;
  let myFile: Partial<File>;

  beforeEach(() => {
    localFileRepository = new LocalFileRepository();

    myFile = {
      name: "dummy.png",
      arrayBuffer: jest.fn().mockResolvedValueOnce(Buffer.from("dummy")),
    };

    writeFileMock = writeFile as jest.MockedFunction<typeof writeFile>;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("saveFile() writes file to /tmp", async () => {
    await localFileRepository.saveFile(myFile as File);

    expect(writeFileMock).toHaveBeenCalled();
    expect(writeFileMock).toHaveBeenCalledWith(
      "/tmp/dummy.png",
      Buffer.from("dummy")
    );
  });
});
