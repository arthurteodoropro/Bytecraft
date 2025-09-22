import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import "./styles/Professor.css";

const Professor: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await api.loginProfessor(nome, senha);
      alert("Login bem-sucedido!");
      navigate("/professor/dashboard");
    } catch (error: any) {
      alert("Erro no login: " + (error.response?.data || error.message));
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  const irParaCadastro = () => {
    navigate("/professor/cadastro");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="professor-isolated-container">
      <button className="professor-btn-voltar" onClick={handleVoltar}>
        <img src="src/assets/bottons/botao_voltar.png" alt="Voltar" />
      </button>

      <div className="professor-content">
        <div className="professor-input-group">
          <label className="professor-input-label">NOME</label>
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="professor-nome-input"
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="professor-input-group">
          <label className="professor-input-label">SENHA</label>
          <input
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="professor-senha-input"
            onKeyPress={handleKeyPress}
          />
        </div>

        <button className="professor-btn-entrar" onClick={handleLogin}>
          ENTRAR
        </button>

        <button className="professor-btn-cadastrar" onClick={irParaCadastro}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
};

export default Professor;