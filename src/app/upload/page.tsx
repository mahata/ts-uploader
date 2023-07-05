export default function UploadForm() {
  return (
    <div>
      <label htmlFor="file-uploader">A file to upload</label>
      <input
        id="file-uploader"
        name="file-uploader"
        type="file"
        aria-label="File uploader"
      />
    </div>
  );
}
