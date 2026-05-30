const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20   // 20MB — was 5MB
    },
    fileFilter: (req, file, cb) => {
        // accept mp3, m4a, wav, ogg
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true)
        } else {
            cb(new Error('Only audio files are allowed'), false)
        }
    }
})

module.exports = upload