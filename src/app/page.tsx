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
        <div className={activeTab === "orientacao" ? "block" : "hidden"}>
          <OrientacaoPage />
        </div>
        <div className={activeTab === "gerador" ? "block" : "hidden"}>
          <GeradorPage />
        </div>
        <div className={activeTab === "competencias" ? "block" : "hidden"}>
          <CompetenciasPage />
        </div>
        <div className={activeTab === "prompts" ? "block" : "hidden"}>
          <PromptsPage />
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Esquerda: Logo e Subtítulo */}
            <div className="text-center md:text-left space-y-1">
              <h2 className="text-xl font-bold text-brand-primary">Vitae Lab</h2>
              <p className="text-sm text-slate-500 font-medium">Plantão de Análise de Curriculum Vitae</p>
            </div>

            {/* Centro: Créditos */}
            <div className="text-center md:text-left text-sm text-slate-600 space-y-2">
              <p>
                <span className="font-semibold text-slate-700">Plantonistas:</span> Murilo Silva e Yasmim Daina
              </p>
              <p>
                <span className="font-semibold text-slate-700">Desenvolvimento Web:</span> Igor Flores Bento
              </p>
            </div>

            {/* Direita: Redes Sociais */}
            <div className="flex items-center gap-4">
            <a 
              href="https://github.com/IgorFlores2003" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-brand-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/igor-flores-509794235/" 
              target="_blank" 
              rel="noreferrer"
              className="text-slate-400 hover:text-brand-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Vitae Lab. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
