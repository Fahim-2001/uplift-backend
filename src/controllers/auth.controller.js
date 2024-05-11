const { verifyUser, setUser } = require("../services/auth.services");

const signIn = async(req,res) =>{
    try {
        const user = await verifyUser(req.body);
        const tokenizedUser = setUser(user);
        res.status(200).json({ message: "Login Successful", tokenizedUser});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    signIn
}