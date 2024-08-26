const { hash, compare } = require("bcryptjs");
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("../models/userModel");
const { getRole } = require("../models/commonModel");
const responseHandler = require("../responseHandler");

const user = [];

const get_all_users = async (req, res) => {
  try {
    req.query.offset = (req.query.pageNo - 1) * req.query.limit;
    const users = await getAllUsers(req.query);
    responseHandler(users, res);
  } catch (error) {
    return res.send({ error: error });
  }
};

const get_user = async (req, res) => {
  /*try {
    const { username, password } = req.query;

    for (let i = 0; i < user.length; i++) {
      if (user[i].username === username) {
        const isValidatePassword = await compare(password, user[i].password);
        if (isValidatePassword) {
          return res.send({ "User exists": user[i] });
        }
      }
    }
    return res.send("No User exists with such credentials");
  } catch (error) {
    console.log("ERROR----> ", error.message);
  }*/
  try {
    const user = await getUser(req.query);
    responseHandler(user, res);
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
};

const create_user = async (req, res) => {
  try {
    /*const { username, password } = req.body;
    let isUserExist = false;
    var hashedPassowrd = await hash(password, 10);

    for (let i = 0; i < user.length; i++) {
      if (user[i].username === username) {
        isUserExist = true;
        break;
      }
    }

    if (!isUserExist) {
      user.push({ username: username, password: hashedPassowrd });
      return res.send({
        response: `User created with username: ${req.body.username}`,
      });
    }
    return res.send("User already exists with such username");*/

    const role = await getRole(req.body);
    if (role.error) {
      return res.send({
        error: role.error,
      });
    }
    // console.log(role.response.dataValues);
    delete req.body.role;
    req.body.roleId = role.response.dataValues.roleId;

    const user = await createUser(req.body);
    responseHandler(user, res);
  } catch (error) {
    return res.send({ error: error });
  }
};

const delete_user = async (req, res) => {
  /*try {
    const { username, password } = req.query;
    let isValid = false;

    for (let i = 0; i < user.length; i++) {
      if (user[i].username === username) {
        const isValidatePassword = await compare(password, user[i].password);
        if (isValidatePassword) {
          isValid = true;
          break;
        }
      }
    }

    if (isValid) {
      user.forEach((element, index) => {
        if (element.username == username) {
          user.splice(index, 1);
        }
      });
      return res.send({
        response: `User deleted with username: ${req.query.username}`,
      });
    }
    return res.send("User does not exist");
  } catch (error) {
    return res.send({ error: error });
  }*/
  try {
    const user = await deleteUser(req.query);
    responseHandler(user, res);
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
};

const update_user = async (req, res) => {
  try {
    const user = await updateUser(req.body);
    responseHandler(user, res);
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
};

/*const updateUser = async (req, res) => {
  try {
    const { username, password, newUsername, newPassword } = req.body;
    let userUpdated = false;

    // Loop through users and update if username and password match
    await Promise.all(
      user.map(async (user) => {
        if (user.username === username) {
          const isMatch = await compare(password, user.password);
          if (isMatch) {
            // Update the username if newUsername is provided
            if (newUsername) {
              user.username = newUsername;
            }

            // Update the password if newPassword is provided
            if (newPassword) {
              user.password = await hash(newPassword, 10); // Hash the new password
            }

            userUpdated = true; // Mark that the user was updated
          }
        }
      })
    );

    if (userUpdated) {
      return res.send({
        response: `${username} updated successfully`,
        user, // Optionally return the updated user list
      });
    } else {
      return res.send({
        response: "User not found or password incorrect",
      });
    }
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
};*/

const get_profile = async (req, res) => {
  try {
    const userProfile = await profile(req.user);
    responseHandler(userProfile, res);
  } catch (error) {
    return res.send({
      error: error.message,
    });
  }
};

module.exports = {
  get_user,
  get_all_users,
  create_user,
  delete_user,
  update_user,
  get_profile,
};
