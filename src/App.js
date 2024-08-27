import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard'; 
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './services/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />               
                 </Routes>
            </AuthProvider>
            <ToastContainer />
        </Router>
    );
}

export default App;
