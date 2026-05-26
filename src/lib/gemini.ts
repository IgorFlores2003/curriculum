export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  skills: string[];
  languages?: { language: string; level: string }[];
}

const SYSTEM_PROMPT = `Você é um especialista em criação de currículos profissionais. 
O usuário vai te descrever suas experiências, habilidades e informações em linguagem natural.
Você DEVE retornar APENAS um objeto JSON válido (sem markdown, sem explicações, apenas o JSON puro) 
seguindo exatamente esta estrutura:

{
  "name": "Nome Completo",
  "title": "Título Profissional (ex: Desenvolvedor Full Stack Senior)",
  "contact": {
    "email": "email@exemplo.com",
    "phone": "(11) 99999-9999",
    "location": "Cidade, Estado",
    "linkedin": "linkedin.com/in/usuario",
    "github": "github.com/usuario"
  },
  "summary": "Resumo profissional impactante em 2-3 frases",
  "experience": [
    {
      "company": "Nome da Empresa",
      "role": "Cargo",
      "period": "Jan 2020 - Presente",
      "description": [
        "Conquista ou responsabilidade 1 com impacto mensurável",
        "Conquista ou responsabilidade 2",
        "Conquista ou responsabilidade 3"
      ]
    }
  ],
  "education": [
    {
      "institution": "Nome da Instituição",
      "degree": "Curso / Grau",
      "period": "2018 - 2022"
    }
  ],
  "skills": ["Habilidade 1", "Habilidade 2", "Habilidade 3"],
  "languages": [
    { "language": "Português", "level": "Nativo" },
    { "language": "Inglês", "level": "Avançado" }
  ]
}

Preencha todos os campos que o usuário mencionar. Para campos não mencionados, omita-os ou use string vazia.
Se o usuário mencionar tecnologias, adicione-as em skills.
Crie um summary profissional e impactante baseado nas informações fornecidas.
RETORNE APENAS O JSON, SEM MAIS NADA.`;

export async function generateResume(
  userInput: string,
  apiKey: string
): Promise<ResumeData> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: `${SYSTEM_PROMPT}\n\n---\n\nInformações do usuário:\n${userInput}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json();
    const message = error?.error?.message || "Erro desconhecido na API Gemini";
    throw new Error(message);
  }

  const data: GeminiResponse = await response.json();
  const rawText = data.candidates[0]?.content?.parts[0]?.text ?? "";

  const cleaned = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const resume: ResumeData = JSON.parse(cleaned);
  return resume;
}
