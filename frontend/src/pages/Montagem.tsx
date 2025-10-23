import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DraggableItem from "../components/DraggableItem";
import DropZone from "../components/DropZone";
import SucessoModal from "../components/SucessoModal";
import ErroModal from "../components/ErroModal";
import HistoriaModal from "../components/HistoriaModal";
import BoasVindasModal from "../components/BoasVindasModal";
import PainelPontuacao from "../components/PainelPontuacao";
import Cronometro from "../components/Cronometro";
import { useCronometro } from "../hooks/useCronometro";
import { usePontuacao } from "../hooks/usePontuacao";
import { DIALOGOS_HISTORIA, obterMensagemAleatoria } from "../utils/dialogos";
import api from "../api/api";
import type { 
  PecaItem, 
  NivelDificuldade,
  Aluno as AlunoType,
  DialogoHistoria
} from "../types";
import "./styles/Montagem.css";

import monitorCinza from "../assets/peças/monitor_cinza.png";
import monitorAzul from "../assets/peças/monitor_azul.png";
import monitorRosa from "../assets/peças/monitor_rosa.png";
import mouseCinza from "../assets/peças/mouse_cinza.png";
import mouseAzul from "../assets/peças/mouse_azul.png";
import mouseRosa from "../assets/peças/mouse_rosa.png";
import tecladoCinza from "../assets/peças/teclado_cinza.png";
import tecladoAzul from "../assets/peças/teclado_azul.png";
import tecladoRosa from "../assets/peças/teclado_rosa.png";
import caixaSomD from "../assets/peças/caixa_som_d.png";

const SEQUENCIA_PECAS = ["monitor_1", "teclado_1", "mouse_1", "caixa_som_1"];

const imagensMap: Record<string, Record<string, string>> = {
  monitor: {
    cinza: monitorCinza,
    azul: monitorAzul,
    rosa: monitorRosa,
  },
  mouse: {
    cinza: mouseCinza,
    azul: mouseAzul,
    rosa: mouseRosa,
  },
  teclado: {
    cinza: tecladoCinza,
    azul: tecladoAzul,
    rosa: tecladoRosa,
  },
  caixa_som: {
    padrão: caixaSomD,
  },
};

const MAPEAMENTO_CORRETO: Record<string, string> = {
  "monitor_1": "dropzone_monitor",
  "teclado_1": "dropzone_teclado",
  "mouse_1": "dropzone_mouse",
  "caixa_som_1": "dropzone_som"
};

