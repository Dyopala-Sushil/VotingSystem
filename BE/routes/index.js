var express = require('express');
var router = express.Router();
const userRoute = require("../routes/users")
const authRoute = require("./auth");

router.use('/users', userRoute);
router.use('/login',authRoute);

module.exports = router;
