import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import CustomersPage from "./component/customer/CustomersPage.tsx";
import TrainingsPage from "./component/training/TrainingsPage.tsx";
import Calendar from "./component/Calendar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/customers" />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="/calendar" element={<Calendar />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
