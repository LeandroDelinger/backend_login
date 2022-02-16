const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Schema é como uma tabela do que vai ter no banco de dados
const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: "string",
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: "string",
    select: false,
  },
  passwordResetExpires: {
    type: "date",
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//criptografando a password antes de salvar no banco de dados
UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
