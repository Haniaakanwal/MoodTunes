const userModel = require('../Models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blacklistModel = require('../Models/blacklist.model')
const redis = require("../config/chache")

async function Register(req, res) {
    const { username, email, password } = req.body

    const UserExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (UserExist) {
        return res.status(400).json({
            message: "User with the same email or username already exists"

        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_Secret,
        {
            expiresIn: "3d"
        })
    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function Login(req, res) {
    const { username, email, password } = req.body

    const User = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password")

    if (!User) {
        return res.status(400).json({
            message: "InValid Credentials"

        })
    }
    const isValidPassword = await bcrypt.compare(password, User.password)
    if (!isValidPassword)
        return res.status(400).json({
            message: "Invalid credentials"

        })
    const token = jwt.sign({
        id: User._id,
        username: User.username
    }, process.env.JWT_Secret,
        {
            expiresIn: "3d"
        })
    res.cookie("token", token)

    return res.status(200).json({
        message: "User Logged in successfully",
        user: {
            id: User._id,
            username: User.username,
            email: User.email
        }
    })

}

async function Getme(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetch successfully",
        user
    })
}

async function logout(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString())

    await blacklistModel.create({
        token
    })

    res.status(200).json({
        message: "Logout successfully"
    })
}

module.exports = {
    Register,
    Login,
    Getme,  
    logout
}