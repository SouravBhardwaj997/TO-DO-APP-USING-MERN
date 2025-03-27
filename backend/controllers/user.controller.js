import User from "../models/User.Schema.js";
import { generateToken } from "../services/auth.service.js";

const createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status("400")
        .json({ success: false, message: "All fields are required." });
    }
    if (password.length < 6) {
      return res.status("400").json({
        success: false,
        message: "Password should be atleast 6 character long.",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    return res
      .status(201)
      .json({ success: true, message: "User create Succesfully", user });
  } catch (error) {
    console.log("error while creating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordCorrect = await user.comparePasswords(password);

    if (!isPasswordCorrect) {
      return res.status(400).send({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const token = await generateToken({
      id: user._id,
      name: user.name,
    });
    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      message: "User login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createNewUser, loginUser };
