const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getProgramsFromDB = async () => {
    try {
        const data = await prisma.programs.findMany();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
const allProgramsWithInstructorsFromDB = async () => {
    try {
        const data = await prisma.instructorsOnPrograms.findMany({
            select: {
                instructor: {
                    select: {
                        instId: true,
                        firstName: true,
                        lastName: true,
                        workingCompany: true,
                        position: true,
                    },
                },
                program: true,
            },
            orderBy: {
                prgId: "asc",
            },
        });

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getProgramsFromDB,
    allProgramsWithInstructorsFromDB,
};
