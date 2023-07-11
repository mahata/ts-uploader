import { S3FileRepository } from "@/app/backend/repository/FileRepository";
import { writeFile } from "fs/promises";
import { S3Client } from "@aws-sdk/client-s3";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.fn(),
  unlinkSync: jest.fn(),
}));

jest.mock("fs/promises", () => ({
  ...jest.requireActual("fs/promises"),
  writeFile: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@aws-sdk/client-s3");

const mockedWriteFile = jest.mocked(writeFile);
const mockedS3Client = new S3Client({});
mockedS3Client.send = jest.fn();

describe("S3FileRepository", () => {
  let s3FileRepository: S3FileRepository;
  let myFile: Partial<File>;

  beforeEach(() => {
    s3FileRepository = new S3FileRepository();

    myFile = {
      name: "dummy.png",
      arrayBuffer: jest.fn().mockResolvedValueOnce(Buffer.from("dummy")),
    };
  });

  it("saveFile() writes file to /tmp", async () => {
    await s3FileRepository.saveFile(myFile as File);

    expect(mockedWriteFile).toHaveBeenCalledWith(
      `/tmp/${myFile.name}`,
      expect.anything()
    );
  });
});
