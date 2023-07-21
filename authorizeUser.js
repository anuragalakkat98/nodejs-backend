const jwt = require("jsonwebtoken");

const authorizeUser = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authorizeUser;
