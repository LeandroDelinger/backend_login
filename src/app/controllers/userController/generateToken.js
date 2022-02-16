const jwt = require("jsonwebtoken");
const express = require("express");
const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = generateToken;
