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
    title: "Cabeçalho",
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
    title: "Objetivo",
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
    fieldsToFill: [
      "Nome do curso",
      "Nome da instituição",
      "Período (Início e Fim)"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar ou corrigir a seção “Formação Acadêmica” de um currículo, usando linguagem objetiva, simples e profissional.

A formação deve ser apresentada de forma limpa, seguindo este padrão:

FORMAÇÃO ACADÊMICA

Nome do curso
Nome da instituição
Data de início a data de conclusão ou previsão de conclusão

Regras obrigatórias:
1. Não peça nome do aluno;
2. Não peça dados pessoais;
3. Não inclua informações desnecessárias;
4. Não inclua ensino fundamental;
5. Inclua ensino médio apenas se for a formação principal ou se for curso técnico integrado relevante;
6. Organize as formações da mais recente para a mais antiga;
7. Coloque primeiro o nome do curso;
8. Na linha de baixo, coloque o nome da instituição;
9. Na linha seguinte, coloque data de início e conclusão, ou previsão de conclusão;
10. Se o curso estiver em andamento, use “Cursando” ou “Previsão de conclusão”;
11. Se o curso já foi concluído, use “Concluído em” ou informe o período completo;
12. Não invente instituição, período, datas ou tipo de formação;
13. Não coloque cursos livres nesta seção;
14. Cursos livres, palestras, oficinas, congressos e certificações devem ficar em “Cursos Complementares e Certificações”;
15. Use escrita simples, direta e adequada para currículo;
16. Não use linguagem rebuscada;
17. Não use frases longas;
18. Não use comentários explicativos dentro da formação final;
19. Retorne apenas a seção pronta para copiar no currículo.

Com base nas informações fornecidas, gere a seção “Formação Acadêmica”.

Formato obrigatório da resposta:

FORMAÇÃO ACADÊMICA

[Nome do curso]
[Nome da instituição]
[Data de início a data de conclusão ou previsão de conclusão]

[Nome do curso técnico ou outra formação relevante, se houver]
[Nome da instituição]
[Data de início a data de conclusão ou ano de conclusão]`,
    exampleData: `Curso: Psicologia
Instituição: Univás
Período: Início em 2022, previsão de conclusão para 2026`,
    expectedResult: `FORMAÇÃO ACADÊMICA

Psicologia
Univás
2022 – Previsão de conclusão em 2026`
  },
  {
    id: "04",
    title: "Experiência Profissional",
    description: "Reescrever as experiências profissionais com verbos de ação e linguagem profissional.",
    fieldsToFill: [
      "Nome da empresa",
      "Cargo ou função",
      "Período",
      "Atividades realizadas"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar ou corrigir a seção “Experiência Profissional” de um currículo, usando linguagem objetiva, simples e profissional.

A experiência deve ser apresentada de forma limpa, seguindo este padrão:

EXPERIÊNCIA PROFISSIONAL

Nome da empresa, instituição ou projeto
Cargo ou função
Data de início a data de término ou atualmente

Atividade realizada;
Atividade realizada;
Atividade realizada;
Última atividade realizada.

Regras obrigatórias:
1. Não peça nome do aluno;
2. Não peça dados pessoais;
3. Não inclua informações desnecessárias;
4. Organize sempre da experiência mais recente para a mais antiga;
5. A experiência atual deve aparecer primeiro;
6. Coloque primeiro o nome da empresa, instituição ou projeto;
7. Na linha de baixo, coloque o cargo ou função exercida;
8. Na linha seguinte, coloque o período de atuação;
9. Depois, liste de 3 a 5 atividades realizadas no cargo;
10. Use verbos de ação, como realizei, organizei, apoiei, acompanhei, elaborei, atendi, registrei, auxiliei, planejei, desenvolvi, participei e contribuí;
11. Reescreva atividades simples de forma mais profissional, sem exagerar;
12. Não invente empresa, cargo, período, atividades, resultados ou ferramentas;
13. Não use linguagem sensacionalista;
14. Não use linguagem rebuscada;
15. Não use frases genéricas;
16. Não use primeira pessoa fora dos tópicos de atividades;
17. Não diga que a pessoa liderou, coordenou ou desenvolveu algo se isso não foi informado;
18. Se houver resultados ou aprendizados informados, inclua de forma simples;
19. Se não houver experiência formal, use experiências acadêmicas, estágios, projetos, voluntariado, empresa familiar, trabalhos informais ou atividades práticas, desde que tenham sido informadas;
20. Se a experiência não tiver relação direta com a vaga, destaque atividades transferíveis, como atendimento, organização, comunicação, controle de informações, trabalho em equipe e responsabilidade;
21. Os tópicos devem terminar com ponto e vírgula;
22. O último tópico de cada experiência deve terminar com ponto final;
23. Retorne apenas a seção pronta para copiar no currículo.

Com base nas informações fornecidas, gere a seção “Experiência Profissional”.

Formato obrigatório da resposta:

EXPERIÊNCIA PROFISSIONAL

[Nome da empresa, instituição ou projeto]
[Cargo ou função]
[Data de início a data de término ou atualmente]

[Atividade realizada];
[Atividade realizada];
[Atividade realizada];
[Última atividade realizada].`,
    exampleData: `Empresa: Supermercado Central
Cargo: Atendente de caixa
Período: 2021 a 2023
Atividades: Eu ficava no caixa, atendia os clientes, passava os produtos e fechava o caixa no fim do dia.`,
    expectedResult: `EXPERIÊNCIA PROFISSIONAL

Supermercado Central
Atendente de Caixa
2021 – 2023

Atendi e prestei suporte aos clientes com excelência e cordialidade;
Operei o sistema de PDV para registro e cobrança de mercadorias;
Realizei o controle e o fechamento diário do caixa;
Organizei o fluxo de atendimento para garantir a agilidade e a satisfação do cliente.`
  },
  {
    id: "05",
    title: "Competências e Habilidades",
    description: "Criar uma seção de competências relevante e específica para a área de atuação.",
    fieldsToFill: [
      "Curso e Período",
      "Experiências Prévias",
      "Ferramentas Dominadas"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar ou corrigir a seção “Competências e Habilidades” de um currículo, usando linguagem objetiva, simples e profissional.

A seção deve ser apresentada em formato de lista única. Liste primeiro as competências técnicas e, em seguida, as competências comportamentais, sem separar por subtítulos.

Regras obrigatórias:
1. Não peça nome do aluno;
2. Não peça dados pessoais;
3. Não inclua informações desnecessárias;
4. Não invente habilidades que não tenham relação com o curso, período, experiências, atividades ou ferramentas informadas;
5. Não exagere o nível do aluno;
6. Não diga que o aluno tem nível avançado em uma ferramenta se isso não foi informado;
7. Não use competências genéricas demais sem relação com o perfil;
8. Não use frases como “sou comunicativo”, “sou proativo” ou “sou responsável”;
9. Use apenas nomes de competências e habilidades;
10. Liste primeiro as competências técnicas;
11. Liste depois as competências comportamentais;
12. Não crie subtítulos separando técnicas e comportamentais;
13. Priorize habilidades úteis para currículo e processos seletivos;
14. Gere habilidades coerentes com o nível de estudante, estagiário, jovem aprendiz, técnico ou início de carreira;
15. Se houver experiências anteriores, use essas experiências para sugerir competências mais específicas;
16. Se houver ferramentas informadas, inclua apenas as ferramentas citadas;
17. Não use linguagem sensacionalista;
18. Não use linguagem rebuscada;
19. Não transforme a seção em resumo profissional;
20. Não faça análise ou comentário explicativo;
21. Use tópicos curtos;
22. Cada tópico deve terminar com ponto e vírgula;
23. O último tópico deve terminar com ponto final;
24. Retorne apenas a seção pronta para copiar no currículo.

Com base nas informações fornecidas, gere a seção “Competências e Habilidades”.

Formato obrigatório da resposta:

COMPETÊNCIAS E HABILIDADES

• [competência técnica];
• [competência técnica];
• [competência técnica];
• [competência comportamental];
• [competência comportamental];
• [última competência comportamental].`,
    exampleData: `Estuda Engenharia de Computação (4º período).
Sabe programar em Python, Java e C++.
Fez um projeto na faculdade liderando um grupo de 5 pessoas. 
Sabe usar o Git.`,
    expectedResult: `COMPETÊNCIAS E HABILIDADES

• Lógica de programação;
• Desenvolvimento em Python, Java e C++;
• Versionamento de código com Git;
• Trabalho em equipe;
• Liderança de projetos colaborativos;
• Resolução de problemas.`
  },
  {
    id: "06",
    title: "Informações Complementares",
    description: "Organizar idiomas e informações complementares de forma clara e profissional.",
    fieldsToFill: [
      "Idiomas",
      "CNH / Disponibilidade",
      "Projetos / Voluntariado",
      "Portfólio / Sites"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar ou corrigir a seção “Informações Complementares” de um currículo, usando linguagem objetiva, simples e profissional.

A seção deve ser apresentada em formato de lista única, contendo apenas informações úteis para o currículo.

Podem entrar nessa seção, quando informado:
• Idiomas e nível;
• CNH e categoria;
• Disponibilidade para viagens;
• Disponibilidade para mudança;
• Disponibilidade de horário;
• Modelo de trabalho desejado;
• Disponibilidade para início;
• Projetos relevantes;
• Trabalho voluntário;
• Intercâmbio ou vivência internacional;
• Portfólio, GitHub, Behance ou site;
• Outras informações realmente relevantes para a vaga.

Regras obrigatórias:
1. Não peça nome do aluno;
2. Não peça dados pessoais;
3. Não inclua informações desnecessárias;
4. Não invente idiomas, níveis, CNH, disponibilidade, projetos ou qualquer outra informação;
5. Inclua idioma apenas se tiver sido informado;
6. Informe o idioma com nível claro, como básico, intermediário, avançado ou fluente;
7. Não use expressões como “sei um pouco”, “mais ou menos” ou “tenho noção”;
8. Inclua CNH apenas se o aluno possuir;
9. Inclua a categoria da CNH apenas se ela tiver sido informada;
10. Inclua disponibilidade para viagens, mudança, horário ou início apenas se isso tiver sido informado;
11. Inclua projetos, trabalho voluntário, portfólio, GitHub, Behance ou site apenas se fortalecerem o currículo;
12. Não inclua CPF, RG, número de documentos, nome dos pais ou endereço completo;
13. Não inclua estado civil, idade, religião, filhos ou informações íntimas;
14. Não use linguagem sensacionalista;
15. Não use linguagem rebuscada;
16. Não faça análise ou comentário explicativo;
17. Use tópicos curtos;
18. Cada tópico deve terminar com ponto e vírgula;
19. O último tópico deve terminar com ponto final;
20. Retorne apenas a seção pronta para copiar no currículo.

Com base nas informações fornecidas, gere a seção “Informações Complementares”.

Formato obrigatório da resposta:

INFORMAÇÕES COMPLEMENTARES

• [informação complementar];
• [informação complementar];
• [informação complementar];
• [última informação complementar].`,
    exampleData: `Tenho carteira de motorista B.
Falo inglês mais ou menos, acho que consigo conversar o básico.
Tenho disponibilidade pra viajar a trabalho.
Participo de um trabalho voluntário na igreja entregando sopa no inverno.`,
    expectedResult: `INFORMAÇÕES COMPLEMENTARES

• CNH Categoria B;
• Inglês Básico;
• Disponibilidade para viagens;
• Trabalho voluntário em ação social com distribuição de alimentos.`
  },
  {
    id: "07",
    title: "Cursos Complementares",
    description: "Organizar a seção de cursos complementares e certificações de forma profissional.",
    fieldsToFill: [
      "Nome do curso",
      "Instituição ou plataforma",
      "Ano de realização",
      "Carga horária (se houver)"
    ],
    promptText: `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes.

Sua tarefa é criar ou corrigir a seção “Cursos Complementares e Certificações” de um currículo, usando linguagem objetiva, simples e profissional.

A seção deve ser apresentada de forma limpa, com cada curso em uma única linha, seguindo este padrão:

CURSOS COMPLEMENTARES E CERTIFICAÇÕES

Nome do curso, Instituição ou plataforma, ano de realização ou conclusão, carga horária se houver.

Regras obrigatórias:
1. Não peça nome do aluno;
2. Não peça dados pessoais;
3. Não inclua informações desnecessárias;
4. Organize sempre do curso mais recente para o mais antigo;
5. Escreva cada curso em uma única linha;
6. Coloque primeiro o nome do curso, palestra, oficina, workshop, congresso ou certificação;
7. Depois, coloque a instituição ou plataforma;
8. Depois, coloque o ano de realização ou conclusão;
9. Inclua carga horária apenas se ela tiver sido informada;
10. Não invente carga horária, instituição, ano ou certificação;
11. Não coloque cursos complementares dentro de “Formação Acadêmica”;
12. Não inclua cursos que não foram informados;
13. Priorize cursos mais relevantes para a vaga, área de interesse ou formação do aluno;
14. Se houver muitos cursos, selecione os mais estratégicos e evite uma lista muito longa;
15. Se os cursos forem parecidos, organize de forma clara, sem repetir informações desnecessárias;
16. Use escrita simples, direta e adequada para currículo;
17. Não use linguagem rebuscada;
18. Não use frases longas;
19. Não faça análise ou comentário explicativo;
20. Retorne apenas a seção pronta para copiar no currículo.

Com base nas informações fornecidas, gere a seção “Cursos Complementares e Certificações”.

Formato obrigatório da resposta:

CURSOS COMPLEMENTARES E CERTIFICAÇÕES

[Nome do curso], [Instituição ou plataforma], [ano de realização ou conclusão], [carga horária se houver].
[Nome do curso], [Instituição ou plataforma], [ano de realização ou conclusão], [carga horária se houver].
[Nome do curso], [Instituição ou plataforma], [ano de realização ou conclusão], [carga horária se houver].`,
    exampleData: `Cursos:
- Inteligência Emocional, Conquer, 2023, 10h
- Curso de Pacote Office, Udemy, fiz no começo de 2022
- Workshop de Recrutamento Tech, evento online pela Gupy em 2024, deu 4h de carga`,
    expectedResult: `CURSOS COMPLEMENTARES E CERTIFICAÇÕES

Workshop de Recrutamento Tech, Gupy, 2024, 4h.
Inteligência Emocional, Conquer, 2023, 10h.
Pacote Office, Udemy, 2022.`
  }
];
