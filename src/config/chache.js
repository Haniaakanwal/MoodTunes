const Redis = require("ioredis").default
require("dotenv").config()


const redis = new Redis({
    host:process.env.Redis_HOST,
    port:process.env.Redis_PORT,
    password:process.env.Redis_PASS
})

redis.on("connect",()=>{
    console.log("Server Connected to Redis");
    
})

redis.on("error",(err)=>{
    console.log(err);
})

module.exports = redis