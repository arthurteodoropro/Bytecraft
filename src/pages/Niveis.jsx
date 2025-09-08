// src/pages/Niveis.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Niveis.css";

function Niveis() {
  const navigate = useNavigate();

  return (
    <div className="niveis-container">
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar
      </button>

      {/* Botões de níveis */}
      <div className="button-group">
        <button className="btn-facil">Fácil</button>
        <button className="btn-medio">Médio</button>
        <button className="btn-dificil">Difícil</button>
      </div>
    </div>
  );
}

export default Niveis;
