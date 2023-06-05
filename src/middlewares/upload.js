const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname.split(".")[1]}`);
  },
});

const fileFilter = function (req, file, cb) {
  // Accept files with the specified extensions
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "text/csv" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    // Reject files with other extensions
    cb(new Error("Only PDF, CSV, and DOC files are allowed!"));
  }
};

const uploadFile = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB limit
  },
});

module.exports = uploadFile;
