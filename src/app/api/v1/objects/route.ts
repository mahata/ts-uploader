import { NextResponse } from "next/server";
import { S3Service, S3ServiceImpl } from "@/app/backend/service/S3Service";
import { S3RepositoryImpl } from "@/app/backend/repository/S3Repository";

const s3Service = new S3ServiceImpl(new S3RepositoryImpl());

export async function GET() {
  const objectKeys = await s3Service.getObjectKeys();

  return NextResponse.json({ objectKeys });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  await s3Service.pubObject(file);

  return NextResponse.json({
    message: "success",
    objectKey: file.name,
  });
}
