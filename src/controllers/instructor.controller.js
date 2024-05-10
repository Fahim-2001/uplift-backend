const { allInstructorsFromDB } = require("../services/instructor.services");

const getAllInstructors = async (req, res) => {
    try {
        const instructors = await allInstructorsFromDB();
        res.status(200).json(instructors);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    getAllInstructors,
};
