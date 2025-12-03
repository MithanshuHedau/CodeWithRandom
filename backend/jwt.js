const jwt = require("jsonwebtoken");
const jwtAuthMiddleWare = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: "Token Not Found" });
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT middleware: JWT_SECRET is not configured");
      return res
        .status(500)
        .json({ error: "Server misconfiguration: JWT_SECRET not set" });
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

const generateToken = (userData) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Throw a clear error so callers (routes) can detect misconfiguration
    throw new Error("JWT_SECRET_NOT_SET");
  }
  return jwt.sign(userData, secret, {
    expiresIn: "3h",
  });
};

module.exports = { jwtAuthMiddleWare, generateToken };
