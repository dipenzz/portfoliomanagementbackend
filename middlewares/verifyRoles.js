const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.isAuth) return res.status(401).json("Unauthorized !");

    const rolesArray = [...allowedRoles];

    console.log(req.isAuth);
    console.log(rolesArray);

    const result = req.isAuth;
    // .map((role) => rolesArray.includes(role))
    // .find((val) => val === true);

    if (!result) res.status(401).json("Unauthorized");
    next();
  };
};

module.exports = verifyRoles;
