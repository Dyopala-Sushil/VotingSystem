const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

const authController = new AuthController();
router.route('/')
.post(authController.loginUser)

module.exports = router;