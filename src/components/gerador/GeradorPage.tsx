"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle, AlertTriangle, Loader2, RotateCcw } from "lucide-react";
import { generateResume, type ResumeData } from "@/lib/gemini";
import { getLastResume, saveLastResume } from "@/lib/storage";
import StudentForm from "./StudentForm";
import ResumePreview from "./ResumePreview";

export default function GeradorPage() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const last = getLastResume();
    if (last) setResume(last);
  }, []);

  async function handleGenerate(text: string) {
    setError("");
    setLoading(true);
    try {
      const result = await generateResume(text);
      setResume(result);
      saveLastResume(result);
      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao gerar currículo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Gerador de Currículo com IA Gratuita</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Preencha as informações do aluno — de qualquer jeito — e a IA organiza,
                estrutura e gera um currículo profissional. Edite na tela e baixe em PDF ou DOCX.
              </p>
            </div>
          </div>
          <div className="bg-green-500/20 border border-green-300/30 text-green-100 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> 100% Gratuito
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {[
            { n: "1", label: "Preencha as infos" },
            { n: "2", label: "IA organiza tudo" },
            { n: "3", label: "Edite na tela" },
            { n: "4", label: "Baixe PDF ou DOCX" },
          ].map((s) => (
            <div key={s.n} className="bg-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-gold text-white text-xs font-black rounded-full flex items-center justify-center flex-shrink-0">
                {s.n}
              </span>
              <span className="text-white/80 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 mb-6">
        <h3 className="font-bold text-slate-800 text-base mb-5 flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-primary/10 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-primary" />
          </div>
          Informações do Aluno
        </h3>
        <StudentForm onSubmit={handleGenerate} loading={loading} />
      </div>

      {/* Erro */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Erro ao gerar currículo</p>
            <p className="text-sm text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-card border border-brand-primary/20 p-8 flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-brand-primary/20 border-t-brand-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-primary" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-800">A IA está organizando o currículo</p>
            <p className="text-sm text-slate-500 mt-1">Aguarde alguns segundos...</p>
          </div>
        </div>
      )}

      {/* Preview */}
      {resume && !loading && (
        <div ref={previewRef} className="bg-white rounded-2xl shadow-card border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Currículo Gerado — Edite e Baixe
            </h3>
            <button
              onClick={() => { setResume(null); setError(""); }}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Recomeçar
            </button>
          </div>
          <ResumePreview resume={resume} onChange={setResume} />
        </div>
      )}
    </div>
  );
}
