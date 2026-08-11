# 📋 Checklist de Deployment

## Pré-Deployment

- [ ] Código testado localmente (backend e frontend)
- [ ] `npm install` executado em ambos
- [ ] Variáveis de ambiente (`.env`) funcionando local
- [ ] Backend rodando em `npm start`
- [ ] Frontend rodando em `npm run dev`
- [ ] Código commitado e pushado para GitHub

## Deployment do Backend

### Via Web (Recomendado ⭐)
- [ ] Acesso https://vercel.com/new
- [ ] Selecionado repositório GitHub
- [ ] Root Directory configurado como `backend`
- [ ] Deploy iniciado e concluído
- [ ] URL recebida (ex: https://seu-projeto.vercel.app)

### Via CLI (Alternative)
- [ ] Vercel CLI instalado (`npx vercel`)
- [ ] Autenticado (`vercel login`)
- [ ] Deploy executado (`vercel --prod`)

## Variáveis de Ambiente - Backend

- [ ] Entrado no painel da Vercel
- [ ] Settings > Environment Variables
- [ ] Adicionado `OPENAI_API_KEY`
- [ ] Redeploy do backend realizado

## Teste do Backend

- [ ] Acessar: `https://seu-projeto.vercel.app/api/health`
- [ ] Resposta esperada: `{ "status": "ok" }`
- [ ] ✅ Se funcionou, continue

## Preparação Frontend

- [ ] `.env.production.local` criado (ou via Vercel)
- [ ] `VITE_API_URL` setado com URL do backend
- [ ] `npm run build` testado localmente

## Deployment do Frontend

### Opção A: Vercel (Recomendado ⭐⭐)
- [ ] Acesso https://vercel.com/new
- [ ] Selecionado repositório
- [ ] Root Directory configurado como `frontend`
- [ ] Environment Variables:
  - [ ] `VITE_API_URL` = URL do backend
- [ ] Deploy concluído

### Opção B: Outro Serviço (Netlify, GitHub Pages, etc)
- [ ] Build local: `npm run build`
- [ ] `dist/` deployado
- [ ] Variáveis de ambiente configuradas

## Teste Final

- [ ] Acessar URL do frontend
- [ ] Abrir DevTools (F12)
- [ ] Aba Network aberta
- [ ] Ligar câmera
- [ ] Capturar imagem
- [ ] Verificar requisição para `/api/analisar`
- [ ] Resposta é um JSON com dados da carta
- [ ] ✅ Tudo funcionando!

## Após Deploy (Otimizações)

- [ ] Configurar domínio customizado (opcional)
- [ ] Habilitar HTTPS (Vercel faz automaticamente)
- [ ] Aumentar timeout se necessário
- [ ] Adicionar monitoramento
- [ ] Teste com múltiplas cartas

## Documentação

- [ ] README.md atualizado (✅ Feito)
- [ ] DEPLOYMENT.md criado (✅ Feito)
- [ ] DEPLOYMENT_GUIDE.md criado (✅ Feito)
- [ ] .env.example criado (✅ Feito)

---

## 🎯 Status Atual

```
Backend:
✅ Estrutura de serverless criada (/api/index.js)
✅ vercel.json configurado
✅ .env.example criado
⏳ Aguardando deploy na Vercel

Frontend:
✅ config.js criado
✅ App.jsx atualizado
✅ .env.example criado
⏳ Aguardando deploy
```

---

## 🚀 Quick Start Deploy

```bash
# 1. Fazer push
git add . && git commit -m "Deploy ready" && git push

# 2. Backend - Acesse https://vercel.com/new
# 3. Frontend - Acesse https://vercel.com/new

# 4. Configurar OPENAI_API_KEY no painel

# 5. Testar URLs
curl https://seu-backend.vercel.app/api/health
```

---

## 💡 Pro Tips

- Use `npx vercel logs` para debugar problemas
- Redeploy automático ao fazer push (se vincular GitHub)
- Variáveis de ambiente diferentes por environment (preview/production)
- Preview URLs antes de colocar em produção

---

**Pronto para fazer o deploy? ✨**
