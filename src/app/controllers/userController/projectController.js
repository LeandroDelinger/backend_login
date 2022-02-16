const express = require("express");

module.exports = {
  async project(req, res) {
    res.send({ ok: true, user: req.userId });
  },
};
