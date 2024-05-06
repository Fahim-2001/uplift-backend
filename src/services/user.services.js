const { PrismaClient } = require("@prisma/client");
const { getDateTime } = require("../utils/getDateTime");
const bcrypt = require("bcryptjs");
const { addStudentToDB } = require("./student.services");
const { addEmployerToDB } = require("./employer.services");
const prisma = new PrismaClient();

const addUserToDB = async (data) => {
    if (!data) throw new Error("Data is missing");

    const hashedPass = await bcrypt.hash(data.password, 10);
    const regDateTime = getDateTime();
    
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
        return user;
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
        return user;
    }
};

module.exports = {
    addUserToDB,
};
