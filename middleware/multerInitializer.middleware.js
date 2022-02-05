const multer = require('multer');
const path = require('path');

const destination = (distanation) => {
    return (req, file, cb) => {
        cb(null, distanation)
    }
}

const filename = (foldername) => {
    return (req, file, cb) => {
        const name = `${req.session.blogger.username}-${foldername}-${Date.now()}-${file.originalname}`;
        cb(null, name)
    }
}
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === ("pdf" || "jpg" || "JPG" || "jpeg" || "JPEG" || "png" || "PNG" || "gif" || "GIF")) {
        cb(null, true);
    } else {
        cb(new Error('Invalid type'), false);
    }
}

const avatarStorage = multer.diskStorage({
    destination: destination(path.join(__dirname, 'public', 'images', 'avatars')),
    filename: filename('avatar')
});
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter
})
module.exports = uploadAvatar;
