const express = require('express');
const router = express.Router();
const remindersController = require("../../controllers/remindersController")
const verifyJWT = require("../../middleware/verifyJWT")


router.route("/")
    .get(verifyJWT, remindersController.getReminders)
    .put(verifyJWT, remindersController.createReminder)
    .delete(verifyJWT, remindersController.removeReminder)

module.exports = router