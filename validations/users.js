const Joi = require("joi");

module.exports = {
  createUserSchema: async (req, res, next) => {
    const createUser = Joi.object({
      // role: Joi.valid("Instructor", "Admin", "Trainee").required(),
      roleId: Joi.string().required(),
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

  deleteUserSchema: async (req, res, next) => {
    const deleteUser = Joi.object({
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
      await deleteUser.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },

  getUserSchema: async (req, res, next) => {
    const getUser = Joi.object({
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
      await getUser.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
};
