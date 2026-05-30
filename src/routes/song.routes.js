const express = require('express')
const upload = require('../middleware/upload.middleware')
const router = express.Router()
const songController = require('../controller/song.controller')

router.post('/',upload.single("song"),songController.uploadSong)
router.get('/',songController.getSong)

module.exports = router