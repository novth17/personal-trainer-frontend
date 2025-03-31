import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Customer } from "../../utils/types";
import { fetchTrainingByPost } from "../../utils/fetch";

type Props = {
  customer: Customer;
  onTrainingAdded: () => void;
};

export default function AddTrainingDialog({ customer, onTrainingAdded }: Props) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTraining = () => {
    if (!activity || !duration || !date) {
      alert("Please fill all fields!");
      return;
    }

    const newTraining = {
      date: date.toISOString(),
      activity,
      duration: Number(duration),
      customer: customer._links.customer.href,
    };

    fetchTrainingByPost(newTraining)
      .then(() => onTrainingAdded())
      .then(() => setOpen(false))
      .then(() => {
        setActivity("");
        setDuration("");
        setDate(dayjs());
      })
      .then(() => setSnackbarOpen(true))
      .catch((err) => console.error("Failed to add training:", err));
  };

  return (
    <>
      <IconButton
        aria-label="add training"
        size="small"
        onClick={handleClickOpen}
        sx={{
          color: "#2e7d32",
          "&:hover": {
            backgroundColor: "#e8f5e9",
          },
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training for {customer.firstname}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box mt={1} mb={1}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </Box>
          </LocalizationProvider>
          <TextField
            required
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <TextField
            required
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addTraining()} variant="contained">
            Save
          </Button>
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
