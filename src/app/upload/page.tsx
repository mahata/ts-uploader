"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function UploadForm() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadFile(e.target.files === null ? null : e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (uploadFile === null) return;

    const formData = new FormData();
    formData.append("file", uploadFile);

    const res = await fetch("http://localhost:3000/api/v1/objects", {
      method: "POST",
      body: formData,
    });
    const message = await res.json();

    setUploadedFileName(message.filename);
  };

  return (
    <div className={styles.fileUploadFormContainer}>
      <h2>File Upload Form</h2>
      <div>
        {uploadedFileName && <div>Uploaded: {uploadedFileName}</div>}
        <form className={styles.fileUploadForm} onSubmit={handleSubmit}>
          <label htmlFor="file-uploader">A file to upload</label>
          <input
            id="file-uploader"
            name="file-uploader"
            type="file"
            aria-label="File uploader"
            multiple
            onChange={handleChange}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
