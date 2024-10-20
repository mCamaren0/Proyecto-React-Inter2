import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBarComponent';
import { motion } from 'framer-motion';

const HomeComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/registrar-evento');
  };

  return (
    <Navbar>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 text-center text-indigo-700"
        >
          Bienvenido a EventApp
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Tu puerta de entrada a experiencias y conexiones inolvidables
        </motion.p>

      

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-700 mb-4">
            ¿Listo para explorar o crear tu próximo evento?
          </p>
          <button 
            onClick={handleNavigate}
            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Registrar Evento
          </button>
        </motion.div>
      </div>
    </Navbar>
  );
};

export default HomeComponent;