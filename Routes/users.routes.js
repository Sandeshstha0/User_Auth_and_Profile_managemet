const express = require("express");
const register = require("../modules/users/register");
const login = require("../modules/users/login");
const forgotPassword = require("../modules/users/frogetPassword");
const resetPassword = require("../modules/users/resetPassword");
const auth = require("../middleware/auth");
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.post("/forgotpw", forgotPassword);
userRoutes.post("/resetpw", resetPassword);

userRoutes.use(auth);

module.exports = userRoutes;
