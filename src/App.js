import React from 'react';
import Navbar from './components/navbar/navbar';
import Router from './router/router';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';




function App() {

  return (
    <div className="App">
      <Navbar />

      <Router />
    </div>
  );
}

export default App;
