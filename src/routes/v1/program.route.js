const express = require("express");
const {
    getAllPrograms,
    getAllProgramsWithInstructors,
    getProgramById,
    getProgramWithInstructorsById,
} = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms);

router.get("/programs-with-instructors", getAllProgramsWithInstructors);

router.get("/programs-with-instructors/:prgId", getProgramWithInstructorsById);

router.get("/:prgId", getProgramById);

module.exports = router;
