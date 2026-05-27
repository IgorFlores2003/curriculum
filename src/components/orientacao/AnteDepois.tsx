import { X, Check } from "lucide-react";

interface AnteDepoisProps {
  contexto: string;
  ruim: string;
  bom: string;
}

export default function AnteDepois({ contexto, ruim, bom }: AnteDepoisProps) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-slate-600">Exemplo — Antes e Depois</span>
        <span className="text-xs text-slate-400">({contexto})</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Ruim */}
        <div className="rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 bg-red-100 px-3 py-2 border border-red-200 rounded-t-xl">
            <X className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Como não fazer</span>
          </div>
          <pre className="before-after-bad text-xs rounded-t-none whitespace-pre-wrap leading-relaxed font-mono">
            {ruim}
          </pre>
        </div>
        {/* Bom */}
        <div className="rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 bg-green-100 px-3 py-2 border border-green-200 rounded-t-xl">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Como fazer</span>
          </div>
          <pre className="before-after-good text-xs rounded-t-none whitespace-pre-wrap leading-relaxed font-mono">
            {bom}
          </pre>
        </div>
      </div>
    </div>
  );
}
