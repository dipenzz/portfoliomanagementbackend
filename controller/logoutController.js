const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.status(200).json("There is no cookie to clear");

  try {
    const refreshToken = await cookie.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.status(204).json({ success: "There is no content to send !" });
    }

    await foundUser.updateOne({ $set: { refreshToken: "" } }).exec();
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.json({ success: "Logout success !" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleLogout };
