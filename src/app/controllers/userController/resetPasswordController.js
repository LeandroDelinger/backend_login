const express = require("express");
const User = require("../../models/User");

module.exports = {
  async restetPass(req, res) {
    //o que eu preciso para recuperar a senha
    const { email, token, password } = req.body;

    try {
      //buscando usuario
      const user = await User.findOne({ email }).select(
        "+passwordResetToken passwordResetExpires"
      );
      //verificando se o usuario existe
      if (!user) return res.status(400).send({ error: "User not found" });
      //verificando se o token bate com o que ele recebeu
      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: "Token invalid" });

      //pegando a data atual
      const now = new Date();
      //verificando se o token esta expirado
      if (now > user.passwordResetExpires)
        return res
          .status(400)
          .send({ error: "Token expired, generate a new one" });

      //se passou pelas verificações atualiza a password do usuario
      user.password = password;

      await user.save();

      res.send("ok");
    } catch (err) {
      res.status(400).send({ error: "Cannot reset password, try again" });
    }
  },
};
