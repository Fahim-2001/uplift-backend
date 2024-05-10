const express = require("express");
const { getAllInstructors } = require("../../controllers/instructor.controller");
const router = express.Router();

router.route("/").get(getAllInstructors);

module.exports = router;