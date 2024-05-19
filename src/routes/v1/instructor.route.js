const express = require("express");
const {
    getAllInstructors,
    createInstructor,
    deleteInstructor,
} = require("../../controllers/instructor.controller");
const router = express.Router();

router.route("/").get(getAllInstructors).post(createInstructor);
router.delete("/:email",deleteInstructor);

module.exports = router;
