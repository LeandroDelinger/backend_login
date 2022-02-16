const express = require("express");
const crypto = require("crypto");
const User = require("../../models/User");

const transport = require("../../modules/mailer");

module.exports = {
  async forgotPass(req, res) {
    //email que o usuario quer recuperar a senha
    const { email } = req.body;

    try {
      //verificando se o email está cadastrado
      const user = await User.findOne({ email });
      if (!user) return res.status(400).send({ error: "User not found" });

      //gerando um token para enviar ao usuário
      const token = crypto.randomBytes(20).toString("hex");

      //tempo de expiração do token
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now,
        },
      });

      transport.sendMail(
        {
          to: email, // list of receivers
          from: "leandro.delinger@gmail.com",
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: `<b>Olá, esse é seu token: ${token}</b>`, // html body
          context: { token },
        },
        (err) => {
          if (err)
            return res
              .status(400)
              .send({ error: "Cannot send forgot password" });
        }
      );

      return res.send();
    } catch (err) {
      res.status(400).send({ error: "Erro on forgort password, try again" });
    }
  },
};
