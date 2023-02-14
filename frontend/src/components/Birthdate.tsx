import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  customerBirthdateState,
  editCustomersDetailsState,
  viewModeState,
} from "../atoms";

const BirthdatePicker = () => {
  const [birthdate, setBirthdate] = useRecoilState(customerBirthdateState);
  const [editCustomersDetails, setEditCustomersDetails] = useRecoilState(
    editCustomersDetailsState
  );
  const viewMode = useRecoilValue(viewModeState);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {viewMode === "create" && (
        <DatePicker
          inputFormat="DD.MM.YYYY."
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
          inputFormat="DD.MM.YYYY."
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
