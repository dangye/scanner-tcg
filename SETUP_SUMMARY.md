# 📦 Resumo de Preparação para Deploy na Vercel

## ✅ O que foi feito

### Backend (`/backend`)

#### Arquivos Criados:
1. **`/api/index.js`** 
   - Handler serverless da Vercel
   - Exporta Express app como função
   - Pronto para escalar automaticamente

2. **`DEPLOYMENT.md`**
   - Guia passo-a-passo completo
   - Opcões de deployment (CLI e Web)
   - Troubleshooting específico

3. **`.env.example`**
   - Template de variáveis necessárias
   - Documenta `OPENAI_API_KEY`

4. **`deploy.sh`**
   - Script bash para facilitar deploy
   - Verifica pré-requisitos
   - Usa `npx vercel` (sem precisar instalar CLI)

#### Arquivos Modificados:
1. **`vercel.json`**
   - Adicionado `buildCommand`
   - Configurado rewrites para rotear para `/api/index.js`
   - Definido memory e timeout para functions
   - Suporta upload de múltiplas imagens

### Frontend (`/frontend`)

#### Arquivos Criados:
1. **`src/config.js`**
   - URLs configuráveis por ambiente
   - Usa `VITE_API_URL` (variável de ambiente)
   - Fallback para `localhost:3001` em dev

2. **`.env.example`**
   - Mostra como configurar URL da API
   - Deixa claro qual é a produção vs dev

#### Arquivos Modificados:
1. **`src/App.jsx`**
   - Importa `API_CONFIG`
   - Usa `API_CONFIG.ENDPOINTS.ANALISAR` em vez de URL fixa
   - Compatível com desenvolvimento e produção

2. **`README.md`**
   - Instruções de desenvolvimento
   - Como configurar URLs por ambiente
   - Troubleshooting

### Raiz do Projeto (`/`)

1. **`DEPLOYMENT_GUIDE.md`** (Este arquivo!)
   - Guia completo e detalhado
   - Passo-a-passo para cada fase
   - Resolve problemas comuns

2. **`DEPLOYMENT_CHECKLIST.md`**
   - Checklist visual de progress
   - Fácil verificar o que falta

---

## 🎯 Próximos Passos (Para Você Fazer)

### 1️⃣ Fazer Push do Código
```bash
cd /Users/vitorhugoslongotaniguchi/Desktop/Estudos/scanner-tcg
git add .
git commit -m "Setup Vercel deployment - backend serverless + frontend config"
git push
```

### 2️⃣ Deploy do Backend
**Opção A (Recomendada - Interface Web):**
1. Acesse https://vercel.com/new
2. Selecione seu repositório
3. Escolha Root Directory: `backend`
4. Clique "Deploy"

**Opção B (CLI):**
```bash
cd backend
npx vercel --prod
```

### 3️⃣ Adicionar Variáveis de Ambiente
1. No painel da Vercel: Settings > Environment Variables
2. Adicione: 
   - Key: `OPENAI_API_KEY`
   - Value: sua chave da OpenAI
3. Salve e redeploy

### 4️⃣ Deploy do Frontend
1. Acesse https://vercel.com/new
2. Selecione seu repositório
3. Root Directory: `frontend`
4. Environment Variables:
   - `VITE_API_URL` = URL do backend (ex: `https://seu-projeto.vercel.app`)
5. Deploy

### 5️⃣ Testar
```bash
# Backend
curl https://seu-projeto.vercel.app/api/health

# Frontend
Abra https://seu-frontend.vercel.app e teste a câmera
```

---

## 📊 Estrutura Pronta

```
scanner-tcg/
├── DEPLOYMENT_GUIDE.md          ← Você está aqui
├── DEPLOYMENT_CHECKLIST.md      ← Acompanhe seu progresso
│
├── backend/
│   ├── api/
│   │   └── index.js             ← ⭐ Handler serverless
│   ├── server.js                ← Original (pode deletar depois)
│   ├── vercel.json              ← ⭐ Configuração Vercel
│   ├── package.json
│   ├── .env.example             ← Template de variáveis
│   ├── deploy.sh                ← Script de deploy
│   ├── DEPLOYMENT.md            ← Docs específicas
│   └── README.md                ← Docs do backend
│
└── frontend/
    ├── src/
    │   ├── config.js            ← ⭐ URLs configuráveis
    │   ├── App.jsx              ← Atualizado
    │   └── ...
    ├── .env.example             ← Template de variáveis
    ├── README.md                ← Docs atualizadas
    └── package.json
```

⭐ = Arquivos principais para o deploy

---

## 🔍 Verificações Rápidas

### Verificar se backend está pronto:
```bash
cd backend
cat vercel.json        # Deve ter rewrites, functions, buildCommand
cat api/index.js       # Deve exportar o app Express
cat package.json       # Deve ter dependências instaladas
```

### Verificar se frontend está pronto:
```bash
cd frontend
cat src/config.js      # Deve ter API_CONFIG e endpoints
grep "API_CONFIG" src/App.jsx  # Deve usar a config
```

---

## 💡 Dicas Importantes

1. **Erro "npm registry 403"?**
   - Use `npx vercel` em vez de `npm install -g vercel`
   - ✅ Já documentado em `DEPLOYMENT.md`

2. **Quero testar localmente primeiro?**
   ```bash
   cd backend && npm start     # Rodará em localhost:3001
   cd frontend && npm run dev  # Rodará em localhost:5173
   ```

3. **Como faço redeploy após mudanças?**
   - No Vercel: Faça push para GitHub (auto-deploy)
   - Ou: `npx vercel --prod`

4. **Variáveis de ambiente?**
   - Backend: Sempre no painel da Vercel (Settings > Env Vars)
   - Frontend: Em `.env.production.local` ou Vercel

5. **CORS bloqueando?**
   - ✅ Já está configurado no backend
   - Frontend e backend podem estar em domínios diferentes, sem problema

---

## 📞 Documentação de Referência

Dentro do seu projeto:
- `backend/DEPLOYMENT.md` - Deployment específico do backend
- `backend/README.md` - Info técnica do backend
- `frontend/README.md` - Info técnica do frontend
- `DEPLOYMENT_GUIDE.md` - Este arquivo completo
- `DEPLOYMENT_CHECKLIST.md` - Seu checklist

Online:
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Functions](https://vercel.com/docs/functions)
- [OpenAI API](https://platform.openai.com/docs)

---

## ✨ Status Geral

```
🟢 Backend: Pronto para deploy
🟢 Frontend: Pronto para deploy
🟢 Documentação: Completa
🟡 Seu deploy: Aguardando você seguir os passos

Tempo estimado: 15-20 minutos
```

---

## 🎉 Sucesso!

Após completar os passos acima, você terá:
- ✅ Backend escalável serverless na Vercel
- ✅ Frontend dinâmico que se conecta ao backend
- ✅ Análise de cartas em tempo real
- ✅ Deploy automático ao fazer push
- ✅ Segurança com variáveis de ambiente

**Qualquer dúvida, consulte `DEPLOYMENT_CHECKLIST.md` ou `backend/DEPLOYMENT.md`**

Boa sorte! 🚀
