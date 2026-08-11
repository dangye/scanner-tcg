# Frontend - Scanner TCG

Interface web para scanner de cartas de TCG com IA.

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Acesse em: http://localhost:5173

### Configurar URL da API

#### Em Desenvolvimento
Por padrão, o frontend procura o backend em `http://localhost:3001`.

Se o backend estiver em outra porta, crie um arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:3000
```

#### Em Produção
Após fazer deploy do backend na Vercel, crie um arquivo `.env.production.local`:

```env
VITE_API_URL=https://seu-backend-vercel.vercel.app
```

### Build para Produção

```bash
npm run build
```

A saída estará em `dist/`.

## 📋 Funcionalidades

- ✅ Scanner de câmera em tempo real
- ✅ Captura de frente e verso da carta
- ✅ Análise com IA (GPT-4V)
- ✅ Modo automático de captura
- ✅ Listagem de cartas analisadas
- ✅ Exportar para CSV/Excel

## 🔧 Estrutura

```
frontend/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── config.js        # Configuração de URLs
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── .env.example         # Template de variáveis
├── vite.config.js
├── package.json
└── index.html
```

## 📱 Requisitos Navegador

- Acesso à câmera (HTTPS em produção, HTTP em dev)
- JavaScript habilitado
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🔐 Privacidade

- Todas as imagens são processadas no backend
- Nenhuma imagem é armazenada localmente no navegador
- CORS está configurado no backend para aceitar requisições do frontend

## 🎨 Customização

### Alterar cores
Edite `src/App.jsx` e procure pelos estilos `backgroundColor`, `color`, etc.

### Alterar timeout de análise
Edite `src/App.jsx` e altere os valores de `tempoEspera` em `useEffect`.

## 🐛 Troubleshooting

### Erro: "Câmera não acessível"
- Verifique permissões de câmera do navegador
- Em HTTPS, o navegador solicitará permissão
- Alguns navegadores antigos não suportam

### Erro: "Servidor desconectado"
- Verifique se o backend está rodando
- Verifique a URL em `src/config.js` ou `.env.local`
- Teste com: `curl https://seu-backend-vercel.vercel.app/api/health`

### Imagens não carregam
- Verifique se o backend recebeu os arquivos
- Confira a resposta no Network tab (DevTools)

## 📚 Links Úteis

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

