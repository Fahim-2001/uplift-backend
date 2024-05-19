const { PrismaClient } = require("@prisma/client");
const { getOrSetRedisCache } = require("../utils/getOrSetRedisCache");
const redisClient = require("../db/redis");

const prisma = new PrismaClient();

const allInstructorsFromDB = async () => {
    try {
        const instructor = await getOrSetRedisCache("instructors", async () => {
            const data = await prisma.instructors.findMany();
            return data;
        });
        return instructor;
    } catch (error) {
        throw new Error(error.message);
    }
};

const addInstructorDB = async (instructor) => {
    try {
        if (!instructor || instructor?.workingCompany == null)
            throw new Error("Not a valid instructor");

        const data = await prisma.instructors.create({
            data: {
                firstName: instructor?.firstName,
                lastName: instructor?.lastName,
                email: instructor?.email,
                phone: instructor?.phoneNumber,
                address: instructor?.address,
                workingCompany: instructor?.workingCompany,
                position: instructor?.position,
                salary: Number(instructor?.salary),
                roleId: 3,
            },
        });
        redisClient.flushall();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteInstructorFromDB = async (email) => {
    try {
        console.log(email)
        if (email == null) throw new Error("No user email found");
        const res = await prisma.instructors.delete({
            where: { email: email },
        });
        redisClient.flushall();
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    allInstructorsFromDB,
    addInstructorDB,
    deleteInstructorFromDB
};
