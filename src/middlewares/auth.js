
//* step by step doing - doing is new thinking
//  - userAuth Middleware
//  - Add the userAuth middle ware in profile API
//  - a new sendConnectionRequest API
//  - Set the expiry of JWT token and cookies to 7 days
//  - Create userSchema method to getJWT()
//  - Create UserSchema method to comparepassword(passwordInputByUser)

var jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const isUserAuthenticated = async (req, res, next) => {
  try {
    // const { token } = cookie.token; 
    // req.cookies is an object in Express.js that contains cookies sent by the client in the request.
     const {token} = req.cookies;
    if(!token){
        throw new Error("token is not valid!");
    }
    const decodedMassage = await jwt.verify(token, "devTinder$7302");
    const { _id } = decodedMassage;
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("User not found!");
    }
    // assign req.user = user(login-user-like ethan-hunt)
    req.user = user;
    next();
  } catch (error) {
    console.log("massage reached here!")
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  isUserAuthenticated,
};
