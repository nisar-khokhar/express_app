const Joi = require("joi");

module.exports = {
  createUserSchema: async (req, res, next) => {
    const createUser = Joi.object({
      username: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9_]{3,34}$"))
        .required(),
      password: Joi.string()
        .pattern(
          new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&?]).{6,18}$")
        )
        .required(),
    });
    try {
      await createUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
