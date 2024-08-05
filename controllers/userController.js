const user = [];

const getAll = (req, res) => {
  try {
    return res.send({
      response: user,
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

const create = (req, res) => {
  try {
    user.push(req.body);

    return res.send({
      response: `user created with username: ${req.body.username}`,
    });
  } catch (error) {
    return res.send({ error: error });
  }
};

module.exports = { getAll, create };
