const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.SSLCOMMERZ_STORE_ID
const store_passwd = process.env.SSLCOMMERZ_STORE_PASS
const is_live = false //true for live, false for sandbox

module.exports = {
    SSLCommerzPayment,
    store_id,
    store_passwd,
    is_live
}