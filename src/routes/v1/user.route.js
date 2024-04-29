const express = require("express");
const { getAllUser, createUser } = require("../../controllers/user.controller");
const router = express.Router();

router
    .route("/")
    .get(getAllUser)
    .post(createUser);

module.exports = router;
