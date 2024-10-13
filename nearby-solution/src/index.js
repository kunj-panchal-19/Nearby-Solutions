import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';
import ContextAuth from './context/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextAuth>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route path="*" element={<App />} />

      </Routes>
    </ContextAuth>
  </BrowserRouter>
  // </React.StrictMode>
);


