import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import { Customer } from "../utils/types";
import { validateCustomer } from "../validation";

type AddCustomerProps = {
  fetchCustomer: () => void;
};
export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({} as Customer); //pretend it’s not null

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const addCustomer = () => {
    //input validation
    const error = validateCustomer(customer);
    if (error) {
      alert(error);
      return;
    }

    fetch(import.meta.env.VITE_CUSTOMER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error adding customer");
        return response.json();
      })
      .then(() => props.fetchCustomer())
      .then(() => setOpen(false))
      .then(() => setSnackbarOpen(true))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new customer</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            label="First Name"
            name="firstname"
            value={customer.firstname || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Last Name"
            name="lastname"
            value={customer.lastname || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Email"
            name="email"
            value={customer.email || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Street Address"
            name="streetaddress"
            value={customer.streetaddress || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="City"
            name="city"
            value={customer.city || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addCustomer()}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Customer added successfully!"
      />
    </>
  );
}
