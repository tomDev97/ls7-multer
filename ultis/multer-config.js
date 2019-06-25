const multer = require('multer');
const path = require('path');
const PATH_UPLOAD_IMAGE = path.resolve(__dirname, '../public/upload');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, PATH_UPLOAD_IMAGE);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage });
module.exports = upload;
//npm uuid = random uid