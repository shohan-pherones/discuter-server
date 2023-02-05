const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// creating token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

// user registration controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // find user in db
    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already exist with this email");

    // validation
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");
    if (!validator.isEmail(email))
      res
        .status(400)
        .json("Invalid email, please provide a valid email address");
    if (!validator.isStrongPassword(password))
      res
        .status(400)
        .json(
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        );

    // create an user
    user = new userModel({ name, email, password });

    // password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // save user to db
    await user.save();

    // generate a jwt token
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
};
