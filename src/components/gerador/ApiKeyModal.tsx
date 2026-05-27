"use client";

import { useState, useEffect } from "react";
import { Key, X, ExternalLink, Lock, Check } from "lucide-react";
import { getApiKey, saveApiKey } from "@/lib/storage";

interface ApiKeyModalProps {
  onClose: () => void;
}

export default function ApiKeyModal({ onClose }: ApiKeyModalProps) {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getApiKey();
    if (existing) setKey(existing);
  }, []);

  function handleSave() {
    saveApiKey(key.trim());
    setSaved(true);
    setTimeout(() => onClose(), 800);
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Configurar API Gemini</h3>
              <p className="text-xs text-slate-500">Chave gratuita do Google AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm font-semibold text-blue-800">Como obter sua chave gratuita:</p>
            <ol className="mt-2 space-y-1 text-sm text-blue-700 list-decimal list-inside">
              <li>
                Acesse{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-medium inline-flex items-center gap-1"
                >
                  aistudio.google.com <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Faça login com sua conta Google</li>
              <li>Clique em "Create API Key"</li>
              <li>Cole a chave abaixo</li>
            </ol>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Chave da API</label>
            <input
              id="modal-api-key"
              type="password"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              placeholder="AIzaSy..."
              value={key}
              onChange={(e) => { setKey(e.target.value); setSaved(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-4 h-4 flex-shrink-0 text-green-500" />
            Salva apenas no navegador (sessionStorage). Nunca vai para nenhum servidor.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            id="save-api-key-modal"
            onClick={handleSave}
            disabled={!key.trim()}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all ${
              saved
                ? "bg-green-500"
                : "bg-brand-primary hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {saved ? (
              <><Check className="w-4 h-4" /> Salvo!</>
            ) : (
              "Salvar chave"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
