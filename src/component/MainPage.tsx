import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#ffecf2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h3" fontWeight="bold">
          Welcome to FitTrack
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" maxWidth="600px">
          Manage your personal training customers and their workouts with ease. View training sessions on the calendar, export data, and more!
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/calendar")}
          >
            Go to Calendar
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/customers")}
          >
            View Customers
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
