import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Customer } from "../../utils/types";
import { validateCustomer } from "../../utils/validation";
import Snackbar from "@mui/material/Snackbar";

type EditCustomerProps = {
  open: boolean; //whether the dialog is open or closed
  customer: Customer | null; // customer object that you want to edit
  onClose: () => void; //close when cxl or outside box
  onSave: () => void; //success PUT request
};

export default function EditCustomer({
  open,
  customer,
  onClose,
  onSave,
}: EditCustomerProps) {
  const [editedCustomer, setEditedCustomer] = useState<Customer>(
    {} as Customer
  ); //pretend it’s not null
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  //prefill the form
  useEffect(() => {
    if (customer) setEditedCustomer(customer);
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    //input validation
    const error = validateCustomer(editedCustomer);
    if (error) {
      alert(error);
      return;
    }

    if (!customer?._links?.customer.href) {
      console.error("Missing customer link for update");
      return;
    }

    fetch(customer?._links?.customer.href, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCustomer),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update customer");
        return response.json();
      })
      .then(() => {
        onSave();
        setSnackbarOpen(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            label="First Name"
            name="firstname"
            value={editedCustomer.firstname || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Last Name"
            name="lastname"
            value={editedCustomer.lastname || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Email"
            name="email"
            value={editedCustomer.email || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Phone"
            name="phone"
            value={editedCustomer.phone || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Street Address"
            name="streetaddress"
            value={editedCustomer.streetaddress || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="Postcode"
            name="postcode"
            value={editedCustomer.postcode || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            label="City"
            name="city"
            value={editedCustomer.city || ""}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => handleSave()}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Customer updated successfully!"
      />
    </>
  );
}
