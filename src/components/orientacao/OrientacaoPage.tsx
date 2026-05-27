import { roteiroData } from "./roteiro-data";
import SecaoCard from "./SecaoCard";
import { Compass, BarChart2, Lightbulb } from "lucide-react";

export default function OrientacaoPage() {
  return (
    <div className="animate-fade-in">
      {/* Intro */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Roteiro de Orientação para o Analista</h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Guia completo para análise de currículos durante a ação de orientação profissional.
              Expanda cada seção para ver o que observar, como orientar o aluno, exemplos antes/depois
              e prompts prontos para usar com IA.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {[
            { value: "8", label: "Seções" },
            { value: "40+", label: "Pontos de análise" },
            { value: "8", label: "Exemplos antes/depois" },
            { value: "8", label: "Prompts prontos" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-white/70 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dica rápida */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Como usar este roteiro</p>
          <p className="text-sm text-amber-700 mt-0.5">
            Clique em cada seção para expandir. Use a aba <strong>"O que observar"</strong> como checklist durante a análise,
            <strong> "Como orientar"</strong> para saber o que falar ao aluno, <strong>"Antes/Depois"</strong> para mostrar exemplos
            e <strong>"Prompt para IA"</strong> para gerar sugestões automáticas.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {roteiroData.map((secao, index) => (
          <SecaoCard key={secao.id} secao={secao} index={index} />
        ))}
      </div>
    </div>
  );
}
