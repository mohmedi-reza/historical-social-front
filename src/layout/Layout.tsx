import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout: React.FC = () => {
  const location = useLocation();
  const selectedStepId = new URLSearchParams(location.search).get("event");
  const { eventId } = useParams<{ eventId?: string }>();

  return (
    <div className="max-h-screen max-w-screen h-screen w-screen flex ">
      <Sidebar eventId={selectedStepId || eventId} />
      <div className="flex flex-col flex-grow justify-center pt-4 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
