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
} from "../atoms";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import "./CustomersModal.css";

const CustomersModal = (props) => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
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
    setBirthdate("");
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

  // EDIT //
  const updateCustomerHandler = () => {
    axios
      .patch(`http://localhost:4000/customers/edit/${id}`, customerDetails)
      .then((customer) => {
        setCustomerDetails(customer.data);
      });

    setModalShow(false);
  };

  // calculate price //
  const calculatePriceHandler = () => {
    setIsPriceCalculated(true);
  };

  return (
    <Modal
      {...props}
      size="md"
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
            <TextField
              id="birthdate"
              style={{ marginTop: 30 }}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              fullWidth
              label="Birthdate"
            />
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
                  birthdate === ""
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
                onClick={() => {
                  setViewMode("edit");
                }}
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
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
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
              value={customerDetails.lastname}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
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
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
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
              value={customerDetails.city}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  city: e.target.value,
                })
              }
              fullWidth
              label="City"
            />
            <TextField
              id="birthdate"
              style={{ marginTop: 30 }}
              value={customerDetails.birthdate}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  birthdate: e.target.value,
                })
              }
              fullWidth
              label="Birthdate"
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
