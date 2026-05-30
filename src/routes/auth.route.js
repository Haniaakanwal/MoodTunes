const {Router} = require("express")
const AuthController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/register',AuthController.Register)
router.post('/login', AuthController.Login)
router.get('/get-me',authMiddleware.authUser , AuthController.Getme)
router.get('/logout',authMiddleware.authUser , AuthController.logout)
module.exports = router