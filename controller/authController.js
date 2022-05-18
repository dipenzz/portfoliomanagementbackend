const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { username, password } = await req.body;

  if (!username && !password)
    return res
      .status(400)
      .json({ error: "Username and Passoword are required !" });

  try {
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser)
      return res.status(401).json({ Unauthorized: "Username not found !!" });
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const isAdmin = foundUser.isAdmin;

      const accessToken = await jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            isAdmin: isAdmin,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = await jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await foundUser.updateOne({ $set: { refreshToken: refreshToken } });

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken, isAdmin });
    } else {
      res.status(401).json({ Unauthorized: "Password does not match !" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleLogin };
