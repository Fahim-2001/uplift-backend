const {
    allInstructorsFromDB,
    addInstructorDB,
} = require("../services/instructor.services");
const { addUserToDB } = require("../services/user.services");

const getAllInstructors = async (req, res) => {
    try {
        const instructors = await allInstructorsFromDB();
        res.status(200).json(instructors);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const createInstructor = async (req, res) => {
    try {
        const instructor = await addInstructorDB(req.body);
        const user = await addUserToDB(req.body);
        console.log(user);
        res.status(201).json(req.body);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllInstructors,
    createInstructor,
};
