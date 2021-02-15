const firebase = require("../firebase");

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

const check = { name: "dan" };

module.exports = { checkFireBaseToken, check };
