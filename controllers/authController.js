const login = (req, res) => {
  try {
    return res.send({
      response: "login the user",
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

const logout = (req, res) => {
  try {
    return res.send({
      response: "logout the user",
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

module.exports = { login, logout };
