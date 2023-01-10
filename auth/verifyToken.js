import { verify } from "jsonwebtoken";
import User from "../model/user.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the header
      token = req.headers.authorization.split(" ")[1];

      //   verify the token
      const decoded = verify(token, process.env.TOKEN_SECRET);

      //   this allows the user to be extracted from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Not authorized",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: "Not authorized, no token!",
    });
  }
};

export { protect };
