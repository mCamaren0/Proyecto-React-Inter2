import React, { useState } from "react";
import Navbar from "../Layouts/NavBarComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/store";
import { registerEvent, fetchEvents } from "../Redux/eventSlice";

interface EventData {
  name: string;
  description: string;
  date: string;
  createdBy: number;
}

interface FormState {
  name: string;
  description: string;
  date: string;
}

const RegisterEventComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
    date: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      const eventData: EventData = {
        ...formState,
        createdBy: parseInt(userId),
      };
      await dispatch(registerEvent(eventData));
      dispatch(fetchEvents());
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setFormState({ name: "", description: "", date: "" }); 
    }
  };

  return (
    <Navbar>
      {showAlert && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          Evento registrado exitosamente.
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre del Evento:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formState.date}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Registrar Evento
        </button>
      </form>
    </Navbar>
  );
};

export default RegisterEventComponent;