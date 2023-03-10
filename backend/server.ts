//@ts-nocheck

const express = require("express");
import { Dayjs } from "dayjs";
import { Request, Response, NextFunction } from "express";
import {
  BasePriceElement,
  Customer,
  CustomerResponse,
  DiscountElement,
} from "./types";
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongooseServer } = require("mongoose");
const customersRoutes = express.Router();

const PORT = 4000;

const dayjs = require("dayjs");
import "dayjs/locale/hr";
const basePriceJson = require("./data/base-price.json");
const discountJson = require("./data/discount.json");

let Customer = require("./customers-model");

//midlewares
app.use(cors());
app.use(bodyParser.json());

mongooseServer.connect("mongodb://127.0.0.1:27017/customers", {
  useNewUrlParser: true,
});
const connection = mongooseServer.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// helper function for getting customer by id
async function getCustomerById(
  req: Request,
  res: CustomerResponse,
  next: NextFunction
) {
  let customer;

  try {
    customer = await Customers.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }

  res.customer = customer;
  next();
}

// get all customers
customersRoutes.route("/").get((res: CustomerResponse) => {
  Customer.find((err: Error, customers: Customer[]) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(customers);
    }
  });
});

// create customer
customersRoutes.route("/create").post((req: Request, res: Response) => {
  let customer = new Customers(req.body);
  customer
    .save()
    .then(() => {
      res.status(200).json("Customer created successfully");
    })
    .catch(() => {
      res.status(400).send("Creating new customer failed");
    });
});

// get customer by id
customersRoutes
  .route("/details/:id")
  .get(getCustomerById, (res: CustomerResponse) => {
    res.json(res.customer);
  });

// update customer
customersRoutes
  .route("/edit/:id")
  .patch(getCustomerById, (req: Request, res: CustomerResponse) => {
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
      .catch(() => {
        res.status(400).send("Update not possible");
      });
  });

//delete customer
customersRoutes
  .route("/delete/:id")
  .delete(getCustomerById, (res: CustomerResponse) => {
    res.customer
      .remove()
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json("Customer deleted successfully");
      });
  });

// calculate insurance price
customersRoutes
  .route("/calculate/:id")
  .get(getCustomerById, (res: CustomerResponse) => {
    const city = res.customer._doc.city;
    const birthdate = res.customer._doc.birthdate;
    const age = customersAge(birthdate);

    const basePrice = calculateBasePrice(city);
    const discount = calculateDiscount(age);
    const totalPrice = (basePrice * (100 - discount)) / 100;

    res.status(200).json(totalPrice);
  });

const customersAge = (birthdate: string) => {
  const currentDate: Dayjs = dayjs();
  birthdate = dayjs(birthdate);
  const age = currentDate.diff(birthdate, "year", true);
  return age;
};

const calculateBasePrice = (city: string) => {
  let result = 0;
  let foundCity = false;
  basePriceJson.map((element: BasePriceElement) => {
    if (element.city === city) {
      foundCity = true;
      result = element.amount;
    } else if (element.city === "other") {
      if (!foundCity) {
        result = element.amount;
      }
    }
  });
  return result;
};

const calculateDiscount = (age: number) => {
  let result = 0;
  discountJson.map((element: DiscountElement) => {
    const agePeriods: string[] = element.age.split("-");
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
