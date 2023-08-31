const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../managers/jwtManager");
const emailManager = require("../../managers/emailManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password, confirm_password, name} = req.body;

  //validation
  if (!email) throw "Email is required";
  if (!password) throw "Password is required";
  if (password.length < 8) throw "Password must be atleast 8 character";
  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    throw "Password must include lowercase and uppercase letters, numbers, and special characters";
  }

  if (password.includes(name)) throw "Password cannot contain your name";
  if (password === email) throw "Password cannot be the same as your email";
  if (!name) throw "Name is required";
  if (password !== confirm_password) throw "Password need to be same";

  const getDuplicateEmail = await userModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "This email already exist ! Please try new one";

  //hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await userModel.create({
    name: name,
    email: email,
    password: hashedPassword
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to ABCollage . We hope you can manage your expense easily from our platform!",
    "<h1>Welcome to ABCollage .</h1> <br/> <br/>WE your work from our platform!",
    "Welcome to Collage Management"
  );

  res.status(201).json({
    status: "User registered successfully",
    accessToken: accessToken,
  });
};

module.exports = register;
