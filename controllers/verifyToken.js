import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    req.user = jwt.decode(token);
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
