const mongoose = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost/backend-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
