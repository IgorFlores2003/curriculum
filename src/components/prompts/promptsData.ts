export interface PromptSection {
  id: string;
  title: string;
  description: string;
  fieldsToFill?: string[];
  promptText?: string;
  exampleData?: string;
  expectedResult?: string;
}

export const promptsData: PromptSection[] = [
  {
    id: "01",
    title: "01 Cabeçalho",
    description: "Organizar o cabeçalho do currículo de forma profissional e limpa.",
    fieldsToFill: [
      "Nome completo",
      "Celular (com DDD)",
      "E-mail",
      "Cidade e Estado",
      "LinkedIn (se houver)",
      "GitHub (se houver)",
      "Portfólio (se houver)",
    ],
    promptText: `Você é um especialista em currículos profissionais. Vou te fornecer as informações de contato de um candidato e quero que você organize o cabeçalho do currículo de forma clara, profissional e moderna.

INFORMAÇÕES DO CANDIDATO:
Nome: [NOME COMPLETO]
Celular: [NÚMERO COM DDD]
E-mail: [E-MAIL]
Cidade/Estado: [CIDADE – ESTADO]
LinkedIn: [URL DO LINKEDIN, se houver]
GitHub: [URL DO GITHUB, se houver]
Portfólio: [URL DO PORTFÓLIO, se houver]

INSTRUÇÕES:
• Organize as informações de forma limpa e profissional
• O nome deve aparecer em destaque
• Não inclua foto, CPF, RG, data de nascimento, estado civil ou endereço completo
• Use separadores simples como | entre os itens na mesma linha
• Formate de modo que fique pronto para ser copiado e colado no Word ou Google Docs

Entregue o cabeçalho formatado e pronto para uso.`,
    exampleData: `Nome: João Pedro Oliveira
Celular: (35) 99123-4567
E-mail: joao.oliveira@gmail.com
Cidade: Pouso Alegre – MG
LinkedIn: linkedin.com/in/joaopedro`,
    expectedResult: `JOÃO PEDRO OLIVEIRA
(35) 99123-4567 | joao.oliveira@gmail.com
Pouso Alegre – MG | linkedin.com/in/joaopedro`
  },
  {
    id: "02",
    title: "02 Objetivo",
    description: "Criar o objetivo profissional de forma clara e direta.",
    fieldsToFill: [
      "Área de interesse",
      "Cargo ou função"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar o campo “Objetivo Profissional” para currículo, usando linguagem simples, direta, profissional e adequada para processos seletivos.

O objetivo profissional deve ser curto, específico e sem linguagem sensacionalista. Ele deve indicar de forma clara a área em que a pessoa deseja atuar, estagiar ou ingressar.

Use estruturas como:

Objetivo: estagiar na área de [área], com foco em [atividades ou subáreas].
Objetivo: atuar na área de [área], com foco em [atividades ou subáreas].
Objetivo: ingressar na área de [área], com foco em [atividades ou subáreas].

Crie um objetivo profissional para currículo com base nas informações fornecidas.

Regras obrigatórias:
1. Não invente informações;
2. Não use linguagem sensacionalista;
3. Não use frases genéricas;
4. Não use frases longas;
5. Não use linguagem rebuscada;
6. Não escreva em primeira pessoa;
7. Não diga que a pessoa é especialista se ainda está em formação;
8. Não transforme o objetivo em resumo profissional;
9. Não coloque várias competências no objetivo;
10. Use apenas uma frase;
11. Priorize estruturas simples, como “estagiar na área de”, “atuar na área de” ou “ingressar na área de”;
12. Se for estágio, comece preferencialmente com “Estagiar na área de”;
13. Se for primeiro emprego, use “Atuar na área de” ou “Ingressar na área de”;
14. Se houver vaga específica, adapte o objetivo para essa vaga;
15. Se houver subáreas ou atividades de interesse, use apenas as mais importantes;
16. Não use expressões como “profissional altamente qualificado”, “sólida experiência”, “apaixonado por”, “em busca de crescimento”, “contribuir para o sucesso da empresa” ou “agregar valor”.

Formato da resposta:
OBJETIVO:
[texto do objetivo]`,
    exampleData: `Área de interesse: Psicologia Organizacional e do Trabalho
Cargo ou função: Estágio em RH / Recrutamento e Seleção`,
    expectedResult: `OBJETIVO:
Estagiar na área de Psicologia Organizacional e do Trabalho, com foco em Recrutamento e Seleção.`
  },
  {
    id: "03",
    title: "Formação Acadêmica",
    description: "Organizar a seção de formação acadêmica de forma profissional e completa.",
  },
  {
    id: "04",
    title: "Experiência Profissional",
    description: "Reescrever as experiências profissionais com verbos de ação e linguagem profissional.",
  },
  {
    id: "05",
    title: "Cursos Complementares",
    description: "Organizar a seção de cursos complementares e certificações de forma profissional.",
  },
  {
    id: "06",
    title: "Competências e Habilidades",
    description: "Criar uma seção de competências relevante e específica para a área de atuação.",
  },
  {
    id: "07",
    title: "Informações Complementares e Idiomas",
    description: "Organizar idiomas e informações complementares de forma clara e profissional.",
  }
];
