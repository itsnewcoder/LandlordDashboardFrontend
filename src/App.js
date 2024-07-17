import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<PropertyList />} />
            <Route path="/add" element={<PropertyForm />} />
            <Route path="/edit/:id" element={<PropertyForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;