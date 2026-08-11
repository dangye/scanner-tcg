# ⚡ Quick Reference - Vercel Deployment

## Em 5 Minutos

```bash
# 1. Commit e push
git add . && git commit -m "Deploy ready" && git push

# 2. Backend: https://vercel.com/new → Root: backend → Deploy

# 3. Frontend: https://vercel.com/new → Root: frontend
#    Env Var: VITE_API_URL = https://seu-backend.vercel.app → Deploy

# 4. Backend painel: Settings → Env Vars → OPENAI_API_KEY → Redeploy

# 5. Teste: https://seu-frontend.vercel.app
```

---

## Comandos Úteis

### Verificar Backend Localmente
```bash
cd backend
npm install
npm start
curl http://localhost:3001/api/health
```

### Verificar Frontend Localmente
```bash
cd frontend
npm install
VITE_API_URL=http://localhost:3001 npm run dev
```

### Deploy via CLI (Se tiver acesso npm)
```bash
cd backend
npx vercel --prod
```

### Ver Logs do Deploy
```bash
npx vercel logs
```

### Verificar Status
```bash
npx vercel status
```

---

## URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **New Deployment**: https://vercel.com/new
- **OpenAI API Keys**: https://platform.openai.com/account/api-keys

---

## Arquivo `.env` Necessário (Backend)

```env
OPENAI_API_KEY=sk-...sua-chave-aqui...
```

---

## Variáveis Vercel (Frontend)

```
VITE_API_URL=https://seu-backend.vercel.app
```

---

## Erros Comuns & Soluções

| Erro | Solução |
|------|---------|
| `npm registry 403` | Use `npx vercel` em vez de `npm install -g vercel` |
| `OPENAI_API_KEY undefined` | Adicione no painel Vercel > Settings > Env Vars |
| `CORS error` | Já configurado. Verifique `VITE_API_URL` no frontend |
| `Camera not working` | Requer HTTPS (Vercel fornece automaticamente) |
| `Timeout` | Normal com GPT-4V (até 30s). Já configurado |

---

## Checklist Rápida

- [ ] Código pushed para GitHub
- [ ] Backend deployado (Root: `backend`)
- [ ] `OPENAI_API_KEY` adicionado no painel
- [ ] Backend redeploy feito
- [ ] Frontend deployado (Root: `frontend`)
- [ ] `VITE_API_URL` configurado no frontend
- [ ] Frontend redeploy feito
- [ ] URL do backend testada: `curl https://seu-backend.vercel.app/api/health`
- [ ] Frontend carregado e câmera testada

---

## URLs Finais (Após Deploy)

```
Backend: https://seu-projeto-backend.vercel.app
Frontend: https://seu-projeto-frontend.vercel.app
```

Ou se usar domínios customizados:
```
Backend: https://api.seu-dominio.com
Frontend: https://seu-dominio.com
```

---

## Próximos Deploy (Depois do Primeiro)

1. Fazer mudanças no código
2. `git push`
3. Vercel redeploy automático
4. Pronto! 🚀

---

**Precisa de ajuda? Consulte:**
- `DEPLOYMENT_GUIDE.md` - Guia completo
- `DEPLOYMENT_CHECKLIST.md` - Checklist visual
- `backend/DEPLOYMENT.md` - Docs do backend
- `frontend/README.md` - Docs do frontend

