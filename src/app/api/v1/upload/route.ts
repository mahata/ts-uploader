import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "yo" });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  return NextResponse.json({
    message: "success",
    filename: file.name,
  });
}
