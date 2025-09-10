// src/pages/Aluno.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno } from "../api/api.jsx";
import "./styles/Aluno.css";

function Aluno({ setAluno }) {
  const navigate = useNavigate();
  const [apelido, setApelido] = useState("");
  const [turma, setTurma] = useState("");

  const handleComecar = async () => {
    try {
      // Se não houver apelido, usar um valor padrão
      const apelidoParaEnviar = apelido.trim() || "Anônimo";
      
      const aluno = await loginAluno(apelidoParaEnviar);
      setAluno(aluno);
      navigate("/niveis");
    } catch (err) {
      alert("Erro no login: " + err.message);
    }
  };

  return (
    <div className="aluno-container">
      <button className="btn-voltar" onClick={() => navigate("/")}>
        Voltar
      </button>

      <div className="aluno-content">
        <h2>Digite seus dados</h2>
        
        <input
          type="text"
          placeholder="Seu apelido (opcional)..."
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
          className="apelido-input"
          onKeyPress={(e) => e.key === 'Enter' && handleComecar()}
        />
        
        <input
          type="text"
          placeholder="Sua turma (opcional)..."
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          className="turma-input"
          onKeyPress={(e) => e.key === 'Enter' && handleComecar()}
        />
        
        <button className="btn-comecar" onClick={handleComecar}>
          Começar
        </button>
      </div>
    </div>
  );
}

export default Aluno;