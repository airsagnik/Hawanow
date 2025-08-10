import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import WeatherHome from './pages/WeatherHome';
import SideNav from './components/SideNav';
import WeatherProvider from './business-logic/context-providers/weatherContexProvidert';
import SavedLocation from './pages/SavedLocations';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <WeatherProvider>
      <Routes element={<SideNav />}>
        <Route path='/' element={
          <WeatherHome />
        } />
      </Routes>
      <Routes element={<SideNav />}>
        <Route path='/location' element={
          <SavedLocation />
        } />
      </Routes>
    </WeatherProvider>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
