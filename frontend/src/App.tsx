import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/pages/authen/login';
import Register from './components/pages/authen/register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
