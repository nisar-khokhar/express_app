const Joi = require("joi");

module.exports = {
  createUserSchema: async (req, res, next) => {
    const createUser = Joi.object({
      // role: Joi.valid("Instructor", "Admin", "Trainee").required(),
      role: Joi.valid("Instructor", "Admin", "Trainee").required(),
      username: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9_]{3,34}$"))
        .required(),
      firstName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z_]{3,34}$"))
        .required(),
      lastName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z_]{3,34}$"))
        .required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required().length(13),
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

  /*deleteUserSchema: async (req, res, next) => {
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
  },*/

  userSchema: async (req, res, next) => {
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

  getAllUserSchema: async (req, res, next) => {
    const getAllUser = Joi.object({
      // role: Joi.valid("Instructor", "Admin", "Trainee").required(),
      pageNo: Joi.number().required(),
      limit: Joi.number().valid(3, 6).required(),
      orderWith: Joi.string().valid(
        "firstName",
        "lastName",
        "email",
        "username",
        "mobile"
      ),
      orderBy: Joi.string().valid("ASC", "DESC"),
      username: Joi.string().pattern(new RegExp("^[a-zA-Z0-9_]{1,34}$")),
      firstName: Joi.string().pattern(new RegExp("^[a-zA-Z_]{1,34}$")),
      lastName: Joi.string().pattern(new RegExp("^[a-zA-Z_]{1,34}$")),
      email: Joi.string(),
      mobile: Joi.string().length(13),
    });

    try {
      await getAllUser.validateAsync(req.query);
      next();
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  updateUserSchema: async (req, res, next) => {
    const updateUser = Joi.object({
      userId: Joi.string().required(),
      username: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string(),
      mobile: Joi.string(),
    });

    try {
      await updateUser.validateAsync(req.body);
      next();
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
};
