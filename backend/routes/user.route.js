const { Router } = require("express");
<<<<<<< HEAD
const { getCurrentUserController,updateCurrentWorkspaceController,updateUserProfileController,deleteUserProfilePictureController } = require("../controllers/user.controller");
=======
const { getCurrentUserController,updateCurrentWorkspaceController} = require("../controllers/user.controller");

>>>>>>> main
const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.put("/current-workspace", updateCurrentWorkspaceController);
<<<<<<< HEAD
userRoutes.put(
    "/profile",   
    updateUserProfileController
);
userRoutes.delete('/profile/picture',deleteUserProfilePictureController)
=======

>>>>>>> main
module.exports = userRoutes;