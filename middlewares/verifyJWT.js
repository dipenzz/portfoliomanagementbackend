const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });

    req.username = decoded.UserInfo.username;
    req.isAuth = decoded.UserInfo.isAdmin;

    next();
  });
};

module.exports = verifyJWT;
