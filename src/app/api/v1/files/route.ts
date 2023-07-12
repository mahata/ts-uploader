import { NextResponse } from "next/server";
import {
  FileService,
  FileServiceImpl,
} from "@/app/backend/service/FileService";
import { S3FileRepository } from "@/app/backend/repository/FileRepository";

const fileService: FileService = new FileServiceImpl(new S3FileRepository());

export async function GET() {
  const files = await fileService.getFiles();

  return NextResponse.json({ files });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  fileService.saveFile(file);

  return NextResponse.json({
    message: "success",
    filename: file.name,
  });
}
