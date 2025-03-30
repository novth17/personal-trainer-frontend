import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteTrainingDialog = ({ open, onClose, onConfirm }: Props) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Are you sure you want to delete this training?</DialogTitle>
    <DialogActions>
      <Button onClick={onClose}>No</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteTrainingDialog;
