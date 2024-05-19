const { PrismaClient } = require("@prisma/client");
const {
    addUserToDB,
    usersFromDB,
    deleteUserFromDB,
} = require("../services/user.services");
const { setUser } = require("../services/auth.services");

const prisma = new PrismaClient();
const getAllUser = async (req, res) => {
    try {
        const data = await usersFromDB();
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await addUserToDB(data);
        const tokenizedUser = setUser(user);
        res.status(201).json({
            message: "Registration Successful",
            tokenizedUser,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const email = req.params.email;
        await deleteUserFromDB(email);
        res.status(200).json({ message: "Deletion Successful" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUser,
    createUser,
    deleteUser,
};
