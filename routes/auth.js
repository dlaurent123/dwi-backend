const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");
const firebase = require("../firebase");

// const schema = {
//   email: Joi.string().email().required(),
//   password: Joi.string().required().min(5),
// };

// router.post("/", validateWith(schema), (req, res) => {
//   const { email, password } = req.body;
//   const user = usersStore.getUserByEmail(email);
//   if (!user || user.password !== password)
//     return res.status(400).send({ error: "Invalid email or password." });

//   const token = jwt.sign(
//     { userId: user.id, name: user.name, email },
//     "jwtPrivateKey"
//   );
//   res.send(token);
// });

const checkFireBaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const decodedToken = await firebase.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "No authenticated user" });
  }
};

module.exports = checkFireBaseToken;
