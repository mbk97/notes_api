import User from "../model/user.js";
import { inputSchema } from "../utils/validation.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = inputSchema.validate(req.body);

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

    const savedUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.status(200).json({
      message: "Registration successful",
      user: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
    console.log(error);
  }
};

const login = (req, res) => {
  res.send("hello");
};

export { register, login };
