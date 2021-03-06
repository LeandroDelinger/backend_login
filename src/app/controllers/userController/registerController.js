const User = require("../../models/User");
const generateToken = require("./generateToken");

module.exports = {
  async create(req, res) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: "User already exists" });

      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },
};
