import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from "./Layouts/LoginComponent";
import HomeComponent from "./Layouts/HomeComponent";
import NotfoundComponent from "./Layouts/NotFoundComponent";
import ProtectedRoute from "./Component/ProtectedRoute";
import EventComponent from './Layouts/EventComponent';
import EventListComponent from './Layouts/EventListComponents';
import EventDetailComponent from './Layouts/EventDetailComponent';
import RegisterEventComponent from './Layouts/RegisterEventComponent';
import UserProfile from './Layouts/UserProfile'; // Importa el componente de perfil de usuario

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomeComponent /></ProtectedRoute>} />
        <Route path="/inicio" element={<ProtectedRoute><HomeComponent /></ProtectedRoute>} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/eventos" element={<ProtectedRoute><EventComponent /></ProtectedRoute>} />
        <Route path="/eventos/lista" element={<ProtectedRoute><EventListComponent /></ProtectedRoute>} />
        <Route path="/evento/:id" element={<EventDetailComponent />} />
        <Route path="/registrar-evento" element={<ProtectedRoute><RegisterEventComponent /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="*" element={<NotfoundComponent />} />
      </Routes>
    </Router>
  );
};

export default App;