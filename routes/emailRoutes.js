const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/emailControllers");

//@desc POST form data
//@route POST /api/email/
//@access Public
router.post("/", sendEmail);

module.exports = router;
