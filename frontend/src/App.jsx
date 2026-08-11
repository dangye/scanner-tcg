import { useState, useRef, useEffect } from 'react';
import { API_CONFIG } from './config';

export default function App() {
  const [carregando, setCarregando] = useState(false);
  const [listaCartas, setListaCartas] = useState([]);
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [statusScanner, setStatusScanner] = useState('Câmera desligada');
  const [modoAutomatico, setModoAutomatico] = useState(false);

  // Estados para gerenciar as duas fotos antes do envio
  const [fotoFrenteBlob, setFotoFrenteBlob] = useState(null);
  const [etapa, setEtapa] = useState('frente'); // 'frente' ou 'tras'

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const alternarCamera = async () => {
    if (cameraAtiva) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraAtiva(false);
      setModoAutomatico(false);
      resetarEtapas();
      setStatusScanner('Câmera desligada');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        videoRef.current.srcObject = stream;
        cameraAtivaReal(true);
      } catch (err) {
        alert('Não foi possível acessar a câmera: ' + err.message);
      }
    }
  };

  const cameraAtivaReal = (status) => {
    setCameraAtiva(status);
    if(status) setStatusScanner('📸 Passo 1: Posicione a FRENTE da carta');
  };

  const resetarEtapas = () => {
    setFotoFrenteBlob(null);
    setEtapa('frente');
  };

  const tocarBipeSucesso = () => {
    const audio = new Audio('https://google.com');
    audio.volume = 0.5;
    audio.play().catch(e => console.log(e));
  };

  const capturarPasso = () => {
    if (!cameraAtiva || carregando) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return alert('Erro ao congelar imagem.');

      if (etapa === 'frente') {
        // Guarda a frente e muda a instrução para o verso
        setFotoFrenteBlob(blob);
        setEtapa('tras');
        setStatusScanner('🔄 Passo 2: Agora vire e posicione o VERSO (Trás) da carta');
      } else {
        // Já temos o verso, agora realiza o envio das duas juntas
        enviarDuasFotos(fotoFrenteBlob, blob);
      }
    }, 'image/jpeg', 0.85);
  };

  const enviarDuasFotos = async (frenteBlob, trasBlob) => {
    setCarregando(true);
    setStatusScanner('🤖 IA analisando frente e verso combinados...');

    const formData = new FormData();
    formData.append('frente', frenteBlob, 'frente.jpg');
    formData.append('tras', trasBlob, 'tras.jpg');

    try {
      const resposta = await fetch(API_CONFIG.ENDPOINTS.ANALISAR, {
        method: 'POST',
        body: formData,
      });
      
      const dados = await resposta.json();
      
      if (dados.error) {
        setStatusScanner('❌ Erro na avaliação de mídia. Tente novamente.');
      } else {
        const novaCarta = {
          ...dados,
          id: Date.now(),
          data_cadastro: new Date().toLocaleDateString('pt-BR')
        };
        setListaCartas((listaAnterior) => [novaCarta, ...listaAnterior]);
        setStatusScanner('✅ Cadastro completo com sucesso!');
        tocarBipeSucesso();
      }
    } catch (erro) {
      setStatusScanner('⚠️ Erro de conexão com o servidor.');
    } finally {
      setCarregando(false);
      resetarEtapas(); // Volta para o estado 'frente' para a próxima carta
    }
  };

  const removerCarta = (id) => {
    setListaCartas((prev) => prev.filter((c) => c.id !== id));
  };

  const exportarParaCSV = () => {
    if (listaCartas.length === 0) return;
    const colunas = ['Data', 'Jogo', 'Nome', 'Coleção', 'Número', 'Raridade', 'Estado', 'Justificativa'];
    const linhas = listaCartas.map(c => [
      c.data_cadastro, `"${c.jogo}"`, `"${c.nome}"`, `"${c.colecao}"`, `"${c.numero}"`, `"${c.raridade}"`, `"${c.estado_conservacao}"`, `"${c.justificativa_estado.replace(/"/g, '""')}"`
    ]);
    const conteudoCSV = [colunas.join(';'), ...linhas.map(l => l.join(';'))].join('\n');
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inventario_completo_tcg.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loop Automático adaptado para guiar os passos
  useEffect(() => {
    let temporizador;
    if (modoAutomatico && !carregando && cameraAtiva) {
      const tempoEspera = etapa === 'frente' ? 3000 : 2000; // Mais tempo para colocar a nova carta frente, menos tempo para virar
      temporizador = setTimeout(() => {
        capturarPasso();
      }, tempoEspera);
    }
    return () => clearTimeout(temporizador);
  }, [modoAutomatico, carregando, etapa]);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>📸 Scanner TCG Inteligente 360° (Frente + Verso)</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '440px', height: '310px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {!cameraAtiva && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>Câmera Desativada</div>}
          
          {cameraAtiva && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: etapa === 'frente' ? '#007bff' : '#dc3545', color: '#fff', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
              AGUARDANDO: {etapa.toUpperCase()}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', minWidth: '280px' }}>
          <button onClick={alternarCamera} style={{ padding: '12px', cursor: 'pointer', backgroundColor: cameraAtiva ? '#dc3545' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            {cameraAtiva ? '🔴 Desligar Câmera' : '🔵 Ligar Câmera'}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f5', padding: '10px', borderRadius: '4px', gap: '10px' }}>
            <label style={{ fontWeight: '500', fontSize: '14px', cursor: 'pointer' }} htmlFor="switch-auto">✨ Scanner Automático Interativo:</label>
            <input 
              id="switch-auto" type="checkbox" checked={modoAutomatico} disabled={!cameraAtiva}
              onChange={(e) => setModoAutomatico(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
          </div>

          {!modoAutomatico && (
            <button onClick={capturarPasso} disabled={!cameraAtiva || carregando} style={{ padding: '12px', cursor: 'pointer', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              {carregando ? '⏳ Processando...' : `📸 Capturar ${etapa === 'frente' ? 'Frente' : 'Verso'}`}
            </button>
          )}

          <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px', border: '1px solid #ffeeba' }}>
            <p style={{ margin: '0', fontSize: '13px', color: '#856404', fontWeight: 'bold' }}>{statusScanner}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>Inventário de Cartas Verificadas ({listaCartas.length})</h3>
        <button onClick={exportarParaCSV} disabled={listaCartas.length === 0} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          📥 Exportar Planilha Completa
        </button>
      </div>

      {listaCartas.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Nenhuma carta avaliada em 360° ainda.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#333', color: '#fff' }}>
                <th style={{ padding: '12px' }}>Jogo</th>
                <th style={{ padding: '12px' }}>Nome</th>
                <th style={{ padding: '12px' }}>Coleção / N°</th>
                <th style={{ padding: '12px' }}>Raridade</th>
                <th style={{ padding: '12px' }}>Estado Final (360°)</th>
                <th style={{ padding: '12px' }}>Análise Consolidada da IA</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaCartas.map((carta) => (
                <tr key={carta.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{carta.jogo}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{carta.nome}</td>
                  <td style={{ padding: '12px' }}>{carta.colecao} ({carta.numero})</td>
                  <td style={{ padding: '12px' }}>{carta.raridade}</td>
                  <td style={{ padding: '12px' }}><span style={{ backgroundColor: carta.estado_conservacao?.toLowerCase().includes('mint') ? '#d4edda' : '#fff3cd', color: carta.estado_conservacao?.toLowerCase().includes('mint') ? '#155724' : '#856404', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px' }}>{carta.estado_conservacao}</span></td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#555', maxWidth: '400px' }}>{carta.justificativa_estado}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}><button onClick={() => removerCarta(carta.id)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>🗑️</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}