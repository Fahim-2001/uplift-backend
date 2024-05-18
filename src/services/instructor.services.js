const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allInstructorsFromDB = async () => {
    try {
        const data = await prisma.instructors.findMany();
        return data;
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

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    allInstructorsFromDB,
    addInstructorDB,
};
