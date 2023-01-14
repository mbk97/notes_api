import User from "../model/user.js";
import { loginSchema, registerSchema } from "../utils/validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = registerSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
  }

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      res.status(400).json({
        message: "User already exist",
      });
      return;
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(200).json({
      message: "Registration successful",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        token: generateToken(savedUser._id),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);

  if (error) {
    res.status(400).send(error?.details[0]?.message);
  }

  // Check if email exist
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      message: "Email does not exist",
    });
    return;
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password);

  if (validPass) {
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400).json({
      message: "user does not exist",
    });
  }

  const updateUserData = await User.findByIdAndUpdate(user, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "user profile updated",
    updateUserData,
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export { register, login, updateProfile };
