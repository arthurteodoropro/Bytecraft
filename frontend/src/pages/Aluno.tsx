import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAluno} from "../api/api";
import type { Aluno as AlunoType } from "../types";
import "./styles/Aluno.css";

interface AlunoProps {
  setAluno: (aluno: AlunoType) => void;
}

const Aluno: React.FC<AlunoProps> = ({ setAluno }) => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [nomeTurma, setNomeTurma] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVoltar = () => {
    navigate("/");
  };

  const handleComecar = async () => {
    try {
      setLoading(true);
  
      if (!nome.trim()) {
        alert("Apelido é obrigatório");
        return;
      }
  
      if (!nomeTurma.trim()) {
        alert("Código da sala é obrigatório");
        return;
      }
  
      // Faz login + cadastro obrigatoriamente com apelido + sala
      const alunoData = await loginAluno(nome.trim(), nomeTurma.trim());
  
      setAluno({
        apelido: alunoData.apelido,
        nivel: alunoData.nivel,
        turma: nomeTurma.trim(),
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
        <div className="aluno-input-group">
          <label className="aluno-input-label">NOME</label>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="aluno-nome-input"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>
        
        <div className="aluno-input-group">
          <label className="aluno-input-label">NOME DA TURMA</label>
          <input
            type="text"
            placeholder="Digite o nome da turma..."
            value={nomeTurma}
            onChange={(e) => setNomeTurma(e.target.value)}
            className="aluno-turma-input"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>
        
        <button 
          className="aluno-btn-comecar" 
          onClick={handleComecar}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'COMEÇAR'}
        </button>
      </div>
    </div>
  );
};

export default Aluno;