const express = require('express');
const { createPurchase, failedPurchase, successPurchase } = require('../../controllers/payment.controller');
const router = express.Router();

router.post("/:prgId",createPurchase);
router.post("/failed/:tranId",failedPurchase)
router.post("/success/:tranId",successPurchase)

module.exports = router;