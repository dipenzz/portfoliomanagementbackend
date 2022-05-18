const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TotalDataSchema = new Schema({
  totalUnits: {
    type: Number,
    default: 0,
  },
  totalInvestment: {
    type: Number,
    default: 0,
  },
  soldAmount: {
    type: Number,
    default: 0,
  },
  overAllProfit: {
    type: Number,
    default: 0,
  },
  overAllLoss: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("TotalDatas", TotalDataSchema);
