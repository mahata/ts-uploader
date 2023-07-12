import { writeFile } from "fs/promises";
import fs from "fs";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface S3Repository {
  pubObject(file: File): Promise<void>;
  getObjectKeys(): Promise<string[]>;
  getSignedUrl(objectKey: string): Promise<string>;
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

export class S3RepositoryImpl implements S3Repository {
  async pubObject(file: File) {
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

    return;
  }

  async getObjectKeys() {
    const output = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        MaxKeys: 10,
      })
    );

    return output.Contents?.map(({ Key }) => Key as string) || [];
  }

  async getSignedUrl(objectKey: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: objectKey,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 300 });
  }
}
