const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  bankName: {
    type: String,
    required: true,
  },
  totalUnits: {
    type: Number,
    required: true,
  },
  buyingRate: {
    type: Number,
    required: true,
  },
  sellingRate: {
    type: Number,
    required: true,
  },
  retailAmount: {
    type: Number,
    required: true,
  },
  soldAmount: {
    type: Number,
    default: 0,
  },
  overallProfit: {
    type: Number,
    default: 0,
  },
  overallLoss: {
    type: Number,
    default: 0,
  },
  currentAmount: {
    type: Number,
  },
});

module.exports = mongoose.model("Stocks", StockSchema);
