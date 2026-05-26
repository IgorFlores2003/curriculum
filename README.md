# 🎯 Gerador de Currículo com IA

Crie currículos profissionais em PDF usando linguagem natural + Google Gemini AI.

## ✨ Funcionalidades

- **IA Gratuita**: Usa o Google Gemini 2.0 Flash (sem custo)
- **Sem banco de dados**: Tudo salvo em `sessionStorage`
- **PDF profissional**: Layout two-column gerado no navegador
- **Pronto para Vercel**: Deploy com zero configuração

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## 🔑 Obtendo a chave da API (gratuita)

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave e cole no app

**A chave fica apenas no seu navegador (sessionStorage) — nunca vai para nenhum servidor.**

## 🌐 Deploy na Vercel

```bash
npx vercel
```

Ou conecte o repositório GitHub diretamente na Vercel.

## 🛠 Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Google Gemini 2.0 Flash** (IA gratuita)
- **jsPDF** (geração de PDF no cliente)
- **sessionStorage** (persistência sem banco)
