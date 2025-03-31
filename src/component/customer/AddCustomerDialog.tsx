import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import { Customer } from "../../utils/types";
import { validateCustomer } from "../../utils/validation";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { fetchCustomerByPost } from "../../utils/fetch";

type AddCustomerProps = {
  fetchCustomer: () => void;
};

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const initialCustomer: Customer = {
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
    _links: undefined,
  };
  const [customer, setCustomer] = useState<Customer>({} as Customer);

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

    fetchCustomerByPost(customer)
      .then(() => props.fetchCustomer())
      .then(() => setCustomer(initialCustomer))
      .then(() => setOpen(false))
      .then(() => setSnackbarOpen(true))
      .catch((err) => console.error("Failed to add customer:", err));
  };

  return (
    <>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Customer
        </Button>
      </Box>
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
