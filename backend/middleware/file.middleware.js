const multer = require("multer");
const path = require("path");

//set storage
const storage = multer.diskStorage({
  destination: "./upload/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limit: { fileSize: 100000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  const fileType = /jpeg||jpg||png||git||webp/;
  const extName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimeType);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error : image Only!!");
  }
}

module.exports = { upload };
