const {
    allInstructorsFromDB,
    addInstructorDB,
    deleteInstructorFromDB,
} = require("../services/instructor.services");
const { addUserToDB } = require("../services/user.services");
const { deleteUser } = require("./user.controller");

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
        res.status(201).json(req.body);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};

const deleteInstructor = async (req, res) => {
    try {
        const email = req.params.email;
        await deleteInstructorFromDB(email);
        await deleteUser(email);
        res.status(200).json({ message: "Deletion Successful" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllInstructors,
    createInstructor,
    deleteInstructor
};
