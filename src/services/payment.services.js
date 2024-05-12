const { PrismaClient } = require("@prisma/client");
const { store_id, store_passwd, is_live, SSLCommerzPayment } = require("../utils/initSslCommerz");

const prisma = new PrismaClient();

const placeOrder = async (data) => {
    try {
        const tran_id = Math.random().toString(36).substring(2, 15);
        const order = {
            total_amount: data?.price,
            currency: "BDT",
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `http://localhost:8000/api/v1/payment/success/${tran_id}`,
            fail_url: `http://localhost:8000/api/v1/payment/failed/${tran_id}`,
            cancel_url: "http://localhost:3030/cancel",
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "Courier",
            product_name: data?.prgName,
            product_category: "Education",
            product_profile: "general",
            cus_name: data?.studentName,
            cus_email: data?.studentEmail || "noemail@gmail.com",
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: "0123456789",
            cus_fax: "123456",
            ship_name: "Titanic",
            ship_add1: "Dhaka",
            ship_add2: "Dhaka",
            ship_city: "Dhaka",
            ship_state: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        let GatewayPageURL;
        await sslcz.init(order).then((apiResponse) => {
            // Redirect the user to payment gateway
            GatewayPageURL = apiResponse.GatewayPageURL;
        });
        return GatewayPageURL;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    placeOrder,
};
