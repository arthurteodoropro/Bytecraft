import React, { useState } from 'react';
import { api, ApiProfessor, ApiSala } from '../api/api';
import { useNavigate } from "react-router-dom";
import "./styles/ProfessorCadastro.css";

const ProfessorCadastro: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeTurma, setNomeTurma] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !senha || !nomeTurma) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Cria a sala
      const sala: ApiSala = await api.cadastrarSala(nomeTurma);

      // 2️⃣ Cadastra o professor usando o id da sala
      const professor: ApiProfessor = await api.cadastrarProfessor(
        nome,
        senha,
        sala.id
      );

      alert(
        `Cadastro realizado!\nProfessor: ${professor.nomeDeUsuario}\nTurma: ${sala.nomeTurma}\nCódigo: ${sala.codigo}`
      );

      setNome('');
      setSenha('');
      setNomeTurma('');
      
      // Redireciona para a página de login após cadastro bem-sucedido
      navigate("/professor");
    } catch (error: any) {
      alert('Erro ao cadastrar: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigate("/professor");
  };

  <button className="professor-cadastro-btn-voltar" onClick={handleVoltar}>
    <img src="src/assets/bottons/botao_voltar.png" alt="Voltar" />
  </button>

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCadastro();
    }
  };

  return (
    <div className="professor-cadastro-isolated-container">
      <button className="professor-cadastro-btn-voltar" onClick={handleVoltar}>
        <img src="src/assets/bottons/botao_voltar.png" alt="Voltar" />
      </button>

      <div className="professor-cadastro-content">
        <div className="professor-cadastro-input-group">
          <label className="professor-cadastro-input-label">NOME</label>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="professor-cadastro-nome-input"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>

        <div className="professor-cadastro-input-group">
          <label className="professor-cadastro-input-label">SENHA</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={e => setSenha(e.target.value)}
            className="professor-cadastro-senha-input"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>

        <div className="professor-cadastro-input-group">
          <label className="professor-cadastro-input-label">NOME DA TURMA</label>
          <input
            type="text"
            placeholder="Digite o nome da turma..."
            value={nomeTurma}
            onChange={e => setNomeTurma(e.target.value)}
            className="professor-cadastro-turma-input"
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </div>

        <button 
          className="professor-cadastro-btn-cadastrar" 
          onClick={handleCadastro} 
          disabled={loading}
        >
          {loading ? 'CARREGANDO...' : 'CADASTRAR'}
        </button>
      </div>
    </div>
  );
};

export default ProfessorCadastro;