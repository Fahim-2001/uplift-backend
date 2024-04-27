const { PrismaClient } = require("@prisma/client");
const { addUserToDb } = require("../services/user.services");

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
        const user =await addUserToDb(data);
        res.status(201).json({message:"Registration Successful"});
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
};

module.exports = {
    getAllUser,
    createUser,
};
