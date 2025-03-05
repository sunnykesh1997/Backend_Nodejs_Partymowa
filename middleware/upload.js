// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Ensure this folder exists (create if necessary)
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using the timestamp
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

module.exports = upload;
