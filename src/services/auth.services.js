const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

const setUser = (user) => {
    return jwt.sign(
        {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleId: user.roleId,
        },
        SECRET,
        {
            expiresIn: "24h",
        },
    );
};

const verifyJWT = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    setUser,
    verifyJWT,
};
