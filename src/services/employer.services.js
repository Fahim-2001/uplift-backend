const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addEmployerToDB = async (data) => {
    try {
        if (!data) throw new Error("Data is missing");

        const employer = await prisma.employers.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phoneNumber,
                organisation: data.orgName,
                address: data.address,
                roleId: 4,
            },
        });

        return employer;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    addEmployerToDB,
};
