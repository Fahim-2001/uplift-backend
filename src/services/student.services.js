const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addStudentToDB = async (data) => {
    if (!data) throw new Error("Data is missing");

    const student = await prisma.students.create({
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phoneNumber,
            institute: data.institute,
            roleId: 5,
        },
    });

    return student;
};

module.exports = {
    addStudentToDB
}
