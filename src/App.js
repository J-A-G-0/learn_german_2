import logo from './logo.svg';
import TileGrid from './TileGrid';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './pages/Quiz';

// function App() {
//   return (
//     <div className='grid-container'>
//       <TileGrid />
//     </div>
//   );
// }

function Home() {
    return (
    <div className='grid-container'>
      <TileGrid />
    </div>
  );
}

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pages/Quiz" element={<Quiz />} />
          </Routes>
      </Router>
  );
}

export default App;
