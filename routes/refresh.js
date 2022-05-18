const express = require("express");
const router = express.Router();
const { handleRefreshToken } = require("../controller/refreshTokenController");

router.post("/", handleRefreshToken);

module.exports = router;
