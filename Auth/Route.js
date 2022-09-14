const express = require("express")
const router = express.Router()
const { register, login, update, deleteUser } = require("./auth")
const { adminJWTAuth } = require("../middleware/jwtAuth.js");

// route can be used to chain paths
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/update",adminJWTAuth).put(update)
router.route("/deleteUser",adminJWTAuth).delete(deleteUser)
module.exports = router