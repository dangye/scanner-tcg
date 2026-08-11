# Backend - Scanner TCG

API backend para análise de cartas de TCG usando GPT-4V.

## 🚀 Deployment na Vercel

### Opção 1: Deploy via Interface Web (Mais Fácil)

1. **Fazer push do código para GitHub**
   ```bash
   git add .
   git commit -m "Setup Vercel deployment"
   git push
   ```

2. **Conectar na Vercel**
   - Acesse https://vercel.com/new
   - Selecione seu repositório GitHub
   - Verifique: Root Directory deve ser `backend`
   - Clique em "Deploy"

3. **Configurar Variáveis de Ambiente**
   - No painel da Vercel, vá para Settings > Environment Variables
   - Adicione: `OPENAI_API_KEY` = sua chave da OpenAI
   - Clique em "Save" e depois "Redeploy"

### Opção 2: Deploy via CLI (npx)

```bash
# Se tiver problema com npm registry, use npx direto
cd backend

# Criar .env.local com suas credenciais
echo "OPENAI_API_KEY=sua_chave_aqui" > .env.local

# Fazer deploy
npx vercel --prod
```

### Opção 3: Script Automatizado

```bash
chmod +x deploy.sh
./deploy.sh
```

## ⚙️ Variáveis de Ambiente Necessárias

- `OPENAI_API_KEY`: Sua chave de API da OpenAI

Obtenha em: https://platform.openai.com/account/api-keys

## 📝 Estrutura do Projeto

```
backend/
├── api/
│   └── index.js          # Handler serverless da Vercel
├── server.js             # Servidor Express original
├── package.json
├── vercel.json           # Configuração de deploy
├── .env.example          # Template de variáveis
├── .env.local            # Variáveis reais (não commitar)
├── DEPLOYMENT.md         # Guia completo
└── deploy.sh             # Script de deploy
```

## 🔗 Endpoints

Após deploy, seu backend estará em: `https://seu-projeto.vercel.app`

### Análise de Cartas
```
POST /api/analisar
Content-Type: multipart/form-data

Body:
- frente: [arquivo de imagem]
- tras: [arquivo de imagem]

Response:
{
  "nome": "Nome da Carta",
  "jogo": "TCG",
  "colecao": "Coleção",
  "numero": "123",
  "raridade": "Rara",
  "estado_conservacao": "Near Mint",
  "justificativa_estado": "..."
}
```

### Health Check
```
GET /api/health

Response:
{ "status": "ok" }
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar servidor
npm start
# Servidor rodará em http://localhost:3001

# Testar endpoint
curl -X POST http://localhost:3001/analisar \
  -F "frente=@foto_frente.jpg" \
  -F "tras=@foto_verso.jpg"
```

## 🐛 Troubleshooting

### Erro: "npm registry 403 Forbidden"
- Problema: Bloqueio de rede ou política de segurança
- Solução: Use `npx vercel` em vez de `npm install -g vercel`
- Ou: Configure proxy do npm se necessário

### Erro: "OPENAI_API_KEY não encontrado"
- Verifique se adicionou a variável de ambiente no painel da Vercel
- Redeploy após adicionar
- Localmente, crie arquivo `.env` ou `.env.local`

### Erro: "Timeout"
- Requisições com GPT-4V podem levar tempo
- O limite padrão é 30s (já configurado)
- Aumentar `maxDuration` em `vercel.json` se necessário

### Erro de CORS
- Já está configurado com `cors()` middleware
- Apenas requisições do frontend funcionarão
- Verifique a URL do frontend em configurações de CORS se necessário

## 📊 Monitorar Deploy

```bash
# Ver logs em tempo real
npx vercel logs

# Ver status do deploy
npx vercel status

# Redeployar
npx vercel deploy --prod
```

## 🔐 Segurança

- Nunca commitar `.env` ou `.env.local`
- Usar variáveis de ambiente da Vercel para credenciais
- `.gitignore` já está configurado

## 📚 Documentação Adicional

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Functions](https://vercel.com/docs/functions/serverless-functions)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
