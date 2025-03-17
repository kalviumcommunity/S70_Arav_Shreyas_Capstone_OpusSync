const  asyncHandler  = require("../middlewares/asyncHandler.middleware");
const { config } = require("../config/app.config");
const { registerSchema } = require("../validation/auth.validation");
const { HTTPSTATUS } = require("../config/http.config");
const { registerUserService } = require("../services/auth.service");
const jwt = require('jsonwebtoken')
const passport = require("passport");
const UserModel = require("../models/user.model");
const generateToken = (user) =>{
  return jwt.sign(
    {userId:user._id,email:user.email},
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
  )
} 

/**
 * Google OAuth Callback Controller
 */
const googleLoginCallback = asyncHandler(async (req, res) => {
  if (!req.user) {
      return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: "Google authentication failed" });
  }
  const currentWorkspace = req.user.currentWorkspace;
  if (!currentWorkspace) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: "No workspace assigned" });
  }
  const token = generateToken(req.user);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000
});

  return res.status(HTTPSTATUS.OK).json({
      message: "Google login successful",
      token,
      user: req.user.omitPassword(),
      workspaceId: currentWorkspace
  });
});

/**
 * User Registration Controller
 */
const registerUserController = asyncHandler(async (req, res) => {
  const body = registerSchema.parse({ ...req.body });
  const { userId, workspaceId } = await registerUserService(body);
  const user = await UserModel.findById(userId); // Fetch user after registration
  const token = generateToken(user);
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000
});

  return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
      token,
      user: user.omitPassword(),
      workspaceId
  });
}); 

/**
 * User Login Controller
 */
const loginController = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(HTTPSTATUS.UNAUTHORIZED).json({ message: info?.message || "Invalid email or password" });
      const token = generateToken(user);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000
    });

      return res.status(HTTPSTATUS.OK).json({
          message: "Logged in successfully",
          token,
          user: user.omitPassword()
      });
  })(req, res, next);
});

/**
 * User Logout Controller
 */
const logOutController = asyncHandler(async (req, res) => {

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict"
});
  return res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully - discard token on client" });
});

module.exports = {
  googleLoginCallback,
  registerUserController,
  loginController,
  logOutController,
};
