import React, { useEffect, useState } from "react";
import { getNiveis, registrarNivel } from "../api/api.jsx";

function Niveis({ aluno }) {
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
    } catch (err) {
      console.error("Erro ao atualizar nível:", err);
    }
  };

  return (
    <div>
      <h2>Olá, {aluno?.apelido}</h2>
      <h3>Escolha um nível:</h3>
      <div>
        {niveis.length > 0 ? (
          niveis.map((nivel) => (
            <button key={nivel} onClick={() => selecionarNivel(nivel)}>
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
