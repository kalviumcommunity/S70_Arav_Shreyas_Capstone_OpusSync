const  asyncHandler  = require("../middlewares/asyncHandler.middleware");
const { config } = require("../config/app.config");
const { registerSchema } = require("../validation/auth.validation");
const { HTTPSTATUS } = require("../config/http.config");
const { registerUserService } = require("../services/auth.service");
const passport = require("passport");

/**
 * Google OAuth Callback Controller
 */
const googleLoginCallback = asyncHandler(async (req, res) => {
  const currentWorkspace = req.user?.currentWorkspace;

  if (!currentWorkspace) {
    return res.redirect(`${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
  }

  return res.redirect(`${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
});

/**
 * User Registration Controller
 */
const registerUserController = asyncHandler(async (req, res) => {
  const body = registerSchema.parse({
    ...req.body,
  });

  await registerUserService(body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});

/**
 * User Login Controller
 */
const loginController = asyncHandler(async (req, res, next) => {
  passport.authenticate(
    "local",
    (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(HTTPSTATUS.UNAUTHORIZED).json({
          message: info?.message || "Invalid email or password",
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }

        return res.status(HTTPSTATUS.OK).json({
          message: "Logged in successfully",
          user,
        });
      });
    }
  )(req, res, next);
});

/**
 * User Logout Controller
 */
const logOutController = asyncHandler(async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res
        .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to log out" });
    }
  });

  req.session = null;
  return res.status(HTTPSTATUS.OK).json({ message: "Logged out successfully" });
});

module.exports = {
  googleLoginCallback,
  registerUserController,
  loginController,
  logOutController,
};
