// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Niveis from "./pages/Niveis";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/niveis" element={<Niveis />} />
      </Routes>
    </Router>
  );
}

export default App;
