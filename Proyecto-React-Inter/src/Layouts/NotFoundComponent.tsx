/*import Navbar from "./NavBarComponent";
import { Link } from 'react-router-dom';*/

function NotfoundComponent() {
  return (
    //<Navbar>
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-9xl font-bold text-purple-400 animate-bounce">
                404
              </h1>
              <p className="text-2xl font-bold text-gray-800 mt-4">
                ¡Ups! Página no encontrada
              </p>
              <p className="text-gray-600 mt-2 mb-6">
                Parece que te has perdido en el ciberespacio...
              </p>
            </div>
            <div className="mt-6 flex justify-center items-center space-x-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              <div className="text-lg font-semibold text-gray-700">
                Buscando tu página...
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    //</Navbar>
  );
}

export default NotfoundComponent;