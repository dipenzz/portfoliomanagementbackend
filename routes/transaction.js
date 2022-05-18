const express = require("express");
const router = express.Router();

const Transaction = require("../controller/transactionController");

const {
  createNewTransaction,
  getAllTransaction,
  getOneTransaction,
} = Transaction;

router.get("/", getAllTransaction);
router.get("/:id", getOneTransaction);
router.post("/", createNewTransaction);

module.exports = router;
