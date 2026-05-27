"use client";

import { useState } from "react";
import { Sparkles, CheckCircle, AlertTriangle, Loader2, ListChecks, Target, AlertCircle, Copy } from "lucide-react";

export interface CompetenciasData {
  hardSkills: string[];
  softSkills: string[];
  suggestions: string[];
  resumeVersion: string;
  analysis: string;
}

export default function CompetenciasPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CompetenciasData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!input.trim()) return;
    setError("");
    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      const res = await fetch("/api/competencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao gerar competências.");

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result?.resumeVersion) return;
    navigator.clipboard.writeText(result.resumeVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="animate-fade-in">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl p-6 mb-8 text-white shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <ListChecks className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Mapeador de Competências</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
              Cole anotações soltas sobre o aluno (curso, período, projetos, experiências) e a IA vai separar e sugerir as melhores Hard Skills e Soft Skills para colocar no currículo.
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-brand-primary" />
          </div>
          Informações do Aluno
        </h3>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ex: Faz o 3º período de Psicologia na Univás. Trabalhou 2 anos como caixa no supermercado. Sabe usar o pacote office básico e fez um curso de extensão sobre psicologia organizacional."
          className="w-full h-32 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/30 outline-none resize-y mb-4 placeholder:text-slate-400 text-slate-700"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="w-full sm:w-auto bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          Mapear Competências com IA
        </button>
      </div>

      {/* Erro */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Falha ao processar</p>
            <p className="text-sm text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-card border border-brand-primary/20 p-8 flex flex-col items-center gap-4 mb-6 animate-fade-in">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-primary" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800">A IA está analisando o perfil</p>
            <p className="text-sm text-slate-500 mt-1">Extraindo habilidades e separando as competências...</p>
          </div>
        </div>
      )}

      {/* Resultado */}
      {result && !loading && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hard Skills */}
            <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Hard Skills (Técnicas)
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.hardSkills?.map((skill, i) => (
                  <span key={i} className="bg-purple-50 border border-purple-200 text-purple-700 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm">
                    {skill}
                  </span>
                ))}
                {!result.hardSkills?.length && <span className="text-xs text-slate-400">Nenhuma encontrada.</span>}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6">
              <h4 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Soft Skills (Comportamentais)
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.softSkills?.map((skill, i) => (
                  <span key={i} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm">
                    {skill}
                  </span>
                ))}
                {!result.softSkills?.length && <span className="text-xs text-slate-400">Nenhuma encontrada.</span>}
              </div>
            </div>
          </div>

          {/* Sugestões */}
          {result.suggestions?.length > 0 && (
            <div className="bg-amber-50 rounded-2xl shadow-sm border border-amber-200 p-6">
              <h4 className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Sugestões para confirmar com o aluno
              </h4>
              <p className="text-xs text-amber-700 mb-4 leading-relaxed">
                Estas habilidades fazem sentido pelo curso ou área informada, mas não foram citadas explicitamente. Valide com o aluno antes de inserir no currículo.
              </p>
              <div className="flex flex-wrap gap-2">
                {result.suggestions.map((skill, i) => (
                  <span key={i} className="bg-white border border-amber-300 text-amber-700 text-xs px-3 py-1.5 rounded-xl font-medium shadow-sm">
                    ? {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Versão para Currículo */}
          <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 text-white relative">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Versão Pronta para o Currículo
            </h4>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 pr-12">
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                {result.resumeVersion}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="absolute right-10 bottom-10 p-2 bg-brand-primary hover:bg-brand-light text-white rounded-lg transition-colors shadow-md group"
              title="Copiar texto"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            {copied && <span className="absolute right-24 bottom-11 text-xs text-brand-light font-bold">Copiado!</span>}
            
            {/* Análise */}
            <div className="mt-5 border-t border-slate-700/50 pt-4">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Por que essas escolhas?</h5>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                "{result.analysis}"
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
