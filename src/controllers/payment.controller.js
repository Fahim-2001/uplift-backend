const { placeOrder } = require("../services/payment.services");

const createPurchase = async (req, res) => {
    try {
        const url = await placeOrder(req.body);
        return res.status(200).json({ redirectUrl: url });
    } catch (error) {
        console.log(error.message);
    }
};

const failedPurchase = async (req,res) =>{
    try {
        const tranId = req.params.tranId;
        return res.redirect(`http://localhost:5174/payment-failed/${tranId}`)
    } catch (error) {
        console.log(error.message)
    }
}

const successPurchase = async (req,res) =>{
    try {
        const tranId = req.params.tranId;
        return res.redirect(`http://localhost:5174/payment-success/${tranId}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    createPurchase,
    failedPurchase,
    successPurchase
};
