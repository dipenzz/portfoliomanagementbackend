const Stock = require("../model/Stock");

const getAllStocks = async (req, res) => {
  const getAll = await Stock.find();

  res.status(200).json(getAll);
};

const getOneStock = async (req, res) => {
  try {
    const _id = await req.params.id;
    const findOne = await Stock.findById({ _id });
    if (!findOne)
      return res.status(400).json({ error: `ID ${_id} does not exists !` });
    await res.json(findOne);
  } catch (err) {
    console.log(err);
  }
};

const createNewStock = async (req, res) => {
  //   const data = await req.body;
  const {
    bankName,
    totalUnits,
    buyingRate,
    sellingRate,
    retailAmount,
  } = await req.body;

  const duplicate = await Stock.findOne({ bankName: bankName }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ error: `Bank Name ${bankName} already exists !` });

  try {
    await Stock.create({
      bankName,
      totalUnits,
      buyingRate,
      sellingRate,
      retailAmount,
      currentAmount: retailAmount * totalUnits,
    });

    res.status(200).json({ success: `Stock ${bankName} was created !` });
  } catch (err) {
    console.log(err);
  }
};

const updateStock = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res
        .status(400)
        .json({ error: "ID parameter is required to update !" });

    const _id = await req.params.id;
    const stock = await Stock.findById({ _id });

    if (!stock)
      return res
        .status(400)
        .json({ error: `Stock ID ${_id} does not exists !` });

    if (req.body?.buyingRate) {
      stock.buyingRate = await req.body.buyingRate;
    }
    if (req.body?.sellingRate) {
      stock.sellingRate = await req.body.sellingRate;
    }
    if (req.body?.retailAmount) {
      stock.retailAmount = await req.body.retailAmount;
    }
    await stock.save();
    res.status(200).json({ success: `Employee ID ${_id} was updated !` });
    console.log(stock);
  } catch (err) {
    console.log(err);
  }
};

const deleteStock = async (req, res) => {
  try {
    if (!req?.params?.id)
      return res
        .status(400)
        .json({ error: `ID parameter is required to delete !` });

    const _id = await req.params.id;
    const stock = await Stock.findById({ _id });

    if (!stock)
      return res
        .status(400)
        .json({ error: `Stock ID ${_id} does not exists !` });

    await stock.deleteOne({ _id });
    res
      .status(200)
      .json({ success: `Stock ID ${_id} was deleted successfully.` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllStocks,
  createNewStock,
  updateStock,
  getOneStock,
  deleteStock,
};
