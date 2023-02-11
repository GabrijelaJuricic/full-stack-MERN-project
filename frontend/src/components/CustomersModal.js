import { TextField } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { modalShowState, viewModeState } from "../atoms";
import "./CustomersModal.css";

const CustomersModal = (props) => {
  const [viewMode, setViewMode] = useRecoilState(viewModeState);
  const [, setModalShow] = useRecoilState(modalShowState);

  // CREATE NEW CUSTOMER //
  const submitNewCustomerHandler = () => {
    setModalShow(false);
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
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {viewMode === "create" && (
          <form>
            <TextField
              id="name"
              style={{ marginTop: 15 }}
              value="name"
              fullWidth
              label="Name"
              placeholder="Enter your name"
            />
            <TextField
              id="lastname"
              style={{ marginTop: 30 }}
              value={"lastname"}
              fullWidth
              label="Lastname"
              placeholder="Enter your lastname"
            />
            <TextField
              id="email"
              style={{ marginTop: 30 }}
              value={"email"}
              fullWidth
              label="Email"
              placeholder="Enter your email"
            />
            <TextField
              id="city"
              style={{ marginTop: 30 }}
              value={"city"}
              fullWidth
              label="City"
            />
            <TextField
              id="birthdate"
              style={{ marginTop: 30 }}
              value={"birthdate"}
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
                type="submit"
                className="btn btn-primary float-end"
                style={{ marginRight: 5, marginLeft: 10 }}
                onClick={submitNewCustomerHandler}
              >
                Submit
              </button>
            </div>
          </form>
        )}
        {viewMode === "details" && "Show customer's details"}
      </Modal.Body>
    </Modal>
  );
};

export default CustomersModal;
