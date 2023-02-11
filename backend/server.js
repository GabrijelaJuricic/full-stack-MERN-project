const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const customersRoutes = express.Router();
const PORT = 4000;

let Customers = require("./customers-model");

//midlewares
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/customers", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// get all customers
customersRoutes.route("/").get((req, res) => {
  Customers.find((err, customers) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(customers);
    }
  });
});

app.use("/customers", customersRoutes);

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
