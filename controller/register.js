const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password are required !" });
  }

  const duplicate = await User.findOne({ username: username }).exec();

  if (duplicate)
    return res.status(409).json({ err: "Username already exists !" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      password: hashedPwd,
      isAdmin: isAdmin,
    });
    console.log(newUser);

    res.status(200).json({ success: `${username} is created successfully !` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleNewUser;
