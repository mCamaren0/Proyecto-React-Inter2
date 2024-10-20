// src/Layouts/EventComponent.tsx
import React from "react";
import EventList from "./EventListComponents";
import Navbar from "./NavBarComponent";

const EventComponent: React.FC = () => {
  return (
    <Navbar>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="col-span-2 row-span-5 col-start-4">
          <EventList />
        </div>
      </div>
    </Navbar>
  );
};

export default EventComponent;
