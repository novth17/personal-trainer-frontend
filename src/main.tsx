import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import CustomersPage from "./component/customer/CustomersPage.tsx";
import TrainingsPage from "./component/training/TrainingsPage.tsx";
import Calendar from "./component/Calendar.tsx";
import MainPage from "./component/MainPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<MainPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="/calendar" element={<Calendar />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
