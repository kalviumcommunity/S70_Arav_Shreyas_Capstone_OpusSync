
const jwt = require("jsonwebtoken");
const { UnauthorizedException } = require("../utils/appError");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next(UnauthorizedException("Unauthorized. Please log in."));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        const user = await User.findById(req.user.userId);
        if (!user) {
            console.log("User not found with ID:", req.user.userId);
            return next(UnauthorizedException("User not found"));
        }
        next();
    } catch (error) {
        console.log("JWT Error:", error.message); 
        return next(UnauthorizedException("Invalid or expired token. Please log in again."));
    }
};

module.exports = isAuthenticated;