const express = require("express");
const {
    getAllInstructors,
    createInstructor,
} = require("../../controllers/instructor.controller");
const router = express.Router();

router.route("/").get(getAllInstructors).post(createInstructor);

module.exports = router;
