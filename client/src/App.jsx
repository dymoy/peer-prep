import './App.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';

function App() {
 return (

      <div>
          <Navigation />
          <Outlet />
      </div>
  );
}

export default App;