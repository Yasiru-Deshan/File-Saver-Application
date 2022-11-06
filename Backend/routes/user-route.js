const express = require("express");
const {
  login,
  addUser,
  signUp,
  saveMessage,
} = require("../controllers/user-controller");

const adminAuth = require("../middleware/AdminAuthentication");
const Authentication = require("../middleware/Authentication");
const managerAuth = require("../middleware/ManagerAuthentication");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp); //admin register
router.post("/create", adminAuth, addUser);
router.put("/save", Authentication, saveMessage);

module.exports = router;
