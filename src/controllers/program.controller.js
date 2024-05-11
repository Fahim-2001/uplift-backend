const {
    getProgramsFromDB,
    allProgramsWithInstructorsFromDB,
} = require("../services/program.services");

const getAllPrograms = async (req, res) => {
    try {
        const programs = await getProgramsFromDB();
        res.status(200).json(programs);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({message:error.message})
    }
};

const getProgramsById = async (req,res)=>{
    try {
        const prgId = req.params;
        res.status(200).json(req.params)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
}

const getAllProgramsWithInstructors = async (req, res) => {
    try {
        const programsWithInstructors =
            await allProgramsWithInstructorsFromDB();
        res.status(200).json(programsWithInstructors);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
};

module.exports = {
    getAllPrograms,
    getProgramsById,
    getAllProgramsWithInstructors,
};
