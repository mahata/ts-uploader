import { S3RepositoryImpl } from "@/app/backend/repository/S3Repository";
import { writeFile } from "fs/promises";

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

describe("S3FileRepository", () => {
  let s3FileRepository: S3RepositoryImpl;
  let myFile: Partial<File>;

  beforeEach(() => {
    s3FileRepository = new S3RepositoryImpl();

    myFile = {
      name: "dummy.png",
      arrayBuffer: jest.fn().mockResolvedValueOnce(Buffer.from("dummy")),
    };
  });

  it("pubObject() writes file to /tmp", async () => {
    await s3FileRepository.pubObject(myFile as File);

    expect(mockedWriteFile).toHaveBeenCalledWith(
      `/tmp/${myFile.name}`,
      expect.anything()
    );
  });
});
