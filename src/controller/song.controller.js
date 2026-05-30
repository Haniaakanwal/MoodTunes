const songModel = require('../Models/song.model')
const id3 = require('node-id3')
const StorageSevice = require('../services/storage.services')

async function uploadSong(req, res) {
    try {
        const buffer = req.file.buffer
        const tags = id3.read(buffer)
        const { mood } = req.body

        // ── Upload song file ──
        const songFile = await StorageSevice.uploadFile({
            buffer: buffer,
            filename: (tags.title || req.file.originalname) + '.mp3',
            folder: "/moodify/songs"
        })

  const DEFAULT_POSTER = "https://ik.imagekit.io/wu2jdpjuf/moodify/poster/It_s%20Eight28%20-%20All%20Sonics%20Working%20Together%20%E2%9A%99%EF%B8%8F___beatmaker%20_producerlife%20_hiphopproducer%20_musicproducer.webp"

let posterUrl = DEFAULT_POSTER   // ← use default instead of null
if (tags.image?.imageBuffer) {
    const posterfile = await StorageSevice.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: (tags.title || 'poster') + '.jpeg',
        folder: '/moodify/poster'
    })
    posterUrl = posterfile.url   // ← override with actual poster if exists
}

        const song = await songModel.create({
            title: tags.title || req.file.originalname.replace(/\.[^/.]+$/, ''), // fallback to filename
            url: songFile.url,
            posterUrl: posterUrl,  // will be null if no embedded image
            mood
        })

        res.status(201).json({
            message: "song created successfully",
            song
        })

    } catch (err) {
        console.error('uploadSong error:', err)
        res.status(500).json({ message: err.message })
    }
}

async function getSong(req, res) {
    const { mood } = req.query
    const songs = await songModel.find({ mood })
    res.status(200).json({
        message: "songs fetched successfully",
        songs
    })
}

module.exports = { uploadSong, getSong }