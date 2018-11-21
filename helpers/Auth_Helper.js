const jwt = require("jsonwebtoken");
const Auth = require("../config/Auth_Config.json");
const responseHandler = require("../helpers/Response_Helper");

module.exports = (req, res, next) => {
  try {
    // get authorization token from form headers
    const token = req.headers.authorization;
    // verify jwt token
    const decoded = jwt.verify(token, Auth.secretKey);
    next();
  } catch (err) {
    return responseHandler.sendResponse(res, 401, "Authentication Failed");
  }
};
