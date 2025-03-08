const User = require("../controllers/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(500).json({
      message: "such a user already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (password.length < 6) {
    return res.status(500).json({
      message: "password cannot be shorter than 6 characters",
    });
  }

  const newUser = await User.create({ name: email, password: passwordHash });

  const token = await jwt.sign({ id: newUser._id }, "USER_SECRET_TOKEN", {
    expiresIn: "1h",
  });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };
  res.status(201).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({
      message: "no such user found",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status.json({
      message: "you entered the wrong password",
    });
  }

  const token = await jwt.sign({ id: user._id }, "USER_SECRET_TOKEN", {
    expiresIn: "1h",
  });
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  };
  res.status(200).cookie("token", token, cookieOptions).json({
    user,
    token,
  });
};

const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()),
  };
  res.status(200).cookie("token", null, cookieOptions).json({
    message: "logout successful",
  });
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
