import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where uploaded files will be stored
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        // Define the filename of the uploaded file
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage
});

export default upload