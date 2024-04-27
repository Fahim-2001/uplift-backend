const { PrismaClient } = require("@prisma/client");
const { getDateTime } = require("../utils/getDateTime");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const addUserToDb = async (data) => {
    if (!data) return new Error("Data is missing");

    const hashedPass = await bcrypt.hash(data.password, 10);
    const regDateTime = getDateTime();

    // Adding Student
    if (data.institute) {
        return (student = await prisma.users.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPass,
                registeredAt: regDateTime,
                roleId: 5 || null,
            },
        }));
    }
};

module.exports = {
    addUserToDb,
};
