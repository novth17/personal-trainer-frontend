import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import { Link, useLocation, Outlet } from "react-router-dom";



export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hien's Personal Trainer App
          </Typography>
          <Button
            component={Link}
            to="/home"
            color="inherit"
            variant={location.pathname === "/home" ? "outlined" : "text"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/customers"
            color="inherit"
            variant={location.pathname === "/customers" ? "outlined" : "text"}
          >
            Customers
          </Button>
          <Button
            component={Link}
            to="/trainings"
            color="inherit"
            variant={location.pathname === "/trainings" ? "outlined" : "text"}
          >
            Trainings
          </Button>
          <Button
            component={Link}
            to="/calendar"
            color="inherit"
            variant={location.pathname === "/calendar" ? "outlined" : "text"}
          >
            Calendar
          </Button>
          <Button
            component={Link}
            to="/statistics"
            color="inherit"
            variant={location.pathname === "/statistics" ? "outlined" : "text"}
          >
            Statistics
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
