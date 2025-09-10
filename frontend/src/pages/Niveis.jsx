// src/pages/Niveis.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNiveis, registrarNivel } from "../api/api.jsx";
import "./styles/Niveis.css";

function Niveis({ aluno }) {
  const navigate = useNavigate();
  const [niveis, setNiveis] = useState([]);

  useEffect(() => {
    const fetchNiveis = async () => {
      try {
        const data = await getNiveis();
        setNiveis(data);
      } catch (err) {
        console.error("Erro ao carregar níveis:", err);
      }
    };

    fetchNiveis();
  }, []);

  const selecionarNivel = async (nivel) => {
    try {
      const atualizado = await registrarNivel(aluno.apelido, nivel);
      alert(`Nível atualizado para ${atualizado.nivel}`);
      
      // Navegar para a tela de fases após selecionar o nível
      navigate("/fases", { state: { nivel: nivel } });
    } catch (err) {
      console.error("Erro ao atualizar nível:", err);
    }
  };

  // Função para aplicar a classe correta em cada botão
  const getClasseBotao = (nivel) => {
    // Converter para minúsculas e remover acentos para comparação
    const nivelNormalizado = nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (nivelNormalizado.includes("facil")) {
      return "btn-facil";
    } else if (nivelNormalizado.includes("medio")) {
      return "btn-medio";
    } else if (nivelNormalizado.includes("dificil")) {
      return "btn-dificil";
    }
    
    return "";
  };

  const handleVoltar = () => {
    navigate("/aluno");
  };

  return (
    <div className="niveis-container">
      {/* Botão Voltar */}
      <button className="btn-voltar" onClick={handleVoltar}>
        Voltar
      </button>

      <div className="button-group">
        {niveis.length > 0 ? (
          niveis.map((nivel) => (
            <button
              key={nivel}
              className={getClasseBotao(nivel)}
              onClick={() => selecionarNivel(nivel)}
            >
              {nivel}
            </button>
          ))
        ) : (
          <p>Carregando níveis...</p>
        )}
      </div>
    </div>
  );
}

export default Niveis;