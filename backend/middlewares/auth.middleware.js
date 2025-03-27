import { getUser } from "../services/auth.service.js";

export function checkForAuth(req, res, next) {
  req.user = null;

  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }
  req.user = getUser(token);
  next();
}
