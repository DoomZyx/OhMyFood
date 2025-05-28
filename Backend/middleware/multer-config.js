// multer-config.js
const multer = require("multer");
const fs = require("fs");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others";

    switch (file.fieldname) {
      case "identityDocumentUrl":
        folder = "images/owner/IDCARD";
        break;
      case "proofOfOwnershipUrl":
        folder = "images/owner/KBIS";
        break;
      case "imageUrl":
        folder = "images/restaurants/";
        break;
    }

    if (file.fieldname === "avatar") {
      folder = "images/profilePicture";
    }
    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const originalName = file.originalname.replace(/\s+/g, "_"); // Dans le nom du fichier, supprime et remplacent les espaces par "_"
    cb(null, originalName);
  },
});

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "L'extension du fichier n'est pas autorisé, Ajoutez une image de type : .jpg, .jepg, .png ou .webp"
      )
    );
  }
};

const upload = multer({ storage });

module.exports = upload;
