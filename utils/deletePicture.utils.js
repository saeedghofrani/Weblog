const fs = require('fs');
const { join } = require('path');
const deletePicture = (address, picture) => {
    fs.unlinkSync(join(__dirname, address, picture));
};
module.exports = deletePicture;