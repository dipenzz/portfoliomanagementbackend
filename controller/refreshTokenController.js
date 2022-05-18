const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt)
    return res
      .status(401)
      .json({ Unauthorized: "RefreshToken not available !" });

  try {
    const refreshToken = await cookie.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser)
      return res.status(403).json({ Forbidden: "Invalid refreshToken !" });

    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.UserInfo.username)
          return res.status(403).json("Forbidden");

        const isAdmin = foundUser.isAdmin;

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.UserInfo.username,
              isAdmin: isAdmin,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleRefreshToken };
