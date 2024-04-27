const express = require('express');
const { createStudent } = require('../../controllers/student.controller');
const router = express.Router();

router.route("/").post(createStudent);

module.exports = router;