const Montagem: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const aluno = location.state?.aluno as AlunoType | undefined;
  const nivel = (location.state?.nivel || 'medio') as NivelDificuldade;
  
  const dialogosNivel = DIALOGOS_HISTORIA[nivel];
  
  const apelido = aluno?.apelido || localStorage.getItem("apelido") || "teste";
  const codigoSala = aluno?.codigoSala || Number(localStorage.getItem("codigoSala")) || 999;

  const [historiaAtual, setHistoriaAtual] = useState<DialogoHistoria | null>(null);
  const [mostrarHistoria, setMostrarHistoria] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mostrarBoasVindas, setMostrarBoasVindas] = useState(true);

  const {
    pontuacaoTotal,
    registrarTentativa,
    calcularPontuacaoFinalComBonus,
    resetar: resetarPontuacao
  } = usePontuacao();

  const {
    tempo,
    iniciar: iniciarCronometro,
    pausar: pausarCronometro,
    resetar: resetarCronometro
  } = useCronometro();

  useEffect(() => {
    if (!mostrarBoasVindas) {
      iniciarCronometro();
    }
    return () => pausarCronometro();
  }, [mostrarBoasVindas]);

  const [pecas, setPecas] = useState<PecaItem[]>([
    { 
      id: "monitor_1", 
      label: "Monitor", 
      imagem: monitorCinza, 
      color: "cinza",
      descricao: "Tela para visualizar o computador"
    },
    { 
      id: "teclado_1", 
      label: "Teclado", 
      imagem: tecladoCinza, 
      color: "cinza",
      descricao: "Dispositivo para digitação"
    },
    { 
      id: "mouse_1", 
      label: "Mouse", 
      imagem: mouseCinza, 
      color: "cinza",
      descricao: "Dispositivo de controle"
    },
    { 
      id: "caixa_som_1", 
      label: "Caixa de Som", 
      imagem: caixaSomD, 
      color: "padrão",
      descricao: "Dispositivo de áudio"
    },
  ]);

  const [pecasColocadas, setPecasColocadas] = useState<Set<string>>(new Set());
  const [pecaSelecionada, setPecaSelecionada] = useState<string | null>(null);
  
  const [dropZoneDestacada, setDropZoneDestacada] = useState<string | null>(null);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [dicaAtual, setDicaAtual] = useState("");
  
  const [showSucesso, setShowSucesso] = useState(false);
  const [pontosGanhos, setPontosGanhos] = useState(0);
  const [showErro, setShowErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  
  const [historiaIndex, setHistoriaIndex] = useState(0);
  const [historiaAtualFluxo, setHistoriaAtualFluxo] = useState<DialogoHistoria | null>(null);
  const [showHistoria, setShowHistoria] = useState(true);
  
  const [indicePecaAtual, setIndicePecaAtual] = useState(0);
  const [tentativasPeca, setTentativasPeca] = useState(0);

  const pecaAtivaId = SEQUENCIA_PECAS[indicePecaAtual];

  useEffect(() => {
    console.log("Inicializando montagem...");
    console.log("Peça ativa inicial:", pecaAtivaId);
    console.log("Nível de dificuldade:", nivel);
  }, []);

  // Sincroniza a história com a peça ativa
  useEffect(() => {
    const h = dialogosNivel.find(d => d.pecaId === pecaAtivaId) ?? dialogosNivel[0];
    setHistoriaAtualFluxo(h);
  }, [dialogosNivel, pecaAtivaId]);

  useEffect(() => {
    if (!showHistoria && historiaAtualFluxo) {
      setTentativasPeca(0);
      const novoIndice = dialogosNivel.findIndex(h => h.pecaId === historiaAtualFluxo.pecaId);
      if (novoIndice !== -1) {
        setIndicePecaAtual(novoIndice);
        console.log("Índice atualizado para:", novoIndice, "Peça:", historiaAtualFluxo.pecaId);
      }
    }
  }, [showHistoria, historiaAtualFluxo, dialogosNivel]);

  const handleContinuarHistoria = () => {
    setShowHistoria(false);
  };

  const handleContinuarBoasVindas = () => {
    setMostrarBoasVindas(false);
  };

  const avancarHistoria = () => {
    const proximoIndex = historiaIndex + 1;

    if (proximoIndex < dialogosNivel.length) {
      const proximaHistoria = dialogosNivel[proximoIndex];
      setHistoriaIndex(proximoIndex);
      setHistoriaAtualFluxo(proximaHistoria);
      setShowHistoria(true);
      setIndicePecaAtual(proximoIndex);
    } else {
      finalizarMontagemExterna();
    }
  };

  const handleColorChange = (itemId: string, color: string) => {
    const pecaType = itemId.split("_")[0];
    const novaImagem = imagensMap[pecaType]?.[color];

    if (novaImagem) {
      setPecas(pecas.map(p => 
        p.id === itemId ? { ...p, imagem: novaImagem, color } : p
      ));
    }
  };

  const handleSelectPeca = (itemId: string) => {
    if (!pecasColocadas.has(itemId)) {
      const novaSelecao = pecaSelecionada === itemId ? null : itemId;
      setPecaSelecionada(novaSelecao);
      setDropZoneDestacada(null);
      setMostrarDica(false);
    }
  };

  const aplicarAjudaVisual = (tentativasAtual: number) => {
    const dropZoneCorreta = MAPEAMENTO_CORRETO[pecaAtivaId];
    
    if (nivel === 'facil') {
      if (tentativasAtual === 2) {
        setMostrarDica(false);
        setDropZoneDestacada(null);
      } else if (tentativasAtual === 3) {
        setDicaAtual("Observe a área destacada!");
        setMostrarDica(true);
        setDropZoneDestacada(dropZoneCorreta);
      } else if (tentativasAtual >= 4) {
        setDicaAtual("O local correto está brilhando!");
        setMostrarDica(true);
        setDropZoneDestacada(dropZoneCorreta);
      }
    } else if (nivel === 'medio') {
      if (tentativasAtual <= 3) {
        setMostrarDica(false);
        setDropZoneDestacada(null);
      } else if (tentativasAtual === 4) {
        setMostrarDica(false);
        setDropZoneDestacada(null);
      } else if (tentativasAtual >= 5) {
        setDicaAtual("Lembre-se da história sobre esta peça!");
        setMostrarDica(true);
        setDropZoneDestacada(dropZoneCorreta);
      }
    }
  };

  const handleDrop = (itemId: string, targetId: string) => {
    console.log("Tentativa de drop:", { itemId, pecaAtivaId, targetId, ehPecaAtiva: itemId === pecaAtivaId });

    const ehPecaAtiva = itemId === pecaAtivaId;
    if (!ehPecaAtiva) {
      console.log(`Erro: Peça ${itemId} não está ativa. Ativa: ${pecaAtivaId}`);
      registrarTentativa(itemId, false, nivel);
      setMensagemErro(obterMensagemAleatoria(nivel, 'erro'));
      setShowErro(true);
      return;
    }

    const dropZoneCorreta = MAPEAMENTO_CORRETO[pecaAtivaId];
    const acertouLocal = targetId === dropZoneCorreta;
    
    console.log(`Validação de posição: Esperado=${dropZoneCorreta}, Recebido=${targetId}, Acertou=${acertouLocal}`);
    
    if (!acertouLocal) {
      console.log(`Erro: Local incorreto para ${itemId}`);
      const novasTentativas = tentativasPeca + 1;
      setTentativasPeca(novasTentativas);
      registrarTentativa(itemId, false, nivel);
      setMensagemErro(obterMensagemAleatoria(nivel, 'erro'));
      setShowErro(true);
      aplicarAjudaVisual(novasTentativas);
      return;
    }

    console.log(`Sucesso! ${itemId} encaixado em ${targetId}`);
    const pontosObtidos = registrarTentativa(itemId, true, nivel);
    
    const novasPecasColocadas = new Set([...pecasColocadas, itemId]);
    setPecasColocadas(novasPecasColocadas);
    
    setPontosGanhos(pontosObtidos);
    setPecaSelecionada(null);
    setDropZoneDestacada(null);
    setMostrarDica(false);
    setMensagemSucesso(obterMensagemAleatoria(nivel, 'sucesso'));
    
    setShowSucesso(true);
    
    try {
      api.salvarProgresso(apelido, codigoSala, false);
    } catch (err) {
      console.warn("Falha ao salvar progresso:", err);
    }

    if (novasPecasColocadas.size === pecas.length) {
      setTimeout(() => {
        setShowSucesso(false);
        finalizarMontagemExterna();
      }, 2000);
    } else {
      setTimeout(() => {
        setShowSucesso(false);
        avancarHistoria();
      }, 2000);
    }
  };

  function finalizarMontagemExterna() {
    pausarCronometro();
    const pontuacaoExterna = calcularPontuacaoFinalComBonus(tempo);
    
    localStorage.setItem("pontuacaoMontagem", pontuacaoExterna.toString());
    localStorage.setItem("tempoMontagem", tempo.toString());
    
    console.log("Montagem externa concluída! Avançando para montagem interna...");
    
    navigate("/montagem-interna", {
      state: {
        aluno: aluno,
        nivel: nivel
      }
    });
  }

  const handleErroClose = () => {
    setShowErro(false);
  };

  const handleVoltarFases = () => {
    resetarPontuacao();
    resetarCronometro();
    window.location.href = "/fases";
  };

  const obterImagemPeca = (pecaId: string): string | undefined => {
    return pecas.find(p => p.id === pecaId)?.imagem;
  };

  const obterLabelPecaAtiva = (): string => {
    const peca = pecas.find(p => p.id === pecaAtivaId);
    return peca?.label || "Monitor";
  };

  if (!aluno?.apelido) {
    return (
      <div className="montagem-container" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Erro ao carregar dados do aluno</h2>
        <p>Faça login novamente</p>
        <button onClick={() => window.location.href = '/aluno'}>Voltar ao Login</button>
      </div>
    );
  }

  return (
    <div className="montagem-container">
      <BoasVindasModal 
        isOpen={mostrarBoasVindas}
        onContinuar={handleContinuarBoasVindas}
      />

      <div className="montagem-fantasma-esquerda" />
      
      <div className="montagem-header">
        <PainelPontuacao 
          pontuacao={pontuacaoTotal}
          pecasRestantes={pecas.length - pecasColocadas.size}
          totalPecas={pecas.length}
        />
        <Cronometro tempo={tempo} />
      </div>

      {mostrarDica && (
        <div className="montagem-dica-banner">
          {dicaAtual}
        </div>
      )}

      {!showHistoria && (
        <div className="montagem-alerta-selecao">
          <span className="montagem-alerta-icone">👆</span>
          <span>Arraste a peça <strong>{obterLabelPecaAtiva()}</strong> para o local correto!</span>
        </div>
      )}

      <div className="montagem-content">
        <div className="montagem-workspace">
          <div className="montagem-central-wrapper">
            {historiaAtualFluxo && showHistoria && (
              <div className="montagem-historia-balao">
                <h3>{historiaAtualFluxo.titulo}</h3>
                <p>{historiaAtualFluxo.texto}</p>
              </div>
            )}

            <div className="montagem-computador">
              <div className="montagem-computador-monitor">
                <DropZone
                  id="dropzone_monitor"
                  onDrop={handleDrop}
                  placed={pecasColocadas.has("monitor_1")}
                  image={obterImagemPeca("monitor_1")}
                  destacar={dropZoneDestacada === "dropzone_monitor"}
                  nivel={nivel}
                />
              </div>

              <div className="montagem-computador-perifericos">
                <div className="montagem-computador-som">
                  <DropZone
                    id="dropzone_som"
                    onDrop={handleDrop}
                    placed={pecasColocadas.has("caixa_som_1")}
                    image={obterImagemPeca("caixa_som_1")}
                    destacar={dropZoneDestacada === "dropzone_som"}
                    nivel={nivel}
                  />
                </div>

                <div className="montagem-computador-teclado">
                  <DropZone
                    id="dropzone_teclado"
                    onDrop={handleDrop}
                    placed={pecasColocadas.has("teclado_1")}
                    image={obterImagemPeca("teclado_1")}
                    destacar={dropZoneDestacada === "dropzone_teclado"}
                    nivel={nivel}
                  />
                </div>

                <div className="montagem-computador-mouse">
                  <DropZone
                    id="dropzone_mouse"
                    onDrop={handleDrop}
                    placed={pecasColocadas.has("mouse_1")}
                    image={obterImagemPeca("mouse_1")}
                    destacar={dropZoneDestacada === "dropzone_mouse"}
                    nivel={nivel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="montagem-pecas-horizontal">
          <h3>Peças Disponíveis</h3>
          <div className="montagem-pecas-lista-horizontal">
            {pecas.map((peca) => (
              <DraggableItem
                key={peca.id}
                item={peca}
                onColorChange={handleColorChange}
                onSelect={handleSelectPeca}
                placed={pecasColocadas.has(peca.id)}
                isSelected={pecaSelecionada === peca.id}
                disabled={pecasColocadas.has(peca.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {historiaAtualFluxo && (
        <HistoriaModal
          isOpen={showHistoria && !mostrarBoasVindas}
          historia={historiaAtualFluxo}
          onContinuar={handleContinuarHistoria}
        />
      )}

      <HistoriaModal
        isOpen={mostrarHistoria}
        historia={historiaAtual}
        onContinuar={() => {
          setMostrarHistoria(false);
          setHistoriaAtual(null);
        }}
      />

      <SucessoModal
        isOpen={showSucesso}
        onClose={() => setShowSucesso(false)}
        pontosGanhos={pontosGanhos}
        mensagem={mensagemSucesso}
      />

      <ErroModal
        isOpen={showErro}
        onClose={handleErroClose}
        mensagem={mensagemErro}
      />
    </div>
  );
};

export default Montagem;