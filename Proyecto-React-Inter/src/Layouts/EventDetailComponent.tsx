// EventDetailComponent.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../Redux/store';
import Navbar from './NavBarComponent';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
}

const EventDetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const event = useSelector((state: RootState) =>
    id ? state.events.events.find((event: Event) => event.id === parseInt(id)) : undefined
  );

  if (!event) {
    return (
      <Navbar>
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Evento no encontrado</span>
          </div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-700 text-base mb-2"><strong>Descripción:</strong> {event.description}</p>
          <p className="text-gray-700 text-base"><strong>Fecha:</strong> {event.date}</p>
        </div>
      </div>
    </Navbar>
  );
};

export default EventDetailComponent;
