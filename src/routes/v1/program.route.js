const express = require("express");
const {
    getAllPrograms,
    getAllProgramsWithInstructors,
    getProgramById,
} = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms);

router.get("/:prgId", getProgramById);

router.get("/programs-with-instructors", getAllProgramsWithInstructors);

module.exports = router;
