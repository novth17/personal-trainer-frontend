import { useState } from "react";
import CustomersPage from "./component/CustomersPage";
import TrainingsPage from "./component/TrainingsPage";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";

export default function App() {
  const [page, setPage] = useState<"customers" | "trainings">("customers");

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* your app content here */}

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Hien's Personal Trainer App
            </Typography>
            <Button
              color="inherit"
              onClick={() => setPage("customers")}
              variant={page === "customers" ? "outlined" : "text"}
              // if the current page is "customers" → use "outlined" style, else just text
            >
              Customers
            </Button>
            <Button
              color="inherit"
              onClick={() => setPage("trainings")}
              variant={page === "trainings" ? "outlined" : "text"}
            >
              Trainings
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          {page === "customers" && <CustomersPage />}
          {page === "trainings" && <TrainingsPage />}
        </Container>
      </ThemeProvider>
    </>
  );
}
