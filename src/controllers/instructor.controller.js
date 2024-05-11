const { allInstructorsFromDB } = require("../services/instructor.services");

const getAllInstructors = async (req, res) => {
    try {
        const instructors = await allInstructorsFromDB();
        res.status(200).json(instructors);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message})
    }
};

module.exports = {
    getAllInstructors,
};
