import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import SignDocument from './pages/SignDocument';
import PreviewDocument from './pages/PreviewDocument';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        <Route path="/upload" element={<ProtectedRoute> <UploadDocument /></ProtectedRoute>} />
        <Route path="/sign/:id" element={<ProtectedRoute><SignDocument /></ProtectedRoute>} />
        <Route path="/preview/:id" element={<ProtectedRoute> <PreviewDocument /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
