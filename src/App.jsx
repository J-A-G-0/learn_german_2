import TileGrid from './TileGrid';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Home from './pages/Home';
import { useState } from 'react';
import CarouselHomepage from './pages/NewHomepage';
import NewHomepage from './pages/NewHomepage';

function App() {
  return (
      <Router basename="/learn_german_2">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pages/Quiz" element={<Quiz />} />
              <Route path="/pages/NewHomepage" element={<NewHomepage />} />
          </Routes>
      </Router>
  );
}

export default App;
