"use client";

import { useState } from "react";
import {
  User, Target, GraduationCap, Briefcase, Zap, ScrollText, Globe, Star,
  ChevronDown, Search, MessageSquare, ArrowLeftRight, Bot,
} from "lucide-react";
import type { SecaoRoteiro } from "./roteiro-data";
import AnteDepois from "./AnteDepois";
import CopyPrompt from "./CopyPrompt";

const ICON_MAP = {
  User, Target, GraduationCap, Briefcase, Zap, ScrollText, Globe, Star,
} as const;

type Tab = "observar" | "orientar" | "exemplo" | "prompt";

interface SecaoCardProps {
  secao: SecaoRoteiro;
  index: number;
}

export default function SecaoCard({ secao, index }: SecaoCardProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("observar");

  const IconComponent = ICON_MAP[secao.icone as keyof typeof ICON_MAP] ?? User;

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: "observar", label: "O que observar", Icon: Search },
    { id: "orientar", label: "Como orientar",  Icon: MessageSquare },
    { id: "exemplo",  label: "Antes / Depois", Icon: ArrowLeftRight },
    { id: "prompt",   label: "Prompt para IA", Icon: Bot },
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-card border transition-all duration-200 overflow-hidden ${
      open ? "border-brand-primary/30 shadow-card-hover" : "border-slate-200 hover:border-brand-primary/20 hover:shadow-card-hover"
    }`}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-brand-primary/20">
          <IconComponent className="w-5 h-5 text-brand-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-brand-primary/50 tracking-widest uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-bold text-slate-800 text-base leading-tight">{secao.titulo}</h3>
          {!open && (
            <p className="text-sm text-slate-500 mt-0.5 truncate">{secao.descricao}</p>
          )}
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-all duration-300 ${open ? "rotate-180 bg-brand-primary/10" : ""}`}>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </button>

      {/* Content */}
      {open && (
        <div className="animate-fade-in">
          <div className="px-6 pb-2">
            <p className="text-sm text-slate-600 leading-relaxed border-l-4 border-brand-primary/30 pl-3 bg-brand-primary/5 rounded-r-lg py-2">
              {secao.descricao}
            </p>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 pb-2 flex gap-1 flex-wrap">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === id
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="px-6 pb-6">
            {/* Observar */}
            {tab === "observar" && (
              <div className="animate-fade-in space-y-2 mt-2">
                <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Checklist de análise:</p>
                {secao.observar.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-brand-primary/5 cursor-pointer group transition-colors">
                    <input type="checkbox" className="mt-0.5 w-4 h-4 rounded accent-brand-primary flex-shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-900">{item.text}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Orientar */}
            {tab === "orientar" && (
              <div className="animate-fade-in space-y-3 mt-2">
                <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Dicas para orientar o aluno:</p>
                {secao.orientar.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <ChevronDown className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5 -rotate-90" />
                    <p className="text-sm text-blue-900 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Exemplo */}
            {tab === "exemplo" && (
              <div className="animate-fade-in mt-2">
                <AnteDepois
                  contexto={secao.anteDepois.contexto}
                  ruim={secao.anteDepois.ruim}
                  bom={secao.anteDepois.bom}
                />
              </div>
            )}

            {/* Prompt */}
            {tab === "prompt" && (
              <div className="animate-fade-in mt-2">
                <CopyPrompt prompt={secao.prompt} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
