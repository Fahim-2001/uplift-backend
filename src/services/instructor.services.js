const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allInstructorsFromDB = async()=>{
    try {
        const data = await prisma.instructors.findMany();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    allInstructorsFromDB
}