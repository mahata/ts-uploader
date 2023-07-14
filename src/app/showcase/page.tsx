"use client";

import React, { useEffect, useState } from "react";
import { ObjectKeyResponse } from "@/app/api/v1/objects/route";
import Image from "next/image";
import styles from "./page.module.css";

const getObjects = async (): Promise<ObjectKeyResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/objects`,
    {
      next: { revalidate: 300 },
    }
  );

  return response.json();
};

type ImagePreviewProp = {
  objectKey: string;
};

function ImagePreview({ objectKey }: ImagePreviewProp) {
  const [imageUrl, setImageUrl] = useState("/attachment-loading.gif");
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/objects/${objectKey}`,
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

      setImageUrl(url);
    })();
  }, []);

  return (
    <div className={styles.previewImageContainer}>
      <Image src={imageUrl} alt={imageUrl} width={160} height={160} />
    </div>
  );
}

export default function Showcase() {
  const [objectKeys, setObjectKeys] = useState<string[]>([]);
  useEffect(() => {
    getObjects().then((objectKeyResponse) => {
      setObjectKeys(objectKeyResponse.objectKeys);
    });
  }, []);

  return (
    <div>
      <h2>Showcase</h2>
      <div>
        {objectKeys.map((it: string) => (
          <ImagePreview key={it} objectKey={it} />
        ))}
      </div>
    </div>
  );
}
