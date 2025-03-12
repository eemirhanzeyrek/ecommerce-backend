const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMidd = async (req, res, next) => {
  const token = req.headers.authorization.split("")[1];

  try {
    if (!token) {
      return res.status(500).json({
        message: "Login to access",
      });
    }

    const decodedData = jwt.verify(token, process.env.USER_SECRET_TOKEN);

    if (!decodedData) {
      return res.status(500).json({
        message: "Your access token is invalid",
      });
    }

    req.user = await User.findById(decodedData.id);

    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(500).json({
        message: "You do not have permission to login",
      });
    }
    next();
  };
};

module.exports = { authMidd, roleChecked };
