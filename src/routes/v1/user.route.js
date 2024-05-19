const express = require("express");
const {
    getAllUser,
    createUser,
    deleteUser,
} = require("../../controllers/user.controller");
const router = express.Router();

router.route("/").get(getAllUser).post(createUser);
router.delete("/:email", deleteUser);
module.exports = router;
