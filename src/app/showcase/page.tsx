import { ObjectKeyResponse } from "@/app/api/v1/objects/route";
import styles from "./page.module.css";

const getObjects = async (): Promise<ObjectKeyResponse> => {
  const response = await fetch(`${process.env.BASE_URL}/api/v1/objects`, {
    next: { revalidate: 300 }, // TODO: Make 300 configurable
  });

  return response.json();
};

type ImagePreviewProp = {
  objectKey: string;
};

async function ImagePreview({ objectKey }: ImagePreviewProp) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/v1/objects/${objectKey}`,
    {
      next: { revalidate: 300 },
    }
  );
  const jsonResponse = await response.json();

  const ext = objectKey.split(".").at(-1)!;
  const url = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "png",
    "svg",
    "webp",
  ].includes(ext)
    ? jsonResponse.url
    : "/attachment-icon.png";

  return (
    <div className={styles.previewImageContainer}>
      <img className={styles.previewImage} alt={url} src={url} />
    </div>
  );
}

export default async function Showcase() {
  const objects = await getObjects();

  return (
    <div>
      <h2>Showcase</h2>
      <div>
        {objects.objectKeys.map((it: string) => (
          <ImagePreview key={it} objectKey={it} />
        ))}
      </div>
    </div>
  );
}
