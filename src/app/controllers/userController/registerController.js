const User = require("../../models/User");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const userCreate = await User.create({
      name,
      email,
      password,
    });

    userCreate.password = undefined;

    return res.status(200).json({
      message: "User created",
      user: userCreate,
    });
  },
};
