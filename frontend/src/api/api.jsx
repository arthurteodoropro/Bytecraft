import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // backend Spring Boot
  headers: { "Content-Type": "application/json" },
});

// Login ou criação do aluno
export const loginAluno = async (apelido) => {
  const response = await API.post("/alunos/login", { apelido });
  return response.data; // retorna o objeto Aluno
};

// Buscar níveis
export const getNiveis = async () => {
  try {
    const response = await API.get("/alunos/niveis");
    return response.data; // retorna lista de níveis
  } catch (error) {
    console.error("Erro ao buscar níveis:", error);
    throw error;
  }
};

// Registrar nível selecionado
export const registrarNivel = async (apelido, nivel) => {
  try {
    const response = await API.post(`/alunos/${apelido}/registrarNivel`, { nivel });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar nível:", error);
    throw error;
  }
};
