const express = require("express");
const {
    getAllPrograms,
    getAllProgramsWithInstructors,
    getProgramById,
    getProgramWithInstructorsById,
    createPrograms,
    deleteProgram,
} = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms).post(createPrograms);

router.get("/programs-with-instructors", getAllProgramsWithInstructors);

router.get("/programs-with-instructors/:prgId", getProgramWithInstructorsById);

router.route("/:prgId").get(getProgramById).delete(deleteProgram);

module.exports = router;
