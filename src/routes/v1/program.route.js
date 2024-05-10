const express = require("express");
const { getAllPrograms, getAllProgramsWithInstructors } = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms);

router.get("/programs-with-instructors", getAllProgramsWithInstructors)

module.exports = router;
