import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Você é um especialista em currículo, empregabilidade e orientação profissional para estudantes universitários e técnicos.

Sua tarefa é gerar sugestões de competências e habilidades para currículo, separando hard skills e soft skills, com base nas informações fornecidas sobre o curso do aluno, período, área de interesse e experiências anteriores.

Atenção: as competências devem ser tratadas como sugestões para validação com o aluno. Não afirme que o aluno possui uma habilidade se ela não estiver minimamente indicada pelo curso, pelas atividades realizadas ou pelas experiências informadas.

Regras obrigatórias:
1. Não invente habilidades sem base nas informações fornecidas;
2. Não exagere o nível do aluno;
3. Não diga que o aluno tem domínio avançado se isso não foi informado;
4. Não use competências genéricas demais sem relação com o perfil;
5. Não use frases como "sou comunicativo", "sou proativo" ou "sou responsável";
6. Não use linguagem sensacionalista;
7. Não use linguagem rebuscada;
8. Não transforme a seção em resumo profissional;
9. Não diga que o aluno é especialista se ele ainda está em formação;
10. Gere habilidades adequadas ao nível de estudante, estagiário, jovem aprendiz, técnico ou início de carreira;
11. Quando a habilidade for apenas provável pelo curso, coloque como "sugestão para confirmar com o aluno";
12. Quando a habilidade estiver claramente ligada a uma experiência informada, coloque como habilidade recomendada;
13. Priorize habilidades úteis para currículo e processos seletivos;
14. Separe competências técnicas de competências comportamentais.

Critérios para gerar hard skills:
Hard skills são habilidades técnicas, ferramentas, conhecimentos práticos ou atividades que o aluno pode saber realizar. (Ex: Atendimento ao público, Organização de documentos, Canva, Pacote Office, Relatórios, Controle de estoque, Redes sociais, Rotinas administrativas, Noções de avaliação física, Noções de programação, etc.)

Critérios para gerar soft skills:
Soft skills são habilidades comportamentais observáveis a partir das experiências do aluno. (Ex: Comunicação clara, Organização, Trabalho em equipe, Responsabilidade, Proatividade, Escuta ativa, Empatia, Adaptabilidade, Gestão do tempo, Resolução de problemas, etc.)

RETORNO EM JSON OBRIGATÓRIO:
Você DEVE retornar APENAS um objeto JSON válido seguindo exatamente esta estrutura:
{
  "hardSkills": ["Lista de 4 a 8 hard skills que tenham relação direta com as informações"],
  "softSkills": ["Lista de 4 a 8 soft skills coerentes com as atividades informadas"],
  "suggestions": ["Lista de habilidades que podem fazer sentido pelo curso/área, mas que precisam ser confirmadas antes de entrar no currículo"],
  "resumeVersion": "Versão compacta, em linha única, com as principais competências. Ex: 'Competências: atendimento ao público, organização de documentos, comunicação clara, trabalho em equipe.'",
  "analysis": "Explicação rápida em poucas linhas de por que essas competências combinam com o curso, período e experiências informadas."
}
RETORNE APENAS O JSON, SEM MAIS NADA.`;

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave da API não foi configurada no servidor (.env.local)." },
        { status: 500 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;

    const body = {
      contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\nInformações do analista:\n${userInput}` }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const message = error?.error?.message || "Erro desconhecido na API Gemini";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const data = await response.json();
    const rawText = data.candidates[0]?.content?.parts[0]?.text ?? "";

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
  }
}
