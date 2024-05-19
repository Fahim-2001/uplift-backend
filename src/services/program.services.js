const { PrismaClient } = require("@prisma/client");
const { getOrSetRedisCache } = require("../utils/getOrSetRedisCache");
const redisClient = require("../db/redis");
const prisma = new PrismaClient();

const programsFromDB = async () => {
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

const programByIdFromDB = async (prgId) => {
    try {
        const program = await getOrSetRedisCache(
            `program:${prgId}`,
            async () => {
                const data = await prisma.programs.findUnique({
                    where: {
                        prgId: prgId,
                    },
                });
                return data;
            },
        );
        return program;
    } catch (error) {
        throw new Error(error.message);
    }
};

const allProgramsWithInstructorsFromDB = async () => {
    try {
        // const programsWithInstructors = await getOrSetRedisCache(
        //     "programsWithInstructor",
        //     async () => {
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
                        program:true,
                    },
                    orderBy: {
                        prgId: "asc",
                    },
                });
                return data;
        //     },
        // );
        // return programsWithInstructors;
    } catch (error) {
        throw new Error(error.message);
    }
};

const programWithInstructorsByIdFromDB = async (prgId) => {
    try {
        const programsWithInstructors = await getOrSetRedisCache(
            `programsWithInstructor:${prgId}`,
            async () => {
                const data = await prisma.instructorsOnPrograms.findUnique({
                    where: {
                        prgId: prgId,
                    },
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
                });
                return data;
            },
        );
        return programsWithInstructors;
    } catch (error) {
        throw new Error(error.message);
    }
};

const addProgramToDB = async (data) => {
    try {
        if (data === null) throw new Error("No data found for this program");
        const program = await prisma.programs.create({
            data: {
                courseTitle: data?.courseTitle,
                price: Number(data?.price),
                offerPrice: Number(data?.offerPrice),
                totalClasses: Number(data?.totalClasses),
                duration: Number(data?.duration),
                perWeekLiveClasses: Number(data?.perWeekLiveClasses),
                totalEnrolled: 100,
                maxStudentLimit: Number(data?.maxStudentLimit),
                thingsToTeach: data?.thingsToTeach,
                roadmap: "",
            },
        });
        redisClient.flushall();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteProgramFromDB = async (id) => {
    try {
        await prisma.programs.delete({ where: { prgId: id } });
        redisClient.flushall();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    programsFromDB,
    programByIdFromDB,
    allProgramsWithInstructorsFromDB,
    programWithInstructorsByIdFromDB,
    addProgramToDB,
    deleteProgramFromDB,
};
