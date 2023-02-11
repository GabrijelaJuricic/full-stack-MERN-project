const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Customers = new Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  birthdate: {
    type: String,
  },
});

module.exports = mongoose.model("Customers", Customers);
