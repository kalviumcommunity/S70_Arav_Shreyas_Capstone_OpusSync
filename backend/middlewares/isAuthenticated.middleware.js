// middleware/isAuthenticated.js
const jwt = require("jsonwebtoken");
const { UnauthorizedException } = require("../utils/appError");

const isAuthenticated = (req, res, next) => {
    // Get JWT from cookie
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
        throw new UnauthorizedException("Unauthorized. Please log in.");
    }

    try {
        // Verify JWT and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach decoded user data to req.user
        req.user = decoded; // { userId, email } from generateToken
        
        // Proceed to next middleware/route handler
        next();
    } catch (error) {
        throw new UnauthorizedException("Invalid or expired token. Please log in again.");
    }
};

module.exports = isAuthenticated;