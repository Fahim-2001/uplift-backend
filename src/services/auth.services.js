const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const SECRET = process.env.JWT_SECRET;

const prisma = new PrismaClient();

const setUser = (user) => {
    const token = jwt.sign(
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

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registeredAt: user.registeredAt,
        roleId: user.roleId,
        token,
    };
};

const verifyJWT = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null;
    }
};

const verifyUser = async (user) => {
    try {
        if (!user) throw Error("No user found");
        const [registeredUser] = await prisma.users.findMany({
            where: {
                email: user.email,
            },
        });

        if (!registeredUser) throw Error("No user exists with this credentials");

        if(registeredUser.password === user.password){
            return registeredUser;
        }

        const checkPassword = await bcrypt.compare(
            user.password,
            registeredUser.password,
        );
        if (!checkPassword) throw Error("Password didn't match");

        return registeredUser;
    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = {
    setUser,
    verifyJWT,
    verifyUser,
};
