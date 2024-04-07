import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevents XSS attacks, cross-site scripting attacks
    sameSite: "strict", //prevects CSRF attakcs, cross-site request forgery
    secure: process.env.NODE_JS !== "development",
  });
};

export default generateTokenandSetCookie;
