import { FileRepository } from "@/app/backend/repository/FileRepository";

export interface FileService {
  saveFile(file: File): void;
  getFiles(): Promise<string[]>;
}

export class FileServiceImpl implements FileService {
  fileRepository: FileRepository;

  constructor(fileRepository: FileRepository) {
    this.fileRepository = fileRepository;
  }

  saveFile(file: File) {
    this.fileRepository.saveFile(file);
  }

  async getFiles() {
    return this.fileRepository.getFiles();
  }
}
