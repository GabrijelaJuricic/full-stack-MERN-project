import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import {
  customerDetailsState,
  deleteCustomerState,
  isPriceCalculatedState,
  modalShowState,
  newCustomerState,
  updatedCustomerState,
  viewModeState,
} from "./atoms";
import CustomersModal from "./components/CustomersModal";

const SingleCustomer = (props) => {
  const [, setModalShow] = useRecoilState(modalShowState);
  const [, setViewMode] = useRecoilState(viewModeState);
  const [, setIsPriceCalculated] = useRecoilState(isPriceCalculatedState);
  const [, setCustomerDetails] = useRecoilState(customerDetailsState);

  const showDetailsHandler = () => {
    setModalShow(true);
    setViewMode("details");
    setIsPriceCalculated(false);

    // get customer by id
    axios
      .get(`http://localhost:4000/customers/details/${props.customer._id}`)
      .then((customer) => {
        setCustomerDetails(customer.data);
      });
  };
  return (
    <tr>
      <td>{props.customer.name}</td>
      <td>{props.customer.lastname}</td>
      <td>{props.customer.email}</td>
      <td>{props.customer.city}</td>
      <td>{props.customer.birthdate}</td>
      <td>
        <input
          className="btn btn-light float-end"
          type="button"
          value="Details"
          onClick={showDetailsHandler}
        />
      </td>
    </tr>
  );
};

const App = () => {
  const [modalShow, setModalShow] = useRecoilState(modalShowState);
  const [fetchedCustomers, setFetchedCustomers] = useState([]);
  const [, setViewMode] = useRecoilState(viewModeState);
  const newCustomer = useRecoilValue(newCustomerState);
  const deleteCustomer = useRecoilValue(deleteCustomerState);
  const customerDetails = useRecoilValue(customerDetailsState);
  const updatedCustomer = useRecoilValue(updatedCustomerState);

  // get all customers
  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((response) => {
      setFetchedCustomers(response.data);
    });
  }, [newCustomer, deleteCustomer, updatedCustomer]);

  // function to display customer list
  const customerList = () => {
    return fetchedCustomers.map((customer, index) => {
      return <SingleCustomer customer={customer} key={index} />;
    });
  };

  return (
    <div className="container" style={{ width: 900 }}>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>City</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>{customerList()}</tbody>
      </table>
      <input
        className="btn btn-primary float-end"
        type="button"
        value="Add New Customer"
        onClick={() => {
          setModalShow(true);
          setViewMode("create");
        }}
      />
      <CustomersModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </div>
  );
};

export default App;
