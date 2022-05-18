const express = require("express");
const router = express.Router();

const Stocks = require("../controller/stockController");

const {
  createNewStock,
  getAllStocks,
  updateStock,
  getOneStock,
  deleteStock,
} = Stocks;
const verifyRoles = require("../middlewares/verifyRoles");
const ROLES_LIST = require("../config/roles_list");

router.get("/", getAllStocks);
// router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllStocks);
router.get("/:id", getOneStock);
// router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getOneStock);
// router.post("/", createNewStock);
router.route("/").post(verifyRoles(ROLES_LIST.Admin), createNewStock);
// router.patch(verifyRoles(ROLES_LIST.Admin), "/:id", updateStock);
router.route("/:id").patch(verifyRoles(ROLES_LIST.Admin), updateStock);
router.route("/:id").delete(verifyRoles(ROLES_LIST.Admin), deleteStock);

module.exports = router;
