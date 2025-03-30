import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Customer } from "../../utils/types";

type Props = {
  customer: Customer;
  onTrainingAdded: () => void;
};

export default function AddTrainingDialog({ customer, onTrainingAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSave = async () => {
    if (!activity || !duration || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTraining = {
      date: date.toISOString(),
      activity,
      duration: Number(duration),
      customer: customer._links.customer.href,
    };

    try {
      const response = await fetch(import.meta.env.VITE_TRAINING_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTraining),
      });

      if (!response.ok) throw new Error("Error adding training");

      setSnackbarOpen(true);
      onTrainingAdded();
      setOpen(false);
      setActivity("");
      setDuration("");
      setDate(dayjs());
    } catch (err) {
      console.error("Failed to save training:", err);
    }
  };

  return (
    <>
      <IconButton
        aria-label="add training"
        size="small"
        onClick={() => setOpen(true)}
        sx={{
          color: "#2e7d32",
          "&:hover": {
            backgroundColor: "#e8f5e9",
          },
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Training for {customer.firstname}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Duration (minutes)"
            fullWidth
            type="number"
            variant="standard"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Training added successfully!"
      />
    </>
  );
}
