const {
    getProgramsFromDB,
    allProgramsWithInstructorsFromDB,
} = require("../services/program.services");

const getAllPrograms = async (req, res) => {
    try {
        const programs = await getProgramsFromDB();
        res.status(200).json(programs);
    } catch (error) {
        console.log(error.message);
    }
};

const getAllProgramsWithInstructors = async (req, res) => {
    try {
        const programsWithInstructors =
            await allProgramsWithInstructorsFromDB();
        res.status(200).json(programsWithInstructors);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllPrograms,
    getAllProgramsWithInstructors,
};
