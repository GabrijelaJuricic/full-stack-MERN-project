import React, { useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  modalShowState,
  viewModeState,
  newCustomerState,
  isPriceCalculatedState,
  insurancePriceState,
  deleteCustomerState,
  customerDetailsState,
  customerBirthdateState,
  editCustomersDetailsState,
  updatedCustomerState,
} from "../atoms";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import BirthdatePicker from "./Birthdate";
import "./CustomersModal.css";
import { Price } from "../types";

const CustomersModal: React.FC<{ show: boolean; onHide: () => void }> = (
  props
) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useRecoilState(customerBirthdateState);
  const [viewMode, setViewMode] = useRecoilState(viewModeState);
  const [, setModalShow] = useRecoilState(modalShowState);
  const [, setNewCustomer] = useRecoilState(newCustomerState);
  const [isPriceCalculated, setIsPriceCalculated] = useRecoilState(
    isPriceCalculatedState
  );
  const [insurancePrice, setInsurancePrice] =
    useRecoilState(insurancePriceState);
  const [customerDetails, setCustomerDetails] =
    useRecoilState(customerDetailsState);
  const [, setDeleteCustomer] = useRecoilState(deleteCustomerState);
  const [editCustomersDetails, setEditCustomersDetails] = useRecoilState(
    editCustomersDetailsState
  );
  const [, setUpdatedCustomer] = useRecoilState(updatedCustomerState);

  const id = customerDetails._id;

  // CREATE NEW CUSTOMER //
  const submitNewCustomerHandler = () => {
    let currentCustomer = {
      name: name,
      lastname: lastname,
      email: email,
      city: city,
      birthdate: birthdate,
    };
    axios
      .post("http://localhost:4000/customers/create", currentCustomer)
      .then((result) => {
        setNewCustomer(result.data);
      })
      .catch((error) => console.log(error));

    setModalShow(false);
    setName("");
    setLastname("");
    setEmail("");
    setCity("");
    setBirthdate(null);
  };

  // DETAILS //
  const deleteCustomerHandler = () => {
    axios
      .delete(`http://localhost:4000/customers/delete/${id}`)
      .then((response) => {
        setDeleteCustomer(response.data);
      })
      .catch(() => {
        console.log("nonoooo");
      });

    setModalShow(false);
  };
  const editHandler = () => {
    setViewMode("edit");
    axios
      .get(`http://localhost:4000/customers/details/${id}`)
      .then((customer) => {
        setEditCustomersDetails(customer.data);
      });
  };

  // EDIT //
  const updateCustomerHandler = () => {
    let updatedSingleCustomer = {
      name: editCustomersDetails.name,
      lastname: editCustomersDetails.lastname,
      email: editCustomersDetails.email,
      city: editCustomersDetails.city,
      birthdate: editCustomersDetails.birthdate,
    };
    setUpdatedCustomer(updatedSingleCustomer);
    axios
      .patch(
        `http://localhost:4000/customers/edit/${id}`,
        updatedSingleCustomer
      )
      .then((customer) => {
        setUpdatedCustomer(customer.data);
      });

    setModalShow(false);
  };

  // calculate price //
  const calculatePriceHandler = () => {
    axios
      .get<Price[]>(`http://localhost:4000/customers/calculate/${id}`)
      .then((response) => {
        setInsurancePrice(`${response.data} €`);
      });
    setIsPriceCalculated(true);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {viewMode === "create" && "Add New Customer"}
          {viewMode === "details" && "Customer Details"}
          {viewMode === "edit" && "Edit Customer"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* CREATE view mode */}
        {viewMode === "create" && (
          <form>
            <TextField
              id="name"
              style={{ marginTop: 15 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              label="Name"
              placeholder="Enter your name"
            />
            <TextField
              id="lastname"
              style={{ marginTop: 30 }}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
              label="Lastname"
              placeholder="Enter your lastname"
            />
            <TextField
              id="email"
              style={{ marginTop: 30 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              id="city"
              style={{ marginTop: 30 }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              label="City"
            />
            <BirthdatePicker />
            <div className="button-container">
              <button
                type="button"
                className="btn btn-light float-end"
                onClick={() => setModalShow(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary float-end"
                style={{ marginRight: 5, marginLeft: 10 }}
                onClick={submitNewCustomerHandler}
                disabled={
                  name === "" ||
                  lastname === "" ||
                  email === "" ||
                  city === "" ||
                  birthdate === null
                }
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {/* DETAILS view mode */}
        {viewMode === "details" && (
          <>
            <TextField
              id="name"
              style={{ marginTop: 15 }}
              value={customerDetails.name}
              fullWidth
              label="Name"
              disabled
            />
            <TextField
              id="lastname"
              style={{ marginTop: 30 }}
              value={customerDetails.lastname}
              fullWidth
              label="Lastname"
              disabled
            />
            <TextField
              id="email"
              style={{ marginTop: 30 }}
              value={customerDetails.email}
              fullWidth
              label="Email"
              disabled
            />
            <TextField
              id="city"
              style={{ marginTop: 30 }}
              value={customerDetails.city}
              fullWidth
              label="City"
              disabled
            />
            <TextField
              id="birthdate"
              style={{ marginTop: 30 }}
              value={customerDetails.birthdate}
              fullWidth
              label="Birthdate"
              disabled
            />
            <div className="calculation-container">
              {isPriceCalculated && (
                <TextField
                  id="calculate"
                  style={{ marginTop: 30, width: 100 }}
                  value={insurancePrice}
                  label="Price"
                  disabled
                />
              )}
              {!isPriceCalculated && (
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  style={{ marginRight: 5, marginTop: 30 }}
                  onClick={calculatePriceHandler}
                >
                  Calculate Insurance Price
                </button>
              )}
            </div>
            <div className="button-container">
              <button
                type="button"
                className="btn btn-light float-end"
                onClick={deleteCustomerHandler}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-primary float-end"
                style={{ marginRight: 5, marginLeft: 10 }}
                onClick={editHandler}
              >
                Edit
              </button>
            </div>
          </>
        )}
        {/* EDIT view mode */}
        {viewMode === "edit" && (
          <form>
            <TextField
              id="name"
              style={{ marginTop: 15 }}
              value={editCustomersDetails.name}
              onChange={(e) =>
                setEditCustomersDetails({
                  ...editCustomersDetails,
                  name: e.target.value,
                })
              }
              fullWidth
              label="Name"
              placeholder="Enter your name"
            />
            <TextField
              id="lastname"
              style={{ marginTop: 30 }}
              value={editCustomersDetails.lastname}
              onChange={(e) =>
                setEditCustomersDetails({
                  ...editCustomersDetails,
                  lastname: e.target.value,
                })
              }
              fullWidth
              label="Lastname"
              placeholder="Enter your lastname"
            />
            <TextField
              id="email"
              style={{ marginTop: 30 }}
              value={editCustomersDetails.email}
              onChange={(e) =>
                setEditCustomersDetails({
                  ...editCustomersDetails,
                  email: e.target.value,
                })
              }
              fullWidth
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              id="city"
              style={{ marginTop: 30 }}
              value={editCustomersDetails.city}
              onChange={(e) =>
                setEditCustomersDetails({
                  ...editCustomersDetails,
                  city: e.target.value,
                })
              }
              fullWidth
              label="City"
            />
            <BirthdatePicker />
            <div className="calculation-container">
              {isPriceCalculated && (
                <TextField
                  id="calculate"
                  style={{ marginTop: 30, width: 100 }}
                  value={insurancePrice}
                  label="Price"
                  disabled
                />
              )}
              {!isPriceCalculated && (
                <button
                  type="button"
                  className="btn btn-primary float-end"
                  style={{ marginRight: 5, marginTop: 30 }}
                  onClick={calculatePriceHandler}
                >
                  Calculate Insurance Price
                </button>
              )}
            </div>
            <div className="button-container">
              <button
                type="button"
                className="btn btn-light float-end"
                onClick={() => setModalShow(false)}
              >
                Discard
              </button>
              <button
                type="button"
                className="btn btn-primary float-end"
                style={{ marginRight: 5, marginLeft: 10 }}
                onClick={updateCustomerHandler}
              >
                Save
              </button>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CustomersModal;
