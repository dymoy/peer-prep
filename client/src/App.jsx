import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
