import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Aluno from "./pages/Aluno.jsx";
import Professor from "./pages/Professor.jsx";
import Niveis from "./pages/Niveis.jsx";
import Fases from "./pages/Fases.jsx"; // Importar a nova página

function App() {
  const [aluno, setAluno] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aluno" element={<Aluno setAluno={setAluno} />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/niveis" element={<Niveis aluno={aluno} />} />
        <Route path="/fases" element={<Fases />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;