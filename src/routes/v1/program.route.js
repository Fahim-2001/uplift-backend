const express = require("express");
const { getAllPrograms } = require("../../controllers/program.controller");
const router = express.Router();

router.route("/").get(getAllPrograms);

module.exports = router;
