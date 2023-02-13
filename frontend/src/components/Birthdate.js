import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  customerBirthdateState,
  customerDetailsState,
  editCustomersDetailsState,
  viewModeState,
} from "../atoms";
import { TextField } from "@mui/material";

const BirthdatePicker = () => {
  const [birthdate, setBirthdate] = useRecoilState(customerBirthdateState);
  const [customerDetails, setCustomerDetails] =
    useRecoilState(customerDetailsState);
  const [editCustomersDetails, setEditCustomersDetails] = useRecoilState(
    editCustomersDetailsState
  );
  const viewMode = useRecoilValue(viewModeState);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {viewMode === "create" && (
        <DatePicker
          inputFormat="MM/DD/YYYY"
          label="Birthdate"
          value={birthdate}
          onChange={(newValue) => {
            setBirthdate(newValue);
          }}
          renderInput={(params) => (
            <TextField style={{ marginTop: 30 }} fullWidth {...params} />
          )}
        />
      )}
      {viewMode === "edit" && (
        <DatePicker
          inputFormat="MM/DD/YYYY"
          label="Birthdate"
          value={editCustomersDetails.birthdate}
          onChange={(newValue) =>
            setEditCustomersDetails({
              ...editCustomersDetails,
              birthdate: newValue,
            })
          }
          renderInput={(params) => (
            <TextField style={{ marginTop: 30 }} fullWidth {...params} />
          )}
        />
      )}
    </LocalizationProvider>
  );
};
export default BirthdatePicker;
