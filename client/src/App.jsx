import './App.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import Navigation from './pages/Navigation';
import Footer from './pages/Footer';

function App() {
 return (

  <div>
    <Header />
      <Navigation />
      <Outlet />
      <Footer />  
      </div>
  );
}

export default App;