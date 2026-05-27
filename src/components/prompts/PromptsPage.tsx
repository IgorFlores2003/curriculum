"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, CheckCircle, TerminalSquare } from "lucide-react";
import { promptsData, PromptSection } from "./promptsData";

export default function PromptsPage() {
  const [expandedId, setExpandedId] = useState<string | null>("01");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function toggleExpand(id: string) {
    setExpandedId(prev => (prev === id ? null : id));
  }

  return (
    <div className="animate-fade-in pb-12">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl p-6 mb-8 text-white shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <TerminalSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Biblioteca de Prompts para IA</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-3xl">
              Caso precise gerar seções manualmente usando o ChatGPT ou Gemini, utilize estes comandos estruturados. Eles foram criados com regras rígidas para garantir o formato mais profissional possível.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {promptsData.map((section: PromptSection) => {
          const isExpanded = expandedId === section.id;
          
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(section.id)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-3">
                    <span className="text-brand-primary font-black opacity-80">{section.id}</span>
                    {section.title.replace(/^\\d+\\s+-\\s+/, "").replace(/^\\d+\\s+/, "")}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 pl-8">
                    {section.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50">
                  
                  {/* Campos */}
                  {section.fieldsToFill && section.fieldsToFill.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">
                        Campos para preencher
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {section.fieldsToFill.map((field, i) => (
                          <span key={i} className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs px-3 py-1.5 rounded-md font-medium shadow-sm">
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Texto do Prompt */}
                  {section.promptText ? (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          Texto do Prompt
                        </h4>
                        <button
                          onClick={() => handleCopy(section.id, section.promptText!)}
                          className="flex items-center gap-1.5 bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm"
                        >
                          {copiedId === section.id ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedId === section.id ? "Copiado!" : "Copiar prompt"}
                        </button>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 overflow-x-auto shadow-sm">
                        <pre className="font-mono text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {section.promptText}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center border-2 border-dashed border-slate-200 rounded-xl mb-6">
                      <p className="text-sm text-slate-400 font-medium">Conteúdo deste prompt em breve.</p>
                    </div>
                  )}

                  {/* Exemplo e Resultado */}
                  {section.exampleData && section.expectedResult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                          Exemplo de Preenchimento
                        </h4>
                        <pre className="font-mono text-xs sm:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                          {section.exampleData}
                        </pre>
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                        {/* Borda verde lateral */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"></div>
                        <div className="pl-3">
                          <h4 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
                            Resultado Esperado
                          </h4>
                          <pre className="font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                            {section.expectedResult}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                  
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
