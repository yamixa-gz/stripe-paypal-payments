import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home/Home';
import Success from "./pages/Success/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
