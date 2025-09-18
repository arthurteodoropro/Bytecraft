import { useNavigate } from "react-router-dom";
import "./styles/Professor.css";

const Professor: React.FC = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };

  const irParaCadastro = () => {
    navigate("/professor/cadastro");
  };

  const irParaLogin = () => {
    navigate("/professor/login");
  };

  return (
    <div className="professor-isolated-container">
      <button className="professor-btn-voltar" onClick={handleVoltar}>
        <img src="src/assets/buttons/botao_voltar.png" alt="Voltar" />
      </button>

      <div className="professor-content">
        <h2>Área do Professor</h2>
        <div className="professor-options">
          <button onClick={irParaCadastro}>Cadastrar Professor</button>
          <button onClick={irParaLogin}>Login Professor</button>
        </div>
      </div>
    </div>
  );
};

export default Professor;
