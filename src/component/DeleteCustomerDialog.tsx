import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import type { Customer } from "../utils/types";

type DeleteCustomerDialogProps = {
  customer: Customer | null;
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteCustomerDialog({
  customer,
  onCancel,
  onDelete,
}: DeleteCustomerDialogProps) {
  return (
    <Dialog open={!!customer} onClose={onCancel}>
      <DialogTitle>Delete Customer</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{" "}
          <strong>
            {customer?.firstname} {customer?.lastname}
          </strong>
          ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
