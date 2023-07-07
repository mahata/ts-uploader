import { writeFile } from "fs/promises";

export interface FileRepository {
  saveFile(file: File): Promise<void>;
}

export class LocalFileRepository implements FileRepository {
  async saveFile(file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(`/tmp/${file.name}`, buffer);
  }
}
