const schema = require("./userValSchema");
module.exports = {
  registerUserValidation: async (req, res, next) => {
    const value = await schema.registerUser.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

  //User login validation
  loginUserValidation: async (req, res, next) => {
    const value = await schema.loginUserValidation.validate(req.body, {
      abortEarly: false,
    });
    if (value.error) {
      res.status(403).json({
        success: false,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },

};