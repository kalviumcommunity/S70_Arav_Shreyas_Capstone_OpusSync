const { Router } = require("express");
const { getCurrentUserController } = require("../controllers/user.controller");

const userRoutes = Router();

// GET api/user/current
userRoutes.get("/current", getCurrentUserController);

module.exports = userRoutes;