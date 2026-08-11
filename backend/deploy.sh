#!/bin/bash

# Script para fazer deploy na Vercel sem instalar globalmente

echo "🚀 Iniciando deploy na Vercel..."

# Verifica se está na pasta correta
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json não encontrado. Execute este script da pasta 'backend'"
    exit 1
fi

# Cria .env.local se não existir
if [ ! -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local não encontrado"
    echo "📝 Crie .env.local com seu OPENAI_API_KEY antes de continuar:"
    echo "   echo 'OPENAI_API_KEY=sua_chave_aqui' > .env.local"
    exit 1
fi

# Faz deploy usando npx
echo "📦 Iniciando deploy..."
npx vercel --prod

echo "✅ Deploy concluído!"
echo "📍 Verifique o status em: https://vercel.com/dashboard"
