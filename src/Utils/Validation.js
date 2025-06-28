
// npm package: To validate email and password using the validator 
const validator = require('validator');

const ValidatorSignData = (req) => {
  const { firstname, lastname, emailId, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error("name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("emailId is not Valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter the right password!");
  }
};

module.exports = {
    ValidatorSignData
}