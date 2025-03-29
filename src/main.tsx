import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import CustomersPage from "./component/CustomersPage";
import TrainingsPage from "./component/TrainingsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/customers" />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
