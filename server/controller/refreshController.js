import jwt from "jsonwebtoken";

export function generateAccessToken(req, res) {
  const refreshToken = req.cookies.refresh;
  if (refreshToken) {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        const accessToken = jwt.sign({}, process.env.ACCESS_SECRET, {
          expiresIn: "10m",
        });
        res.cookie("access", accessToken, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
          secure: true,
        });
        return res.status(201).json({ message: "Success" });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
}
