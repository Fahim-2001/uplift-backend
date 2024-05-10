const {  PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getProgramsFromDB = async()=>{
    try {
        const data = await prisma.programs.findMany();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getProgramsFromDB
}