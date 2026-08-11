# 🚀 Guia Completo de Deployment - Scanner TCG

## 📋 Resumo das Mudanças Feitas

### Backend
✅ Criada estrutura de Vercel Functions (`/api/index.js`)
✅ Atualizado `vercel.json` com configuração completa
✅ Criado `.env.example` para documentar variáveis
✅ Criado `DEPLOYMENT.md` com instruções detalhadas
✅ Criado `deploy.sh` script de automação

### Frontend
✅ Criado `src/config.js` para gerenciar URLs dinâmicas
✅ Atualizado `App.jsx` para usar configuração
✅ Criado `.env.example` no frontend
✅ Atualizado README.md com instruções

---

## 🎯 Passo a Passo: Deploy Completo

### Fase 1: Preparar Código Local

#### 1.1 Backend - Verificar Configuração
```bash
cd backend
npm install  # Instalar dependências
cat vercel.json  # Verificar configuração
```

#### 1.2 Frontend - Preparar
```bash
cd frontend
npm install  # Instalar dependências
```

### Fase 2: Fazer Push para GitHub

```bash
# Na raiz do projeto
git add .
git commit -m "Setup Vercel deployment for backend and frontend"
git push
```

### Fase 3: Fazer Deploy do Backend

#### Opção A: Interface Web (RECOMENDADO - Não requer CLI)

1. Acesse https://vercel.com/new
2. Selecione seu repositório GitHub
3. Verifique as configurações:
   - **Project Name**: scanner-tcg-backend (ou seu nome)
   - **Root Directory**: `backend` ✅
   - **Framework**: Other (Presets)
   - **Build Command**: `npm install`
4. Clique em **"Deploy"**

#### Opção B: CLI (se tiver acesso)

```bash
cd backend
npx vercel --prod
```

### Fase 4: Configurar Variáveis de Ambiente

Após o deploy (no painel da Vercel):

1. Vá para **Settings** > **Environment Variables**
2. Adicione:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sua_chave_openai_aqui`
3. Clique em **"Save"**
4. Faça **Redeploy**: 
   - Vá para **Deployments**
   - Clique nos 3 pontinhos do último deploy
   - Selecione **"Redeploy"**

### Fase 5: Obter URL do Backend Deployado

Na dashboard da Vercel, você verá algo como:
```
https://seu-projeto.vercel.app
```

Guarde essa URL! Você usará no frontend.

### Fase 6: Fazer Deploy do Frontend

Existem 3 opções:

#### Opção A: Deploy na Vercel também

1. Acesse https://vercel.com/new
2. Selecione seu repositório
3. Configure:
   - **Root Directory**: `frontend` ✅
   - **Environment Variables**:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://seu-projeto.vercel.app` (URL do backend)
4. Deploy

#### Opção B: Deploy em outro lugar (Netlify, GitHub Pages, etc)

Crie arquivo `.env.production.local`:
```bash
cd frontend
echo "VITE_API_URL=https://seu-projeto.vercel.app" > .env.production.local
npm run build
# Deploy o conteúdo de `dist/` para sua plataforma
```

#### Opção C: Usar Vercel Mono Repo (Recomendado)

Se quiser ambos backend e frontend no Vercel:

1. Conecte o repositório uma vez
2. Crie dois projetos separados, um com Root Directory `backend` e outro com `frontend`

---

## 🔗 URLs Finais

Após o deployment, você terá:

- **Backend**: `https://seu-backend.vercel.app`
- **Frontend**: `https://seu-frontend.vercel.app` (ou outro lugar)

---

## ✅ Verificação Rápida

### Backend funciona?
```bash
curl https://seu-backend.vercel.app/api/health
# Esperado: { "status": "ok" }
```

### Frontend consegue conectar?
1. Acesse seu frontend
2. Abra DevTools (F12 > Network tab)
3. Ligue a câmera e tente capturar
4. Procure por requisição para `/api/analisar`
5. Verifique se a resposta é um JSON

---

## 🐛 Troubleshooting

### "403 Forbidden - npm registry"
**Problema**: CLI do Vercel não instala
**Solução**: Use `npx vercel` em vez de `npm install -g vercel`

### "CORS Error"
**Problema**: Frontend não consegue conectar ao backend
**Solução**: 
- Backend já tem CORS configurado ✅
- Verifique `VITE_API_URL` no frontend

### "OPENAI_API_KEY is undefined"
**Problema**: IA não funciona
**Solução**:
- Você adicionou no painel da Vercel?
- Você fez redeploy após adicionar?

### Timeout (30s)
**Problema**: Requisição demora muito
**Solução**: Isso é normal com GPT-4V, já está configurado para 30s

---

## 📁 Arquivos Importantes

Backend:
- `backend/api/index.js` - Handler serverless
- `backend/vercel.json` - Configuração Vercel
- `backend/.env.example` - Template variáveis
- `backend/DEPLOYMENT.md` - Documentação específica

Frontend:
- `frontend/src/config.js` - URLs configuráveis
- `frontend/.env.example` - Template variáveis

---

## 🔐 Dicas de Segurança

1. **Nunca commitar `.env`** - Use `.env.example` para documentar
2. **Variáveis no Vercel** - Adicione credenciais apenas no painel
3. **HTTPS em produção** - Vercel fornece automaticamente
4. **CORS** - Já está configurado apenas para seu frontend

---

## 📞 Suporte

Se tiver problemas:

1. Verificar logs: `npx vercel logs`
2. Testar localmente: `npm start` (backend) e `npm run dev` (frontend)
3. Consultar documentação:
   - Vercel: https://vercel.com/docs
   - Express/Node: https://expressjs.com/
   - React: https://react.dev/

---

## ✨ Próximos Passos

Após o deploy funcionar:
- [ ] Testar com câmera real
- [ ] Validar respostas da IA
- [ ] Configurar domínio customizado (opcional)
- [ ] Adicionar analytics (opcional)
- [ ] Backup da base de dados (se adicionar no futuro)

**Sucesso! 🎉**
