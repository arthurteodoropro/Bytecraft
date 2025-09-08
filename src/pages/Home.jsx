// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="button-group">
        <button className="btn-professor">Professor</button>
        <button className="btn-aluno" onClick={() => navigate("/niveis")}>
          Aluno
        </button>
      </div>
    </div>
  );
}

export default Home;
