const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//helpers
const generateHashPassword = async (password) => {
  const hashPassword = await bcryptjs.hash(password, 10);
  return hashPassword;
};

//send response
const sendResponse = async (res, statusCode, msg) => {
  res.status(statusCode).json({ message: msg });
};

//match password
const isPasswordMatch = async (password, userPassword) => {
  const isMatch = await bcryptjs.compare(password, userPassword);
  return isMatch;
};

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return sendResponse(res, 400, "User already exist");
    }

    const hashPassword = await generateHashPassword(password);
    const newUser = new User({ username, password: hashPassword, role });
    await newUser.save();
    return sendResponse(res, 201, `User created with username: ${username}`);
  } catch (error) {
    sendResponse(res, 500, `${error.message || "something went wrong"}`);
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, 404, "User not found ");
    }
    const isMatch = await isPasswordMatch(password, user.password);
    //match password
    if (!isMatch) {
      return sendResponse(res, 400, "Invalid username or password");
    }
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    sendResponse(res, 500, `${error.message || "something went wrong"}`);
  }
};

module.exports = { login, register };
