import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalShowState, viewModeState } from "./atoms";
import CustomersModal from "./components/CustomersModal";

const App = () => {
  const [fetchedCustomers, setFetchedCustomers] = useState([]);
  const [modalShow, setModalShow] = useRecoilState(modalShowState);
  const [, setViewMode] = useRecoilState(viewModeState);

  // get all customers
  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((response) => {
      setFetchedCustomers(response.data);
    });
  }, []);

  const showDetailsHandler = () => {
    setModalShow(true);
    setViewMode("details");
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
        <tbody>
          {fetchedCustomers.map((customer, index) => {
            return (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.lastname}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>
                <td>{customer.birthdate}</td>
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
          })}
        </tbody>
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
