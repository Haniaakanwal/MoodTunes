const blacklistModel = require('../Models/blacklist.model')
const userModel = require('../Models/user.model')
const jwt = require('jsonwebtoken')
const redis = require("../config/chache")

async function authUser(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not Provided"
        })
    }

    const isTokenBlacklist = await redis.get(token)

    if(isTokenBlacklist){
        return res.status(401).json({
            message:"InValid token"
        })
    }

    try{
        
   const decoded= jwt.verify(
        token,
        process.env.JWT_Secret
    )
    req.user =  decoded

    next()
    }
    catch(err){
        return res.status(401).json({
            message:"token invalid"
        })
    }

}

module.exports = {authUser}