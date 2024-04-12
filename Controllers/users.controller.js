const UsersModel = require("../Models/Users.Model");
const bcrypt = require("bcrypt");

let Register = async (req, res) => {
  let foundUser = await UsersModel.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (foundUser) {
    return res.status(200).json({ msg: "User Already Exist" });
  }
  let salt = await bcrypt.genSalt(10);
  let hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  req.body.email = req.body.email.toLowerCase();
  let newUser = new UsersModel(req.body);
  await newUser.save();
  return res
    .status(200)
    .json({ msg: "User Registerd Successfully", data: newUser });
};

let Login = async (req, res) => {
  let foundUser = await UsersModel.findOne({
    email: req.body.email.toLowerCase(),
  });

  if (!foundUser) {
    return res.status(200).json({ msg: "Invalid Email or Password" });
  }

  let passCheck = await bcrypt.compare(req.body.password, foundUser.password);

  if (!passCheck) {
    return res.status(200).json({ msg: "Invalid Email or Password" });
  }

  return res.status(200).json({ msg: "Logged In Successfully" });
};

module.exports = { Register, Login };
