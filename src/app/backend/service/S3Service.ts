import { S3Repository } from "@/app/backend/repository/S3Repository";

export interface S3Service {
  pubObject(file: File): Promise<void>;
  getObjectKeys(): Promise<string[]>;
  getSignedUrl(objectKey: string): Promise<string>;
}

export class S3ServiceImpl implements S3Service {
  s3Repository: S3Repository;

  constructor(_s3Repository: S3Repository) {
    this.s3Repository = _s3Repository;
  }

  pubObject(file: File) {
    return this.s3Repository.pubObject(file);
  }

  getObjectKeys() {
    return this.s3Repository.getObjectKeys();
  }

  getSignedUrl(objectKey: string): Promise<string> {
    return this.s3Repository.getSignedUrl(objectKey);
  }
}
