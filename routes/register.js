const express = require("express");
const ROLES_LIST = require("../config/roles_list");
const router = express.Router();
const handleNewUser = require("../controller/register");
const verifyRoles = require("../middlewares/verifyRoles");

// router.post("/", handleNewUser);
router.get("/").post(verifyRoles(ROLES_LIST.Admin), handleNewUser);

module.exports = router;
