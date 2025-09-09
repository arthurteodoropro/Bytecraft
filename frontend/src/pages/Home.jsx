import React from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno } from "../api/api.jsx";

function Home({ setAluno }) {
  const navigate = useNavigate();

  const handleAluno = async () => {
    try {
      // Aqui você pode pedir um apelido ou gerar padrão
      const apelido = prompt("Digite seu apelido:");
      if (!apelido) return;

      const aluno = await loginAluno(apelido);
      setAluno(aluno);
      navigate("/niveis");
    } catch (err) {
      alert("Erro no login: " + err.message);
    }
  };

  const handleProfessor = () => {
    alert("Tela do Professor ainda não implementada");
  };

  return (
    <div>
      <h2>Bem-vindo ao ByteCraft</h2>
      <button onClick={handleProfessor}>Professor</button>
      <button onClick={handleAluno}>Aluno</button>
    </div>
  );
}

export default Home;
