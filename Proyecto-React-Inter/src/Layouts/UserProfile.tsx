import React, { useEffect, useState } from 'react';
import Navbar from '../Layouts/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/store';
import { enrollInEvents, clearSelectedEvents, updatedSelectedEvents } from '../Redux/eventSlice';
import { fetchUserEvents, updateUserEvents } from '../Redux/userSlice';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userEvents = useSelector((state: RootState) => state.user.events);
  const selectedEvents = useSelector((state: RootState) => state.events.selectedEvents);
  const userId: string | undefined = useSelector((state: RootState) => state.user.user?.id);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const [showAlert, setShowAlert] = useState(false);
  const [showErrAlert, setShowErrAlert] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserEvents(parseInt(userId)));
    }
  }, [dispatch, userId]);

  const handleSaveInscriptions = async () => {
    if (userId) {
      const eventIds = selectedEvents.map(event => event.id);
      try {
        await dispatch(enrollInEvents({ userId: parseInt(userId), eventIds }));
        
        const updatedUserEvents = [...userEvents, ...selectedEvents];
        dispatch(updateUserEvents(updatedUserEvents));
        
        dispatch(clearSelectedEvents());
        
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        console.error('Error al guardar inscripciones:', error);
        setShowErrAlert(true);
        setTimeout(() => setShowErrAlert(false), 3000);
      }
    } else {
      console.error('User ID is undefined');
    }
  };

  const handleRemoveEvent = (eventId: number) => {
    const updatedEvents = selectedEvents.filter(event => event.id !== eventId);
    dispatch(updatedSelectedEvents(updatedEvents));
  };

  if (loading) {
    return (
      <Navbar>
        {showAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Inscripciones guardadas exitosamente.
          </div>
        )}
        {showErrAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Error al guardar inscripciones. Por favor, intente de nuevo.
          </div>
        )}
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Navbar>
    );
  }

  if (error) {
    return (
      <Navbar>
        {showAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Inscripciones guardadas exitosamente.
          </div>
        )}
        {showErrAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Error al guardar inscripciones. Por favor, intente de nuevo.
          </div>
        )}
        <div className="container mx-auto p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        </div>
      </Navbar>
    );
  }

  return (
    <Navbar>
      {showAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Inscripciones guardadas exitosamente.
          </div>
        )}
        {showErrAlert && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            Error al guardar inscripciones. Por favor, intente de nuevo.
          </div>
        )}

      
      <div className="container mx-auto p-4 max-w-4xl">
        <h2 className="text-center text-3xl font-bold mb-8 text-indigo-700">Bienvenido</h2>

        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="sm:flex sm:items-center px-6 py-4">
        <img 
          className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 sm:h-32 rounded-full"
          src="https://st2.depositphotos.com/58455982/51073/v/450/depositphotos_510736672-stock-illustration-man-avatar-character-vector-illustration.jpg"
          alt="User Avatar"
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <p className="text-xl leading-tight font-bold text-gray-900">
            {userInfo.user?.username || 'Usuario'}
          </p>
          <p className="text-sm leading-tight text-gray-600">
            {userInfo.user?.email || 'correo@ejemplo.com'}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Miembro desde</span>
          <span className="text-gray-900 font-semibold">Enero 2023</span>
        </div>
      </div>
    </div>



        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Eventos Seleccionados</h3>
          {selectedEvents.length > 0 ? (
            <ul className="space-y-4">
              {selectedEvents.map((event) => (
                <li key={event.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                  <div>
                    <span className="font-medium">{event.name}</span>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveEvent(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay eventos seleccionados.</p>
          )}
          {selectedEvents.length > 0 && (
            <button
              onClick={handleSaveInscriptions}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300"
            >
              Guardar Inscripciones
            </button>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Eventos Inscritos</h3>
          {userEvents.length > 0 ? (
            <ul className="space-y-4">
              {userEvents.map((event) => (
                <li key={event.id} className="bg-gray-50 p-4 rounded-md">
                  <span className="font-medium">{event.name}</span>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No hay eventos inscritos.</p>
          )}
        </div>
      </div>
    </Navbar>
  );
};

export default UserProfile;