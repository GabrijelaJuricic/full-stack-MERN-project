import React from "react";
import { Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { viewModeState } from "../atoms";

const CustomersModal = (props) => {
  const [viewMode, setViewMode] = useRecoilState(viewModeState);

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
        {viewMode === "create" && "Create new customer"}
        {viewMode === "details" && "Show customer's details"}
      </Modal.Body>
    </Modal>
  );
};

export default CustomersModal;
