# Guia de Deploy na Vercel

## Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Git instalado
3. Projeto enviado para GitHub, GitLab ou Bitbucket

## Método 1: Deploy via CLI (Recomendado)

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na pasta `backend/`:
```bash
OPENAI_API_KEY=sua_chave_openai_aqui
```

### 3. Fazer login
```bash
vercel login
```

### 4. Deploy
```bash
cd backend
vercel
```

Na primeira vez, o Vercel perguntará:
- Deseja vincular a um projeto existente? (Não, para novo projeto)
- Configuração do projeto (aceite os padrões)

### 5. Configurar variáveis de ambiente na Vercel
Após o primeiro deploy, acesse seu projeto em https://vercel.com/dashboard e:
1. Vá para Settings > Environment Variables
2. Adicione `OPENAI_API_KEY` com seu valor
3. Deploy novamente

## Método 2: Deploy via GitHub

### 1. Fazer push do código para GitHub
```bash
git add .
git commit -m "Setup Vercel deployment"
git push
```

### 2. Conectar no painel Vercel
1. Acesse https://vercel.com/new
2. Selecione seu repositório
3. Verifique as configurações (Root Directory: `backend`)
4. Clique em "Deploy"

### 3. Adicionar variáveis de ambiente
No painel da Vercel, vá para Settings > Environment Variables e adicione:
- `OPENAI_API_KEY`: sua chave da OpenAI

## Endpoints após deploy

Seu backend estará disponível em: `https://seu-projeto-vercel.vercel.app`

Endpoints principais:
- `POST /api/analisar` - Análise de cartas (enviar frente e verso como FormData)
- `GET /api/health` - Verificar status do servidor

## Troubleshooting

### Erro ao fazer build
- Verifique se todas as dependências em `package.json` estão corretas
- Teste localmente: `npm install && npm start`

### Erro de timeout
- A análise com GPT-4V pode levar tempo. O limite padrão é 30s (já configurado no `vercel.json`)

### Variáveis de ambiente não carregando
- Verifique se adicionou as variáveis no painel da Vercel
- Redeploy após adicionar variáveis

## Verificar logs
```bash
vercel logs
```

## Redeployar
```bash
vercel --prod
```
