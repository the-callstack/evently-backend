'use strict'
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, multer } = require(".");

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Evently',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

const upload = multer({ storage })

module.exports = {
    storage,
    cloudinary,
    upload
}

