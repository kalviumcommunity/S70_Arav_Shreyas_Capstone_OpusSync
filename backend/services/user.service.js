
const UserModel = require("../models/user.model");

const getCurrentUserService = async (userId) => {
    const user = await UserModel.findById(userId)
        .populate("currentWorkspace")
        .select("-password");
    return { user }; 
};

module.exports = { getCurrentUserService };