export interface CheckItem {
  text: string;
}

export interface OrientacaoItem {
  text: string;
}

export interface AnteDepoisItem {
  ruim: string;
  bom: string;
  contexto: string;
}

export interface SecaoRoteiro {
  id: string;
  titulo: string;
  icone: 'User' | 'Target' | 'GraduationCap' | 'Briefcase' | 'Zap' | 'ScrollText' | 'Globe' | 'Star';
  descricao: string;
  observar: CheckItem[];
  orientar: OrientacaoItem[];
  anteDepois: AnteDepoisItem;
  prompt: string;
}

export const roteiroData: SecaoRoteiro[] = [
  {
    id: 'dados-pessoais',
    titulo: 'Dados Pessoais e Cabeçalho',
    icone: 'User',
    descricao: 'O cabeçalho é a primeira impressão do candidato. Deve conter informações de contato essenciais, organizadas e profissionais.',
    observar: [
      { text: 'O nome está em destaque, com fonte maior e negrito?' },
      { text: 'Há telefone com DDD e email profissional (não apelidos ou datas de nascimento no email)?' },
      { text: 'O endereço está completo? (Cidade e estado são suficientes — rua e número não são obrigatórios)' },
      { text: 'LinkedIn está presente? URL personalizada ou somente perfil genérico?' },
      { text: 'Foto foi incluída? Se sim: fundo neutro, traje adequado, expressão profissional?' },
      { text: 'Há informações desnecessárias como CPF, RG, estado civil, religião, altura, peso?' },
    ],
    orientar: [
      { text: 'Emails como "gatinha2003@" ou "dragonfire@" devem ser trocados por nome.sobrenome@gmail.com' },
      { text: 'Não é obrigatório colocar foto, mas se colocar, deve ser profissional — selfie casual é um sinal negativo.' },
      { text: 'CPF, RG, estado civil, religião e outras informações pessoais não devem constar no currículo.' },
      { text: 'Perfil no LinkedIn deve estar atualizado e coerente com o currículo.' },
    ],
    anteDepois: {
      contexto: 'Cabeçalho com informações inadequadas',
      ruim: 'Maria da Silva\nRua das Flores, 123, ap. 4 — Pouso Alegre/MG\nCPF: 123.456.789-00 | Solteira | 22 anos\ngatacorajosa2003@hotmail.com | (35) 99999-9999',
      bom: 'Maria da Silva\nPouso Alegre, MG\nmaria.silva@gmail.com | (35) 99999-9999\nlinkedin.com/in/mariasilva',
    },
    prompt: `Analise o cabeçalho deste currículo e aponte problemas como: emails não profissionais, informações desnecessárias (CPF, estado civil, religião, peso, altura), ausência de dados essenciais (telefone, email, cidade/estado) e como o LinkedIn está apresentado. Sugira uma versão melhorada do cabeçalho.

Cabeçalho atual:
[COLE O CABEÇALHO AQUI]`,
  },

  {
    id: 'objetivo',
    titulo: 'Objetivo Profissional',
    icone: 'Target',
    descricao: 'O objetivo mostra ao recrutador para qual vaga o candidato está se candidatando e qual é sua motivação. Deve ser conciso, claro e alinhado à vaga.',
    observar: [
      { text: 'O objetivo está presente no currículo?' },
      { text: 'É específico para a área/vaga, ou é genérico demais ("trabalhar na empresa" / "crescer profissionalmente")?' },
      { text: 'É breve (1-2 linhas)? Textos longos no objetivo são um erro comum.' },
      { text: 'Menciona o cargo ou área desejada de forma clara?' },
      { text: 'Usa linguagem profissional? Evita termos vagos como "dedicado", "esforçado", "compromissado"?' },
    ],
    orientar: [
      { text: 'Oriente o aluno a ser específico: "Estágio na área de Recursos Humanos" é melhor que "Conquistar um bom emprego".' },
      { text: 'O objetivo deve mudar conforme a vaga — currículo genérico tem menos chances.' },
      { text: 'Evitar: "Trabalhar em empresa de renome para crescer profissionalmente e contribuir com minha experiência." — Este é o erro mais comum.' },
      { text: 'O objetivo não é um texto motivacional — é a indicação da posição desejada.' },
    ],
    anteDepois: {
      contexto: 'Objetivo profissional vago x específico',
      ruim: 'Objetivo: Trabalhar em uma empresa de renome onde possa aplicar meu esforço e dedicação, crescendo profissional e pessoalmente e contribuindo para o sucesso da organização.',
      bom: 'Objetivo: Estágio em Recursos Humanos, com foco em recrutamento e seleção.',
    },
    prompt: `Avalie o objetivo profissional deste currículo. Ele deve ser: específico (mencionar o cargo ou área), breve (1-2 linhas), profissional (sem termos vagos como "crescer", "me dedicar", "empresa de renome"). Identifique os problemas e reescreva um objetivo profissional ideal para este perfil.

Objetivo atual:
[COLE O OBJETIVO AQUI]

Área/vaga que o candidato deseja:
[INFORME A ÁREA OU VAGA DESEJADA]`,
  },

  {
    id: 'formacao',
    titulo: 'Formação Acadêmica',
    icone: 'GraduationCap',
    descricao: 'Apresenta o histórico de educação formal. Para universitários, é uma das seções mais importantes. Deve seguir ordem cronológica decrescente.',
    observar: [
      { text: 'O curso de graduação está listado com nome completo da instituição?' },
      { text: 'O período (ano de início e previsão de conclusão) está informado?' },
      { text: 'A formação está em ordem cronológica decrescente (mais recente primeiro)?' },
      { text: 'Para quem ainda está cursando, está escrito "(em andamento)" ou "Previsão de conclusão: [ano]"?' },
      { text: 'Ensino médio: necessário apenas para quem ainda não concluiu o ensino superior.' },
      { text: 'Intercâmbio ou dupla diplomação estão destacados?' },
    ],
    orientar: [
      { text: 'A ordem cronológica deve ser decrescente: primeiro o que é mais recente (graduação atual).' },
      { text: 'Quem está no ensino superior não precisa listar o ensino médio, a menos que seja de escola técnica relevante.' },
      { text: 'Sempre informar se o curso está em andamento para não confundir o recrutador.' },
      { text: 'Nome da instituição deve estar por extenso, sem siglas (ex: Univás, não UNV).' },
    ],
    anteDepois: {
      contexto: 'Formação com erros de ordem e informação incompleta',
      ruim: 'Formação:\n- Ensino Médio — Escola Estadual São João (2019)\n- Psicologia — Univás (cursando)',
      bom: 'Formação Acadêmica:\n- Psicologia — Universidade do Vale do Sapucaí (Univás)\n  2022 – Previsão de conclusão: 2026',
    },
    prompt: `Analise a seção de formação acadêmica deste currículo. Verifique: ordem cronológica decrescente, nome completo das instituições, se está indicado que o curso está em andamento (quando for o caso), e se o ensino médio é necessário. Reescreva a seção de forma profissional.

Formação atual:
[COLE A SEÇÃO DE FORMAÇÃO AQUI]`,
  },

  {
    id: 'experiencia',
    titulo: 'Experiência Profissional',
    icone: 'Briefcase',
    descricao: 'A seção mais importante para recrutadores. Deve mostrar o que o candidato fez, os resultados obtidos e as responsabilidades em cada cargo.',
    observar: [
      { text: 'As experiências estão em ordem cronológica decrescente?' },
      { text: 'Cada cargo tem: nome da empresa, cargo, período (mês/ano – mês/ano) e descrição das atividades?' },
      { text: 'A descrição usa verbos de ação no infinitivo (Desenvolver, Atender, Analisar, Implementar)?' },
      { text: 'Há resultados ou conquistas mensuráveis? (ex: "Aumentei as vendas em 30%", "Atendi 50 clientes/dia")' },
      { text: 'Estágios, trabalhos voluntários e informais estão incluídos quando relevantes?' },
      { text: 'Para quem não tem experiência formal: há atividades extracurriculares, projetos acadêmicos, iniciação científica?' },
    ],
    orientar: [
      { text: 'Trocar frases passivas por verbos de ação: em vez de "era responsável por", usar "Gerenciar", "Executar", "Coordenar".' },
      { text: 'Sempre que possível, incluir números e resultados: quantidade de atendimentos, % de melhoria, tamanho da equipe.' },
      { text: 'Quem não tem experiência pode incluir: projetos acadêmicos, TCC em andamento, estágios obrigatórios, trabalho voluntário, ligas acadêmicas.' },
      { text: 'Período sem emprego formal não precisa ser explicado — basta não mencionar.' },
    ],
    anteDepois: {
      contexto: 'Descrição de cargo vaga x com verbos de ação e resultado',
      ruim: 'Assistente Administrativo — Empresa X (2022-2023)\nEra responsável por fazer atendimento ao cliente, organizar documentos e ajudar os outros setores quando necessário.',
      bom: 'Assistente Administrativo — Empresa X\nJan 2022 – Dez 2023\n• Atender clientes presencialmente e por telefone (média de 40 atendimentos/dia)\n• Organizar e arquivar documentos fiscais e contratos\n• Apoiar setores de RH e financeiro em demandas pontuais',
    },
    prompt: `Reescreva a seção de experiência profissional deste currículo, aplicando as seguintes melhorias: usar verbos de ação no infinitivo, incluir resultados mensuráveis quando possível, garantir ordem cronológica decrescente e formatar cada cargo com empresa, período e bullet points de atividades.

Experiência atual:
[COLE A SEÇÃO DE EXPERIÊNCIA AQUI]`,
  },

  {
    id: 'habilidades',
    titulo: 'Habilidades e Competências',
    icone: 'Zap',
    descricao: 'Lista as habilidades técnicas (hard skills) e comportamentais (soft skills) do candidato. Deve ser relevante, honesta e específica.',
    observar: [
      { text: 'As habilidades estão organizadas (técnicas separadas das comportamentais)?' },
      { text: 'Há habilidades genéricas demais como "trabalho em equipe", "proatividade", "comunicativo"?' },
      { text: 'As habilidades técnicas são específicas? (ex: Excel avançado, BrOffice, sistema X, plataforma Y)' },
      { text: 'O nível de cada habilidade está claro quando relevante? (Básico / Intermediário / Avançado)' },
      { text: 'Há ferramentas ou softwares relevantes para a área listados?' },
    ],
    orientar: [
      { text: '"Trabalho em equipe", "comunicativo", "proatividade" — todo mundo coloca e não diferencia o candidato. Orientar a substituir por exemplos concretos ou remover.' },
      { text: 'Habilidades técnicas devem ser específicas: não "pacote Office" genérico, mas "Excel (tabelas dinâmicas, fórmulas avançadas)".' },
      { text: 'Para a área de Psicologia: incluir técnicas de entrevista, avaliação psicológica, abordagens teóricas conhecidas, softwares de gestão.' },
      { text: 'Honestidade é fundamental: não colocar "inglês avançado" se for básico — será testado em entrevistas.' },
    ],
    anteDepois: {
      contexto: 'Habilidades genéricas x específicas e organizadas',
      ruim: 'Habilidades: Trabalho em equipe, Comunicativo, Proativo, Organizado, Pacote Office, Internet, Responsável.',
      bom: 'Habilidades Técnicas:\n• Microsoft Excel (intermediário — tabelas e gráficos)\n• Google Workspace (Docs, Sheets, Forms)\n• Técnicas de entrevista por competências\n• Avaliação psicológica (Wisc, Raven)\n\nCompetências:\n• Escuta ativa e comunicação empática\n• Gestão de tempo e organização de agenda',
    },
    prompt: `Analise e reescreva a seção de habilidades deste currículo. Remova habilidades genéricas como "proatividade" e "trabalho em equipe". Organize em: Habilidades Técnicas (hard skills) e Competências (soft skills com exemplos). Seja específico sobre ferramentas, programas e técnicas.

Habilidades atuais:
[COLE A SEÇÃO DE HABILIDADES AQUI]

Área de atuação do candidato:
[INFORME A ÁREA]`,
  },

  {
    id: 'cursos',
    titulo: 'Cursos e Certificações',
    icone: 'ScrollText',
    descricao: 'Complementa a formação com cursos livres, treinamentos e certificações relevantes para a área.',
    observar: [
      { text: 'Os cursos listados são relevantes para a área ou vaga desejada?' },
      { text: 'A carga horária está informada?' },
      { text: 'O ano de conclusão está presente?' },
      { text: 'Há cursos muito antigos ou desatualizados que poderiam ser removidos?' },
      { text: 'Plataformas de credibilidade são citadas? (ex: Coursera, Senac, CRP, CFP, instituições universitárias)' },
    ],
    orientar: [
      { text: 'Cursos de mais de 5-7 anos em áreas que mudam rapidamente (tecnologia, tendências) devem ser retirados ou avaliados.' },
      { text: 'Incluir sempre a carga horária dá credibilidade ao curso (ex: Curso de Psicologia Organizacional — 40h, Senac, 2023).' },
      { text: 'Cursos online de plataformas reconhecidas têm peso: Coursera, FGV Online, Sebrae, CRP Regional.' },
      { text: 'Evitar listar cursos irrelevantes para a área só para "encher" o currículo.' },
    ],
    anteDepois: {
      contexto: 'Cursos sem informações vs. cursos bem formatados',
      ruim: 'Cursos:\n- Excel\n- Marketing Digital\n- Primeiros Socorros\n- Cabeleireiro',
      bom: 'Cursos e Certificações:\n• Excel Intermediário — Senac, 2024 (20h)\n• Introdução à Psicologia Organizacional — Coursera/USP, 2023 (30h)\n• Técnicas de Entrevista por Competências — CRP-MG, 2024 (8h)',
    },
    prompt: `Analise a seção de cursos e certificações deste currículo. Filtre cursos irrelevantes para a área, adicione informações ausentes (carga horária, ano, instituição) e organize de forma profissional. Mantenha apenas cursos relevantes e recentes.

Cursos atuais:
[COLE A SEÇÃO DE CURSOS AQUI]

Área de atuação:
[INFORME A ÁREA]`,
  },

  {
    id: 'idiomas',
    titulo: 'Idiomas',
    icone: 'Globe',
    descricao: 'Demonstra o domínio de outros idiomas. Deve ser honesto quanto ao nível real, usando nomenclatura padronizada.',
    observar: [
      { text: 'Os níveis estão especificados claramente? (Básico / Intermediário / Avançado / Fluente / Nativo)' },
      { text: 'O candidato diferencia habilidades? (Leitura, Escrita, Conversação)' },
      { text: 'Há certificações de idioma? (TOEFL, IELTS, DELE, DELF, etc.)' },
      { text: 'O nível declarado é condizente com a realidade? (nível superestimado é um erro grave)' },
      { text: 'Português é listado como nativo (dispensável para candidatos brasileiros em vagas locais)?' },
    ],
    orientar: [
      { text: 'Nunca colocar nível acima do real — em entrevistas internacionais, o candidato será testado.' },
      { text: 'Padrão recomendado: Inglês — Intermediário (leitura e escrita) / Espanhol — Básico.' },
      { text: 'Certificações de idioma têm muito mais peso do que autodeclaração: TOEFL, IELTS, Cambridge.' },
      { text: 'Se o candidato tem inglês básico mas tem TOEIC, é melhor mencionar a certificação.' },
    ],
    anteDepois: {
      contexto: 'Nível de idioma vago vs. especificado',
      ruim: 'Idiomas: Inglês (bom), Espanhol (noções).',
      bom: 'Idiomas:\n• Inglês — Intermediário (leitura e escrita avançadas, conversação básica)\n• Espanhol — Básico (leitura)',
    },
    prompt: `Avalie e reformate a seção de idiomas deste currículo. Use a nomenclatura padrão (Básico / Intermediário / Avançado / Fluente / Nativo). Se houver certificações, destaque-as. Questione se o nível declarado é realista e sugira como apresentar de forma honesta e profissional.

Idiomas atuais:
[COLE A SEÇÃO DE IDIOMAS AQUI]`,
  },

  {
    id: 'extras',
    titulo: 'Informações Complementares',
    icone: 'Star',
    descricao: 'Inclui voluntariado, projetos, publicações, premiações, atividades extracurriculares e outras informações que agregam valor ao perfil.',
    observar: [
      { text: 'Há atividades voluntárias, projetos sociais ou engajamento em associações?' },
      { text: 'Há participação em ligas acadêmicas, grupos de pesquisa, iniciação científica?' },
      { text: 'Publicações, artigos, TCC premiado ou apresentações em eventos estão listados?' },
      { text: 'Há hobbies listados? Se sim, são profissionalmente relevantes ou complementam o perfil?' },
      { text: 'CNH está listada quando relevante para a vaga?' },
      { text: 'Disponibilidade para viagens ou mudança de cidade está indicada quando relevante?' },
    ],
    orientar: [
      { text: 'Para candidatos sem experiência formal, esta seção pode compensar: trabalho voluntário, projetos acadêmicos e participação em eventos mostram proatividade.' },
      { text: 'Hobbies só devem aparecer se forem relevantes (ex: candidato a vaga de RH que pratica esportes coletivos → mostra trabalho em equipe).' },
      { text: 'Liga Acadêmica, Empresa Júnior, Movimento Estudantil são experiências muito valorizadas para universitários.' },
      { text: 'CNH: incluir apenas se for requisito ou diferencial para a vaga.' },
    ],
    anteDepois: {
      contexto: 'Extras irrelevantes vs. complementares estratégicos',
      ruim: 'Outros: Gosto de assistir séries, ouvir música, passear com meu cachorro. Tenho CNH categoria B.',
      bom: 'Informações Complementares:\n• Membro da Liga Acadêmica de Saúde Mental — Univás (2023–atual)\n• Voluntária no Projeto de Extensão "Escuta Ativa" — atendimento psicossocial a comunidades vulneráveis\n• Apresentação de artigo no Congresso Mineiro de Psicologia, 2024\n• CNH categoria B',
    },
    prompt: `Analise a seção de informações complementares deste currículo. Identifique o que deve ser mantido, o que deve ser removido e o que está faltando. Sugira como valorizar experiências extracurriculares, voluntárias e acadêmicas para compensar falta de experiência profissional formal.

Informações complementares atuais:
[COLE A SEÇÃO AQUI]

Perfil do candidato (área, semestre, se tem experiência formal):
[DESCREVA O PERFIL]`,
  },
];
