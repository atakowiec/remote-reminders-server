const express = require('express');
const router = express.Router();
const profilesController = require("../../controllers/profilesController")
const verifyJWT = require("../../middleware/verifyJWT")


router.route("/")
    .get(verifyJWT, profilesController.getProfiles)
    .put(verifyJWT, profilesController.createProfile)
    .delete(verifyJWT, profilesController.removeProfile)

module.exports = router