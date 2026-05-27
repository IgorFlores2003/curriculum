"use client";

import { useState } from "react";
import TabNav from "@/components/TabNav";
import OrientacaoPage from "@/components/orientacao/OrientacaoPage";
import GeradorPage from "@/components/gerador/GeradorPage";
import CompetenciasPage from "@/components/competencias/CompetenciasPage";
import PromptsPage from "@/components/prompts/PromptsPage";

type Tab = "orientacao" | "gerador" | "competencias" | "prompts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("orientacao");

  return (
    <>
      <TabNav active={activeTab} onChange={setActiveTab} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "orientacao" && <OrientacaoPage />}
        {activeTab === "gerador" && <GeradorPage />}
        {activeTab === "competencias" && <CompetenciasPage />}
        {activeTab === "prompts" && <PromptsPage />}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="w-full px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Projeto de Extensão — Univás
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Curso de Psicologia · Orientação Profissional
            </p>
          </div>
          <div className="text-xs text-slate-400 sm:text-right">
            <p>Ferramenta interna para uso dos analistas</p>
            <p>IA: Google Gemini · PDF/DOCX gerados no navegador</p>
          </div>
        </div>
      </footer>
    </>
  );
}
