import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isPriceCalculatedState, modalShowState, viewModeState } from "./atoms";
import CustomersModal from "./components/CustomersModal";

const SingleCustomer = (props) => {
  const [, setModalShow] = useRecoilState(modalShowState);
  const [, setViewMode] = useRecoilState(viewModeState);
  const [isPriceCalculated, setIsPriceCalculated] = useRecoilState(
    isPriceCalculatedState
  );

  const showDetailsHandler = () => {
    setModalShow(true);
    setViewMode("details");
    setIsPriceCalculated(false);

    console.log(props.customer._id);
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
  const [fetchedCustomers, setFetchedCustomers] = useState([]);
  const [modalShow, setModalShow] = useRecoilState(modalShowState);
  const [, setViewMode] = useRecoilState(viewModeState);
  const [isPriceCalculated, setIsPriceCalculated] = useRecoilState(
    isPriceCalculatedState
  );

  // get all customers
  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((response) => {
      setFetchedCustomers(response.data);
    });
  }, []);

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
        }}
      />
      <CustomersModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setViewMode("create");
        }}
      />
    </div>
  );
};

export default App;
