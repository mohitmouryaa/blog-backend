import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as a Buffer
});

export default upload;