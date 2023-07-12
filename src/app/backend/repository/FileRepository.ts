import { writeFile } from "fs/promises";
import fs from "fs";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export interface FileRepository {
  saveFile(file: File): Promise<void>;
  getFiles(): Promise<string[]>;
}

const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT,
  region: process.env.AWS_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: file.name,
          Body: fileBuffer,
        })
      );

      fs.unlinkSync(tmpFilePath);
    });
  }

  async getFiles() {
    const output = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        MaxKeys: 10,
      })
    );

    return output.Contents?.map(({ Key }) => Key as string) || [];
  }
}
