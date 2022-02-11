const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

const User = require("../../models/User");

module.exports = {
  async create(req, res) {
    //para logar é nescessario informar email e password
    const { email, password } = req.body;

    //procurando usuario com o email informado
    const user = await User.findOne({ email }).select("+password");
    //se não encontrar usuario e senha informados, retorne esse erro
    if (!user) return res.status(400).send({ error: "User not found" });

    //comparando a senha informada, com a senha cadastrada
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Invalid password" });
    //não retornar a senha
    user.password = undefined;
    //gerando um token
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.send({ user, token });
  },
};
