import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export const generateToken = ({ id, name }) => {
  let token = null;
  token = jwt.sign({ id, name }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export const getUser = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    return user;
  } catch (error) {
    console.log(error);
  }
};
