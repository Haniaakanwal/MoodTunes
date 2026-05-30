const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require("path") 

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const authRoutes = require("./routes/auth.route")
const songRoutes = require('./routes/song.routes')

app.use('/api/auth', authRoutes)
app.use('/api/songs',songRoutes)

app.use(express.static(path.join(__dirname, "../dist")))  // ← ADD THIS


app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
})

// CORRECT — use process.cwd() which works on both local and Vercel:
app.use(express.static(path.join(process.cwd(), "dist")))

app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist", "index.html"))
})

module.exports = app