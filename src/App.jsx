import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path as needed

import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import EventManagement from './components/EventManagement';
import './app.css'

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
