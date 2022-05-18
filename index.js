const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const connectDB = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const credentials = require("./middlewares/credentials");
const corsOptions = require("./config/corsOptions");

//importing Routes
const registerRoute = require("./routes/register");
const stocksRoute = require("./routes/stock");
const transactionRoute = require("./routes/transaction");
const authRoute = require("./routes/auth");
const verifyJWT = require("./middlewares/verifyJWT");
const refreshRoute = require("./routes/refresh");
const logoutRoute = require("./routes/logout");

//Database Connection
connectDB();

//Handle options credentials check
app.use(credentials);

//express middleware
app.use(express.json());

//Cors middleware
app.use(cors(corsOptions));

app.use(cors());

//Cookie middleware
app.use(cookieParser());

// Routes
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use("/logout", logoutRoute);
app.use(verifyJWT);
app.use("/stocks", stocksRoute);
app.use("/transaction", transactionRoute);

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Database is connected !");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
