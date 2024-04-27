const createStudent = async(req, res) =>{
    try {
        const data = req.body;
        console.log("Student -> ",data);
        res.status(201).json({message:"Registration Successful"});
    } catch (error) {
        console.log(err.message);
    }
}

module.exports = {
    createStudent
}