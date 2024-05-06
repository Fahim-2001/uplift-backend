const { PrismaClient } = require("@prisma/client");
const { addUserToDB } = require("../services/user.services");
const { setUser } = require("../services/auth.services");

const prisma = new PrismaClient();
const getAllUser = async (req, res) => {
    try {
        const data = await prisma.users.findMany();
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await addUserToDB(data);
        const tokenizedUser = setUser(user);
        res.status(201).json({ message: "Registration Successful", tokenizedUser});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUser,
    createUser,
};
