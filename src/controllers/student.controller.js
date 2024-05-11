const { addStudentToDB } = require("../services/student.services");

const createStudent = async (req, res) => {
    try {
        const data = req.body;
        // console.log("Student -> ",data);
        const student = await addStudentToDB(data);
        res.status(201).json({ message: "Registration Successful" });
    } catch (error) {
        console.log(err.message);
        return res.status(500).json({message:error.message})
    }
};

module.exports = {
    createStudent,
};
