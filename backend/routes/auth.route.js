const express = require("express");
const passport = require("passport");
const { config } = require("../config/app.config");
const {googleLoginCallback} = require("../controllers/auth.controller");

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = express.Router();

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
    }),
    googleLoginCallback
  );
  
  module.exports = authRoutes;
  