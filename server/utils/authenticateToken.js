import jwt from "jsonwebtoken";
import "dotenv/config";

export default function authenticateToken(req, res, next) {
  const accessToken = req.cookies.access;
  if (accessToken == null)
    return res.status(401).json({
      message: "Expired",
    });

  jwt.verify(accessToken, process.env.ACCESS_SECRET, (err) => {
    console.log("Error", err);
    if (err)
      return res.status(406).json({
        message: "Expired",
      });
    next();
  });
}