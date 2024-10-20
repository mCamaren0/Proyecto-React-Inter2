// src/Layouts/EventListComponents.tsx
import React , {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { fetchEvents, selectEvent } from '../Redux/eventSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  createdBy: number;
}

const EventList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, loading, error } = useSelector((state: RootState) => state.events);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [showAlert, setShowAlert] = useState(false);
    
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  

    const totalPages = Math.ceil(events.length / eventsPerPage);
    const handlePageChange = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };
    const handleEventsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setEventsPerPage(Number(e.target.value));
      setCurrentPage(1); 
    };

    useEffect(() => {
      dispatch(fetchEvents());
    }, [dispatch]);
  
    const handleSelectEvent = (event: Event) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
    };
  

    const handleSelectEventSubs = (event: Event) => {
      dispatch(selectEvent(event));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
    };
  
    if (loading) {
      return <div>Cargando eventos...</div>;
    }
  
    if (error) {
      return <div>Error al cargar eventos: {error}</div>;
    }
  
    return (
      <div>
        {showAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Se ha agregado exitosamente a la lista de suscripciones, por favor confirme la suscripcion desde el perfil del usuario.
          </div>
        )}
    
      <div>
         <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center w-full">Lista de Eventos</h2>
     
      </div>
      {events.length === 0 ? (
          <div className="text-center text-gray-500">No se encontraron eventos.</div>
        ) : (
          <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentEvents.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
            {/* <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-gray-500 mb-4">{new Date(event.date).toLocaleDateString()}</p> */}
            <button
              onClick={() => handleSelectEvent(event)}
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded mb-2 mr-2"
            >
               <FontAwesomeIcon icon={faEye} />
            </button>
     
            <button
              onClick={() => handleSelectEventSubs(event)}
              className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded">
              Suscribir
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
         <select
          value={eventsPerPage}
          onChange={handleEventsPerPageChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={4}>4 de {events.length}</option>
          <option value={8}>8 de {events.length}</option>
          <option value={12}>12 de {events.length}</option>
          <option value={16}>16 de {events.length}</option>
        </select>
      </div>
    </div>
      )}
    </div>
    {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Detalles del Evento</h2>
            <h3 className="text-xl font-semibold mb-2">{selectedEvent.name}</h3>
            <p className="text-gray-700 mb-2">{selectedEvent.description}</p>
            <p className="text-gray-500 mb-4">{new Date(selectedEvent.date).toLocaleDateString()}</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
    );
  };
  
  export default EventList;