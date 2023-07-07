import { NextResponse } from "next/server";
import {
  FileService,
  FileServiceImpl,
} from "@/app/backend/service/FileService";
import { LocalFileRepository } from "@/app/backend/repository/FileRepository";

export async function GET() {
  return NextResponse.json({ message: "yo" });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const fileService: FileService = new FileServiceImpl(
    new LocalFileRepository()
  );
  fileService.saveFile(file);

  return NextResponse.json({
    message: "success",
    filename: file.name,
  });
}
