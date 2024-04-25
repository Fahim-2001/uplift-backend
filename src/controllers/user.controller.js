const {PrismaClient} = require('@prisma/client');

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
            const { id, name, hometown } = req.body;
            const data = await prisma.users.create({
                data: {
                    id: id,
                    name: name,
                    hometown: hometown,
                },
            });
            res.status(201).json(data);
        } catch (error) {
            console.log(error.message);
            res.json({ message: error.message });
        }
};

module.exports = {
    getAllUser,
    createUser
}