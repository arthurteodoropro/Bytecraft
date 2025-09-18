import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const ProfessorLogin: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      await api.loginProfessor(nome, senha); // <- corrigido
      alert("Login bem-sucedido!");
      navigate("/professor"); // ou tela de professor após login
    } catch (error: any) {
      alert("Erro no login: " + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2>Login Professor</h2>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default ProfessorLogin;
