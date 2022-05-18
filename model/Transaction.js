const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionType = Object.freeze({
  BUY: "BUY",
  SELL: "SELL",
});

const TransactionSchema = new Schema({
  stockName: {
    type: Schema.Types.ObjectId,
    ref: "Stocks",
  },
  transactionType: {
    type: String,
    BUY: TransactionType.BUY,
    SELL: TransactionType.SELL,
  },
  quantity: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
