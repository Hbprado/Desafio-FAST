import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Colaboradores from './components/Colaboradores';
import Workshops from './components/Workshops';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import WorkshopDetails from './components/WorkshopDetails';
import AddWorkshop from './components/AddWorkshop';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetails />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-workshop" element={<AddWorkshop />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
