import { writeFile } from "fs/promises";
import fs from "fs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export interface FileRepository {
  saveFile(file: File): Promise<void>;
}

const s3Client = new S3Client({
  endpoint: "http://127.0.0.1:9000",
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export class S3FileRepository implements FileRepository {
  async saveFile(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const tmpFilePath = `/tmp/${file.name}`;

    await writeFile(tmpFilePath, buffer).then(async () => {
      const fileBuffer = fs.readFileSync(tmpFilePath);

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: file.name,
          Body: fileBuffer,
        })
      );

      fs.unlinkSync(tmpFilePath);
    });
  }
}
