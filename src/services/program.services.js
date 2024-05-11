const { PrismaClient } = require("@prisma/client");
const { getOrSetRedisCache } = require("../utils/getOrSetRedisCache");
const prisma = new PrismaClient();

const getProgramsFromDB = async () => {
    try {
        const programs = await getOrSetRedisCache("programs", async () => {
            const data = await prisma.programs.findMany();
            return data;
        });
        return programs;
    } catch (error) {
        throw new Error(error.message);
    }
};
const allProgramsWithInstructorsFromDB = async () => {
    try {
        const programsWithInstructors = await getOrSetRedisCache(
            "programsWithInstructor",
            async () => {
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
            },
        );
        return programsWithInstructors;
    } catch (error) {
        throw new Error(error.message);
    }
};
module.exports = {
    getProgramsFromDB,
    allProgramsWithInstructorsFromDB,
};
