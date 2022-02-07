const multer = require('multer');
const path = require('path');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const destination = (distanation) => {
    return (req, file, cb) => {
        cb(null, distanation)
    }
}

const filename = (foldername) => {
    return (req, file, cb) => {
        const name = `${req.session.user.username}-${foldername}-${Date.now()}-${file.originalname}`;
        cb(null, name)
    }
}
const fileFilter = (req, file, cb) => {

    checkFileType(file, cb);
}

const avatarStorage = multer.diskStorage({
    destination: destination(path.join(__dirname, '../public/images/avatars')),
    filename: filename('avatar')
});
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter
})
module.exports = uploadAvatar;
