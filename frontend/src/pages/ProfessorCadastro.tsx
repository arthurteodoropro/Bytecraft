import React, { useState } from 'react';
import { api, ApiProfessor, ApiSala } from '../api/api';

const ProfessorCadastro: React.FC = () => {
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
    } catch (error: any) {
      alert('Erro ao cadastrar: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Cadastro de Professor</h2>
      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        disabled={loading}
      />
      <input
        placeholder="Senha"
        type="password"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        disabled={loading}
      />
      <input
        placeholder="Nome da Turma"
        value={nomeTurma}
        onChange={e => setNomeTurma(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleCadastro} disabled={loading}>
        {loading ? 'Carregando...' : 'Cadastrar'}
      </button>
    </div>
  );
};

export default ProfessorCadastro;
