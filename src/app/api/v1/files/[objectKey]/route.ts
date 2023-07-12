import { NextResponse } from "next/server";
import { Request } from "next/dist/compiled/@edge-runtime/primitives";
import { S3ServiceImpl } from "@/app/backend/service/S3Service";
import { S3RepositoryImpl } from "@/app/backend/repository/S3Repository";

const s3Service = new S3ServiceImpl(new S3RepositoryImpl());

export async function GET(
  request: Request,
  { params }: { params: { objectKey: string } }
) {
  const objectKey = params.objectKey;

  const signedUrl = await s3Service.getSignedUrl(objectKey);

  return NextResponse.json({
    message: "yo",
    url: signedUrl,
  });
}
