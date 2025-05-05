import { useState, useEffect } from "react";

export function useImageUploader(setFormDataOwner) {
  const [imagePreviews, setImagePreviews] = useState({});

  const handleSingleFileChange = (e) => {
    const id = e.target.id;
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = {
      file,
      url: URL.createObjectURL(file),
    };

    setImagePreviews((prev) => ({
      ...prev,
      [id]: preview,
    }));

    setFormDataOwner((prev) => ({
      ...prev,
      [id]: file,
    }));

    e.target.value = ""; // pour pouvoir réuploader le même fichier si besoin
  };

  const handleMultiFileChange = (e) => {
    const id = e.target.id;
    const files = Array.from(e.target.files);
    if (!id || files.length === 0) return;

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImagePreviews((prev) => {
      const existing = prev[id];

      const existingArray = Array.isArray(existing)
        ? existing
        : existing
        ? [existing] // si c'était un objet unique, transforme-le en tableau
        : [];

      const newValue = [...existingArray, ...newPreviews];

      console.log("Ajout à imagePreviews", id, newValue);

      return {
        ...prev,
        [id]: newValue,
      };
    });

    if (typeof setFormDataOwner === "function") {
      setFormDataOwner((prev) => {
        const existing = prev[id];

        const existingArray = Array.isArray(existing)
          ? existing
          : existing
          ? [existing]
          : [];

        return {
          ...prev,
          [id]: [...existingArray, ...files],
        };
      });
    }

    e.target.value = "";
  };

  useEffect(() => {
    return () => {
      Object.values(imagePreviews).forEach((val) => {
        if (Array.isArray(val)) {
          val.forEach((preview) => URL.revokeObjectURL(preview.url));
        } else if (val?.url) {
          URL.revokeObjectURL(val.url);
        }
      });
    };
  }, []);

  return {
    imagePreviews,
    handleMultiFileChange,
    handleSingleFileChange,
  };
}
