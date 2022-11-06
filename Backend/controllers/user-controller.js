const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Message = require("../models/Message");

const login = async (req, res, next) => {
  ("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("package");
    if (!user) {
      return res.status(404).json({ msg: "No user found for this email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Email and password does not match",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    user.password = undefined;
    jwt.sign(data, "filesaver", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        role: user.role,
        user: user,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

const addUser = async (req, res, next) => {
  const {
    email,
    image,
    password,
    firstName,
    lastName,
    address,
    gender,
    age,
    mobile,
    packageId,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      ("user found");
      return res.status(400).json({
        msg: "This email is being used. please use a different email",
      });
    } else {
      user = new User({
        email,
        image: image
          ? image
          : "https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg",
        password,
        firstName,
        lastName,
        age: parseInt(age),
        address,
        mobile,
        gender,
        package: packageId ? packageId : null,
        role: "user",
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const data = {
        user: {
          firstName: firstName,
          id: user.id,
          role: "user",
        },
      };
      return res.status(200).json({
        msg: `${firstName} created as a customer`,
        data,
      });
    }
  } catch (err) {
    err;
    return res.status(500).json({
      msg: err,
    });
  }
};

const signUp = async (req, res, next) => {
  const { email, password, firstName, lastName, role } = req.body;

  let user;
  try {
    user = new User({
      email,
      password,
      firstName,
      lastName,

      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(data, "filesaver", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      return res.status(200).json({
        token,
        name: firstName,
        id: user.id,
        role: user.role,
      });
    });
  } catch (err) {
    return res.status(500).json({
      msg: err,
    });
  }
};

//save message
const saveMessage = async (req, res, next) => {
  const newmessage = { message: req.body.message };

  const user = await User.findById(req.body.userId);

  try {
    const savedMessage = await user.updateOne({ $push: { messages: [newmessage] } });
    res.status(200).json("message saved");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = login;
exports.addUser = addUser;
exports.signUp = signUp;
exports.saveMessage = saveMessage;
