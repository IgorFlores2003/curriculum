import { Compass, Sparkles } from "lucide-react";

type Tab = "orientacao" | "gerador";

interface TabNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function TabNav({ active, onChange }: TabNavProps) {
  const tabs = [
    {
      id: "orientacao" as Tab,
      label: "Orientação",
      Icon: Compass,
      desc: "Roteiro de análise para o analista",
    },
    {
      id: "gerador" as Tab,
      label: "Gerador com IA",
      Icon: Sparkles,
      desc: "Criar currículo com inteligência artificial",
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onChange(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-4 border-b-2 text-sm font-semibold transition-all relative ${
                  active === tab.id
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <div className="text-left hidden sm:block">
                  <div className="font-bold leading-tight">{tab.label}</div>
                  <div className="text-xs font-normal opacity-70">{tab.desc}</div>
                </div>
                <span className="sm:hidden">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
