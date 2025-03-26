const express = require("express");
const passport = require("passport");
const { config } = require("../config/app.config");
const {
  googleLoginCallback,
  loginController,
  logOutController,
  registerUserController,
} = require("../controllers/auth.controller");

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = express.Router();

// POST api/auth/register
authRoutes.post("/register", registerUserController);
// POST api/auth/login
authRoutes.post("/login", loginController);
// POST api/auth/logout
authRoutes.post("/logout", logOutController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: failedUrl,
    session:false,
  }),
  googleLoginCallback
);

module.exports = authRoutes;
