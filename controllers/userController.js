const { hash, compare } = require("bcryptjs");
const { createUser, getAllUsers } = require("../models/userModel");
const user = [];

const get_all_users = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.error) {
      return res.send({
        error: users.error,
      });
    }
    return res.send({
      response: users.response,
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

const getUser = async (req, res) => {
  try {
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

    const user = await createUser(req.body);
    if (user.error) {
      return res.send({
        error: user.error,
      });
    }
    return res.send({
      response: user.response,
    });
  } catch (error) {
    return res.send({ response: "3", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
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
    return res.send({ response: "4", error: error });
  }
};

const updateUser = async (req, res) => {
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
};

module.exports = { getUser, get_all_users, create_user, deleteUser };
