const express = require("express");
const { getAllPrograms, getAllProgramsWithInstructors, getProgramsById } = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms);

// router.route("/:prgId").get(getProgramsById);

router.get("/programs-with-instructors", getAllProgramsWithInstructors)

module.exports = router;
