"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const customersRoutes = express.Router();
const dayjs = require("dayjs");
const basePriceJson = require("./data/base-price.json");
const discountJson = require("./data/discount.json");
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
// helper function for getting customer by id
function getCustomerById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let customer;
        try {
            customer = yield Customers.findById(req.params.id);
            if (customer == null) {
                return res.status(404).json({ message: "Cannot find customer" });
            }
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
        res.customer = customer;
        next();
    });
}
// get all customers
customersRoutes.route("/").get((req, res) => {
    Customers.find((err, customers) => {
        if (err) {
            res.status(500).json({ message: err.message });
        }
        else {
            res.json(customers);
        }
    });
});
// create customer
customersRoutes.route("/create").post((req, res) => {
    let customer = new Customers(req.body);
    customer
        .save()
        .then(() => {
        res.status(200).json("Customer created successfully");
    })
        .catch((err) => {
        res.status(400).send("Creating new customer failed");
    });
});
// get customer by id
customersRoutes.route("/details/:id").get(getCustomerById, (req, res) => {
    res.json(res.customer);
});
// update customer
customersRoutes.route("/edit/:id").patch(getCustomerById, (req, res) => {
    if (req.body.name !== null) {
        res.customer.name = req.body.name;
    }
    if (req.body.lastname !== null) {
        res.customer.lastname = req.body.lastname;
    }
    if (req.body.email !== null) {
        res.customer.email = req.body.email;
    }
    if (req.body.city !== null) {
        res.customer.city = req.body.city;
    }
    if (req.body.birthdate !== null) {
        res.customer.birthdate = req.body.birthdate;
    }
    res.customer
        .save()
        .then(() => {
        console.log(res.json("Customer updated successfully"));
    })
        .catch((err) => {
        res.status(400).send("Update not possible");
    });
});
//delete customer
customersRoutes.route("/delete/:id").delete(getCustomerById, (req, res) => {
    res.customer
        .remove()
        .then((result) => {
        res.status(200).json(result);
    })
        .catch((err) => {
        res.status(500).json("Customer deleted successfully");
    });
});
// calculate insurance price
customersRoutes.route("/calculate/:id").get(getCustomerById, (req, res) => {
    const city = res.customer._doc.city;
    const birthdate = res.customer._doc.birthdate;
    const age = customersAge(birthdate);
    const basePrice = calculateBasePrice(city);
    const discount = calculateDiscount(age);
    const totalPrice = (basePrice * (100 - discount)) / 100;
    res.status(200).json(totalPrice);
});
const customersAge = (birthdate) => {
    const currentDate = dayjs();
    birthdate = dayjs(birthdate);
    const age = currentDate.diff(birthdate, "year", true);
    return age;
};
const calculateBasePrice = (city) => {
    let result = 0;
    let foundCity = false;
    basePriceJson.map((element) => {
        if (element.city === city) {
            foundCity = true;
            result = element.amount;
        }
        else if (element.city === "other") {
            if (!foundCity) {
                result = element.amount;
            }
        }
    });
    return result;
};
const calculateDiscount = (age) => {
    let result = 0;
    discountJson.map((element) => {
        agePeriods = element.age.split("-");
        if (age >= parseInt(agePeriods[0]) && age < parseInt(agePeriods[1])) {
            result = element.discount;
        }
    });
    return result;
};
app.use("/customers", customersRoutes);
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
