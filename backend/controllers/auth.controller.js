const  asyncHandler  = require("../middlewares/asyncHandler.middleware");
const { config } = require("../config/app.config");
const { HTTPSTATUS } = require("../config/http.config");
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
module.exports = {
    googleLoginCallback,
  };