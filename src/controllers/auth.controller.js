const { verifyUser, setUser } = require("../services/auth.services");

const signIn = async(req,res) =>{
    try {
        const user = await verifyUser(req.body);
        const tokenizedUser = setUser(user);
        res.status(200).json({ message: "Login Successful", tokenizedUser});
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    signIn
}