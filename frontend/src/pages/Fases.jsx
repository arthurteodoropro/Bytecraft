// src/pages/Fases.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Fases.css";

function Fases({ nivel }) {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/niveis");
  };

  return (
    <div className="fases-container">
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={handleVoltar}>
        Voltar
      </button>

      <div className="fases-content">
        
      </div>

    </div>
  );
}

export default Fases;