import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Niveis from "./pages/Niveis.jsx";

function App() {
  const [aluno, setAluno] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setAluno={setAluno} />} />
        <Route path="/niveis" element={<Niveis aluno={aluno} />} />
      </Routes>
    </Router>
  );
}

export default App;
