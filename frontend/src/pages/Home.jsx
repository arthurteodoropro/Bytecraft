// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleAluno = () => {
    navigate("/aluno");
  };

  const handleProfessor = () => {
    navigate("/professor"); // Alterado para navegar para a página Professor
  };

  return (
    <div className="home-container">
      <div className="button-group">
        <button className="btn-professor" onClick={handleProfessor}>
          Professor
        </button>
        <button className="btn-aluno" onClick={handleAluno}>
          Aluno
        </button>
      </div>
    </div>
  );
}

export default Home;