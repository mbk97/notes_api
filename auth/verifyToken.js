import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
  } catch (error) {}
};
