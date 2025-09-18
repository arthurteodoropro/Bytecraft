import React, { useState } from 'react';
import { api, ApiProfessor } from '../api/api';

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

      // ✅ Cadastra o professor (backend já cria e vincula a sala)
      const professor: ApiProfessor = await api.cadastrarProfessor(nome, senha, nomeTurma);

      // Acessa a sala vinculada retornada pelo backend
      const nomeSala = professor.sala?.nomeTurma ?? 'não disponível';
      const codigoSala = professor.sala?.codigo ?? 'não disponível';

      alert(
        `Cadastro realizado com sucesso!\nNome da Turma: ${nomeSala}\nCódigo da Sala: ${codigoSala}`
      );

      // Limpa campos
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
