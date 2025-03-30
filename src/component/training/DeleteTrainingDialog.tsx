import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";
import { Training } from "../../utils/types";

type DeleteTrainingDialogProps = {
  training: Training | null;
  onCancel: () => void;
  onDelete: () => void;
};

export default function DeleteTrainingDialog({
  training,
  onCancel,
  onDelete,
}: DeleteTrainingDialogProps) {
  return (
    <Dialog open={!!training} onClose={onCancel}>
      <DialogTitle> Delete Training</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{training?.activity}</strong>?
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
