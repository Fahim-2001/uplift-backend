const { PrismaClient } = require("@prisma/client");
const { getDateTime } = require("../utils/getDateTime");
const bcrypt = require("bcryptjs");
const { addStudentToDB } = require("./student.services");
const { addEmployerToDB } = require("./employer.services");
const { getOrSetRedisCache } = require("../utils/getOrSetRedisCache");
const redisClient = require("../db/redis");
const prisma = new PrismaClient();

const usersFromDB = async () => {
    try {
        const users = await getOrSetRedisCache("users", async () => {
            const data = await prisma.users.findMany();
            return data;
        });
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const addUserToDB = async (data) => {
    if (!data) throw new Error("Data is missing");

    const regDateTime = getDateTime();

    // Add Instructor
    if (data?.workingCompany) {
        const user = await prisma.users.create({
            data: {
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                password: await bcrypt.hash("1234", 10),
                registeredAt: regDateTime,
                roleId: 3 || null,
            },
        });
        redisClient.flushall();
        return user;
    }

    let hashedPass;
    if (data?.password) {
        hashedPass = await bcrypt.hash(data.password, 10);
    }
    // Adding Employer
    if (data.orgName) {
        const employee = await addEmployerToDB(data);
        const user = await prisma.users.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPass,
                registeredAt: regDateTime,
                roleId: 4 || null,
            },
        });
        redisClient.flushall();
        return user;
    }

    // Adding Student
    if (data.institute) {
        const student = await addStudentToDB(data);
        const user = await prisma.users.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPass,
                registeredAt: regDateTime,
                roleId: 5 || null,
            },
        });
        redisClient.flushall();
        return user;
    }

    console.log(data);
    // Adding Moderator
    if (data?.roleId === 2) {
        const user = await prisma.users.create({
            data: {
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                password: await bcrypt.hash("1234", 10),
                registeredAt: regDateTime,
                roleId: data?.roleId,
            },
        });
        redisClient.flushall();
        return user;
    }
};

const deleteUserFromDB = async (email) => {
    try {
        if (email == null) throw new Error("No user id found");
        const res = await prisma.users.delete({
            where: { email: email },
        });
        redisClient.flushall();
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    addUserToDB,
    usersFromDB,
    deleteUserFromDB,
};
