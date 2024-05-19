const {
    programsFromDB,
    allProgramsWithInstructorsFromDB,
    programByIdFromDB,
    programWithInstructorsByIdFromDB,
    addProgramToDB,
    deleteProgramFromDB,
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

const createPrograms = async (req, res) => {
    try {
        const program = await addProgramToDB(req.body);
        res.status(201).json({ message: "Created Successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const deleteProgram = async (req, res) => {
    try {
        console.log(Number(req.params.prgId));
        await deleteProgramFromDB(Number(req.params.prgId));
        res.status(200).json({ message: "Created Successfull" });
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
    createPrograms,
    deleteProgram,
};
