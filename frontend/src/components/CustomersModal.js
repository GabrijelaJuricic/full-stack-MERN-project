import React from "react";
import { Modal } from "react-bootstrap";

const CustomersModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>Body</Modal.Body>
    </Modal>
  );
};

export default CustomersModal;
