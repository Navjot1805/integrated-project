


import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Support both id and _id
    req.user = { id: decoded.id || decoded._id };

    if (!req.user.id) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    next();
  } catch (err) {
    console.error("cd Token verification error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};


