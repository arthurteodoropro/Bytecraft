const API_BASE_URL = 'http://localhost:8080/api'; // endereço completo do backend

export interface ApiAluno {
  apelido: string;
  nivel?: string;
  turma?: string;
}

export interface ApiSala {
  id: number;
  nomeTurma: string;
  codigo: number; // JS não tem byte, usamos number
}

export interface ApiProfessor {
  nomeDeUsuario: string;
  senha?: string;
  nomeTurma?: string;
  sala?: ApiSala; // sala vinculada criada pelo backend
}

// ===== ALUNO =====
export const loginAluno = async (apelido: string, codigoSala: string): Promise<ApiAluno> => {
  const response = await fetch(`${API_BASE_URL}/alunos/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apelido, codigoSala }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro no login: ${response.status}`);
  }

  return await response.json();
};


export const getNiveis = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/alunos/niveis`);
  if (!response.ok) throw new Error(`Erro ao carregar níveis: ${response.status}`);
  const data = await response.json();
  return data.map((nivel: any) => nivel.toLowerCase());
};

export const registrarNivel = async (apelido: string, nivel: string): Promise<ApiAluno> => {
  const response = await fetch(`${API_BASE_URL}/alunos/${encodeURIComponent(apelido)}/registrarNivel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nivel: nivel.toUpperCase() }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ao atualizar nível: ${response.status}`);
  }
  return await response.json();
};

export const vincularAlunoASala = async (apelido: string, codigoSala: string): Promise<ApiAluno> => {
  const response = await fetch(
    `${API_BASE_URL}/salas/vincular?apelido=${encodeURIComponent(apelido)}&codigoSala=${encodeURIComponent(codigoSala)}`,
    { method: 'POST' }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ao vincular aluno à sala: ${response.status}`);
  }
  return await response.json();
};

// ===== SALA =====
export const cadastrarSala = async (nomeTurma: string): Promise<ApiSala> => {
  const response = await fetch(`${API_BASE_URL}/salas/criar?nomeTurma=${encodeURIComponent(nomeTurma)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ao cadastrar sala: ${response.status}`);
  }

  return await response.json();
};

export const listarSalas = async (): Promise<ApiSala[]> => {
  const response = await fetch(`${API_BASE_URL}/salas/listar`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ao listar salas: ${response.status}`);
  }
  return await response.json();
};

// ===== PROFESSOR =====
export const cadastrarProfessor = async (
  nomeDeUsuario: string,
  senha: string,
  idSala: number
): Promise<ApiProfessor> => {
  const response = await fetch(`${API_BASE_URL}/professores/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomeDeUsuario, senha, salaId: idSala }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro ao cadastrar professor: ${response.status}`);
  }

  return await response.json();
};

export const loginProfessor = async (nomeDeUsuario: string, senha: string): Promise<ApiProfessor> => {
  const response = await fetch(`${API_BASE_URL}/professores/autenticar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nomeDeUsuario, senha }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erro no login do professor: ${response.status}`);
  }

  return await response.json();
};

// ==== objeto exportado ====
export const api = {
  // Alunos
  loginAluno,
  getNiveis,
  registrarNivel,
  vincularAlunoASala,

  // Salas
  listarSalas,
  cadastrarSala,

  // Professores
  cadastrarProfessor,
  loginProfessor,
};
