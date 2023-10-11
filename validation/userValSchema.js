const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
  registerUser: joi
    .object({
      name: joi
        .string()
        .min(3)
        .max(30)
        .message({
          "String.min": "{#label} should contains at least {#limit} charecters",
          "String.max": "{#label} should contains at least {#limit} charecters",
        })
        .required(),

      email: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),

      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
          "password.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        }),
    })
    .unknown(true),

  //--------login validation---------

   loginUserValidation: joi
    .object({
      email: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),
      password: joi.string().required(),
    })
    .unknown(true),
};

module.exports = schema;
