import { useState, useEffect } from "react";

export function useImageUploader(setFormDataOwner) {
  const [imageIDPreviews, setImageIDPreviews] = useState([]);
  const [imageUrlPreviews, setImageUrlPreviews] = useState([]);
  const [imageOwnershipPreviews, setImageOwnershipPreviews] = useState([]);

  const handleMultiFileChange = (e) => {
    const id = e.target.id;
    const files = Array.from(e.target.files);
    if (!id || files.length === 0) return;

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    if (id === "identityDocumentUrl") {
      setImageIDPreviews((prev) => [...prev, ...newPreviews]);
    } else if (id === "imageUrl") {
      setImageUrlPreviews((prev) => [...prev, ...newPreviews]);
    } else if (id === "proofOfOwnershipUrl") {
      setImageOwnershipPreviews((prev) => [...prev, ...newPreviews]);
    }

    if (typeof setFormDataOwner === "function") {
      setFormDataOwner((prev) => {
        const existing = Array.isArray(prev[id])
          ? prev[id]
          : prev[id]
          ? [prev[id]]
          : [];
        return {
          ...prev,
          [id]: [...existing, ...files],
        };
      });
    }

    e.target.value = "";
  };

  // Nettoyage des blobs
  useEffect(() => {
    return () => {
      [
        ...imageIDPreviews,
        ...imageUrlPreviews,
        ...imageOwnershipPreviews,
      ].forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, []);

  return {
    imageIDPreviews,
    setImageIDPreviews,
    imageUrlPreviews,
    setImageUrlPreviews,
    imageOwnershipPreviews,
    setImageOwnershipPreviews,
    handleMultiFileChange,
  };
}
