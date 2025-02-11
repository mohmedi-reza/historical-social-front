import React from "react";
import Timeline from "../components/Timeline";
import WorldMapComponent from "../components/WorldMap";
import { Events } from "../const/SubEvents";

const MainPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 no-scrollbar">
      <WorldMapComponent />
      <Timeline steps={Events} />
    </div>
  );
};

export default MainPage;
