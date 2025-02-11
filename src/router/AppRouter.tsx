import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EventDetail from "../pages/EventDetail";
import MainPage from "../pages/MainPage";
import Layout from "../layout/Layout";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="event/:eventId/:subEventId" element={<EventDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
