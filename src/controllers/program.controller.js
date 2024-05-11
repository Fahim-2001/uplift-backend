const {
    programsFromDB,
    allProgramsWithInstructorsFromDB,
    programByIdFromDB,
    programWithInstructorsByIdFromDB,
} = require("../services/program.services");

const getAllPrograms = async (req, res) => {
    try {
        const programs = await programsFromDB();
        res.status(200).json(programs);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getProgramById = async (req, res) => {
    try {
        const prgId = Number(req.params.prgId);
        const program = await programByIdFromDB(prgId);
        res.status(200).json(program);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getAllProgramsWithInstructors = async (req, res) => {
    try {
        const programsWithInstructors =
            await allProgramsWithInstructorsFromDB();
        res.status(200).json(programsWithInstructors);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getProgramWithInstructorsById = async (req, res) => {
    try {
        const prgId = Number(req.params.prgId);
        const program = await programWithInstructorsByIdFromDB(prgId);
        return res.status(200).json(program);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPrograms,
    getProgramById,
    getAllProgramsWithInstructors,
    getProgramWithInstructorsById,
};
