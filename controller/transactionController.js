const Transaction = require("../model/Transaction");
const Stock = require("../model/Stock");

const createNewTransaction = async (req, res) => {
  const { stockName, transactionType, quantity, amount } = await req.body;

  try {
    await Transaction.create({
      stockName,
      transactionType,
      quantity,
      amount,
    });

    //Updating quantity
    const _id = await stockName;
    const data = await Stock.findById({ _id });
    data["totalUnits"] = (await data["totalUnits"]) - quantity;

    //Updating soldAmount
    const sold = amount * quantity;
    data["soldAmount"] = (await data["soldAmount"]) + sold;

    //overallProfit/Loss
    const sellingRate = await data["sellingRate"];
    const retailAmount = await data["retailAmount"];
    const buyingRate = await data["buyingRate"];

    //Profit buy/sell
    const pureSellProfit =
      (await (buyingRate * quantity)) - retailAmount * quantity;
    const pureBuyProfit =
      (await (retailAmount * quantity)) - sellingRate * quantity;
    // Loss buy/sell
    const pureBuyLoss =
      (await (retailAmount * quantity)) - buyingRate * quantity;
    const pureSellLoss =
      (await (sellingRate * quantity)) - retailAmount * quantity;

    if (buyingRate > retailAmount) {
      data["overallProfit"] = (await data["overallProfit"]) + pureSellProfit;
    } else if (sellingRate < retailAmount) {
      data["overallProfit"] = (await data["overallProfit"]) + pureBuyProfit;
    } else if (retailAmount < sellingRate) {
      data["overallLoss"] = (await data["overallLoss"]) + pureBuyLoss;
    } else if (retailAmount > buyingRate) {
      data["overallLoss"] = (await data["overallLoss"]) + pureSellLoss;
    }

    //Reducing current Amount
    const reducedAmount = (await quantity) * retailAmount;
    data["currentAmount"] = (await data["currentAmount"]) - reducedAmount;

    await data.save();

    res.status(200).json("Transaction Created");
  } catch (err) {
    console.log(err);
  }
};

const getAllTransaction = async (req, res) => {
  const getAll = await Transaction.find().populate({
    path: "stockName",
    select: "bankName",
  });

  res.json(getAll);
};

const getOneTransaction = async (req, res) => {
  try {
    const getSingle = await Transaction.findById({
      _id: req.params.id,
    }).populate("stockName");
    if (!getSingle)
      return res
        .status(404)
        .json(`The Employee ID ${req.params.id} does not exists !`);

    res.send(getSingle);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createNewTransaction, getAllTransaction, getOneTransaction };
