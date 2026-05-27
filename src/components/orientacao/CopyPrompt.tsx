"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Bot } from "lucide-react";

interface CopyPromptProps {
  prompt: string;
}

export default function CopyPrompt({ prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">Prompt pronto para IA</span>
          <span className="text-xs text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full">
            Cole no ChatGPT, Gemini, etc.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 transition-colors font-medium"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? "Recolher" : "Ver prompt"}
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? "bg-green-500 text-white"
                : "bg-brand-primary text-white hover:bg-brand-dark"
            }`}
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5" /> Copiado!</>
            ) : (
              <><Copy className="w-3.5 h-3.5" /> Copiar</>
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 animate-slide-down">
          <pre className="text-xs text-purple-800 bg-white border border-purple-100 rounded-lg p-3 whitespace-pre-wrap leading-relaxed font-mono max-h-48 overflow-y-auto scrollbar-thin">
            {prompt}
          </pre>
        </div>
      )}
    </div>
  );
}
