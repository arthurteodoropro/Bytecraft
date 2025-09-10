// src/pages/Professor.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Professor.css";

function Professor() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="professor-container">
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={handleVoltar}>
        Voltar
      </button>

      <div className="professor-content">
        
        {/* Espaço para futuros componentes */}
        <div className="professor-options">
          {/* Opções serão adicionadas aqui posteriormente */}
        </div>
      </div>
    </div>
  );
}

export default Professor;