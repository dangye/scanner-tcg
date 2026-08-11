// Configuração de URLs da API baseada no ambiente

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://seu-backend-vercel.vercel.app'  // Substitua com sua URL real
    : 'http://localhost:3001');

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    ANALISAR: `${API_BASE_URL}/api/analisar`,
    HEALTH: `${API_BASE_URL}/api/health`,
  }
};

export default API_CONFIG;
