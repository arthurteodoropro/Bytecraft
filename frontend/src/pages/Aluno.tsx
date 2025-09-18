import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno, vincularAlunoASala } from "../api/api";
import type { Aluno as AlunoType } from "../types";
import "./styles/Aluno.css";

interface AlunoProps {
  setAluno: (aluno: AlunoType) => void;
}

const Aluno: React.FC<AlunoProps> = ({ setAluno }) => {
  const navigate = useNavigate();
  const [apelido, setApelido] = useState("");
  const [codigoSala, setCodigoSala] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoltar = () => {
    navigate("/");
  };

  const handleComecar = async () => {
    try {
      setLoading(true);
      const apelidoParaEnviar = apelido.trim() || "Anônimo";
      
      // Faz login ou criação do aluno
      const alunoData = await loginAluno(apelidoParaEnviar);
      
      // Se código da sala informado, vincula aluno à sala
      if (codigoSala.trim()) {
        await vincularAlunoASala(apelidoParaEnviar, codigoSala.trim());
      }

      setAluno({
        apelido: alunoData.apelido,
        nivel: alunoData.nivel,
        turma: codigoSala.trim() || undefined,
      });
      
      navigate("/niveis");
    } catch (err) {
      alert("Erro no login ou vinculação: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleComecar();
    }
  };

  return (
    <div className="aluno-isolated-container">
      <button className="aluno-btn-voltar" onClick={handleVoltar}>
        <img src="src/assets/bottons/botao_voltar.png" alt="Voltar" />
      </button>
      <div className="aluno-content">
        <input
          type="text"
          placeholder="Seu apelido (opcional)..."
          value={apelido}
          onChange={(e) => setApelido(e.target.value)}
          className="aluno-apelido-input"
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Código da sala (opcional)..."
          value={codigoSala}
          onChange={(e) => setCodigoSala(e.target.value)}
          className="aluno-turma-input"
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button 
          className="aluno-btn-comecar" 
          onClick={handleComecar}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Começar'}
        </button>
      </div>
    </div>
  );
};

export default Aluno;
