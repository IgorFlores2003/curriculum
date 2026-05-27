"use client";

import { useState, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { getLastInput, saveLastInput } from "@/lib/storage";

interface StudentFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

const EXAMPLE = `Nome: João da Silva
Email: joao.silva@email.com | Telefone: (35) 99123-4567
Cidade: Pouso Alegre, MG | LinkedIn: linkedin.com/in/joaosilva

Objetivo: Estágio em Psicologia Organizacional

Formação: Cursando Psicologia na Univás — 4º período (previsão de conclusão: 2027)

Experiências:
- Atendente na loja X de jan/2022 a jun/2023 — atendia clientes, organizava estoque, ajudava nas vendas
- Estagiário voluntário no Hospital Y em 2024 — apoio psicológico a pacientes

Habilidades: Excel básico, Word, atendimento ao público, escuta ativa, empatia
Cursos: Curso de Comunicação Não-Violenta (Sebrae, 2023, 20h), Psicologia Positiva (Coursera, 2024)
Idiomas: Inglês intermediário, Espanhol básico
Extras: Membro da Liga Acadêmica de Saúde Mental, voluntária no projeto de extensão Escuta Ativa`;

export default function StudentForm({ onSubmit, loading }: StudentFormProps) {
  const [mode, setMode] = useState<"livre" | "estruturado">("livre");
  const [text, setText] = useState("");

  useEffect(() => {
    setText(getLastInput());
  }, []);

  // Campos estruturados
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [formacao, setFormacao] = useState("");
  const [experiencias, setExperiencias] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [cursos, setCursos] = useState("");
  const [idiomas, setIdiomas] = useState("");
  const [extras, setExtras] = useState("");

  function handleSubmit() {
    let finalText = text;
    if (mode === "estruturado") {
      finalText = [
        nome && `Nome: ${nome}`,
        idade && `Data de Nascimento: ${idade}`,
        (email || telefone) && `Email: ${email} | Telefone: ${telefone}`,
        cidade && `Cidade: ${cidade}`,
        linkedin && `LinkedIn: ${linkedin}`,
        github && `GitHub: ${github}`,
        objetivo && `\nObjetivo: ${objetivo}`,
        formacao && `\nFormação:\n${formacao}`,
        experiencias && `\nExperiências:\n${experiencias}`,
        habilidades && `\nHabilidades: ${habilidades}`,
        cursos && `\nCursos: ${cursos}`,
        idiomas && `\nIdiomas: ${idiomas}`,
        extras && `\nInformações Complementares:\n${extras}`,
      ].filter(Boolean).join("\n");
    }
    saveLastInput(finalText);
    onSubmit(finalText);
  }

  const handlePhone = (v: string) => {
    const d = v.replace(/\D/g, "");
    if (d.length <= 10) setTelefone(d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2").slice(0, 14));
    else setTelefone(d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 15));
  };

  const handleDate = (v: string) => {
    setIdade(v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 10));
  };

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all placeholder:text-slate-300";
  const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";
  const textareaClass = `${inputClass} resize-y min-h-[80px] leading-relaxed`;

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 w-fit">
        {[
          { id: "livre",       label: "Modo Livre",       sub: "Cole qualquer texto" },
          { id: "estruturado", label: "Modo Estruturado", sub: "Campo a campo" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as "livre" | "estruturado")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === m.id
                ? "bg-white text-brand-primary shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Modo Livre */}
      {mode === "livre" && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Informações</label>
            <button
              onClick={() => setText(EXAMPLE)}
              className="text-xs text-brand-primary hover:text-brand-dark font-medium transition-colors"
            >
              Usar exemplo
            </button>
          </div>
          <textarea
            id="student-info-textarea"
            className={`${textareaClass} min-h-[280px] font-mono text-xs`}
            placeholder={`Cole aqui as informações como elas vieram — pode ser texto bagunçado, mensagem de WhatsApp, lista sem formatação...\n\nExemplo:\n${EXAMPLE}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-2">{text.length} caracteres</p>
        </div>
      )}

      {/* Modo Estruturado */}
      {mode === "estruturado" && (
        <div className="animate-fade-in space-y-5">
          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dados Pessoais</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input id="f-nome" className={inputClass} placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              <input id="f-idade" className={inputClass} placeholder="Data de Nascimento (DD/MM/AAAA)" value={idade} onChange={e => handleDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input id="f-email" className={inputClass} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input id="f-telefone" className={inputClass} placeholder="Telefone (Celular)" value={telefone} onChange={e => handlePhone(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input id="f-cidade" className={inputClass} placeholder="Cidade, Estado" value={cidade} onChange={e => setCidade(e.target.value)} />
              <input id="f-linkedin" className={inputClass} placeholder="LinkedIn (opcional)" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
            </div>
            <input id="f-github" className={inputClass} placeholder="GitHub (opcional)" value={github} onChange={e => setGithub(e.target.value)} />
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <label className={labelClass}>Objetivo Profissional</label>
            <input id="f-objetivo" className={inputClass} placeholder="Ex: Estágio em Psicologia Organizacional" value={objetivo} onChange={e => setObjetivo(e.target.value)} />
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <label className={labelClass}>Formação Acadêmica</label>
            <textarea id="f-formacao" className={textareaClass} placeholder="Ex: Psicologia — Univás (em andamento, previsão 2027)" value={formacao} onChange={e => setFormacao(e.target.value)} />
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <label className={labelClass}>Experiências</label>
            <textarea id="f-experiencias" className={`${textareaClass} min-h-[120px]`} placeholder={"Ex:\n- Atendente na empresa X (jan/2022–jun/2023)\n- Voluntária no projeto Y (2024)"} value={experiencias} onChange={e => setExperiencias(e.target.value)} />
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <label className={labelClass}>Habilidades</label>
            <textarea id="f-habilidades" className={textareaClass} placeholder="Ex: Excel intermediário, escuta ativa, BrOffice..." value={habilidades} onChange={e => setHabilidades(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <label className={labelClass}>Cursos e Certificações</label>
              <textarea id="f-cursos" className={textareaClass} placeholder="Ex: Comunicação Não-Violenta (Sebrae, 2023, 20h)" value={cursos} onChange={e => setCursos(e.target.value)} />
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <label className={labelClass}>Idiomas</label>
              <textarea id="f-idiomas" className={textareaClass} placeholder="Ex: Inglês intermediário, Espanhol básico" value={idiomas} onChange={e => setIdiomas(e.target.value)} />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <label className={labelClass}>Informações Complementares</label>
            <textarea id="f-extras" className={textareaClass} placeholder="Voluntariado, projetos, liga acadêmica, premiações, CNH..." value={extras} onChange={e => setExtras(e.target.value)} />
          </div>
        </div>
      )}

      {/* Botão gerar */}
      <button
        id="generate-resume-btn"
        onClick={handleSubmit}
        disabled={loading || (mode === "livre" ? !text.trim() : !nome.trim())}
        className="mt-6 w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-all shadow-brand hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2 text-sm"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Gerando currículo com IA...</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Organizar com IA e Gerar Currículo</>
        )}
      </button>
    </div>
  );
}
