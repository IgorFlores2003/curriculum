"use client";

import { useState, useEffect, useRef } from "react";
import { generateResume, type ResumeData } from "@/lib/gemini";
import { generateResumePDF } from "@/lib/pdf";
import {
  getApiKey,
  saveApiKey,
  getLastInput,
  saveLastInput,
  saveLastResume,
} from "@/lib/storage";

const PLACEHOLDER = `Olá! Me chame de João Silva.
Sou desenvolvedor full stack com 5 anos de experiência.

Email: joao@exemplo.com | Tel: (11) 98765-4321 | São Paulo, SP
LinkedIn: linkedin.com/in/joaosilva | GitHub: github.com/joaosilva

Trabalhei na empresa TechCorp de 2022 até hoje como Desenvolvedor Senior.
Lá criei um sistema de e-commerce que aumentou as vendas em 40%, 
liderei uma equipe de 4 devs e reduzi o tempo de deploy em 60%.

Antes, de 2020 a 2022, trabalhei na StartupX como Dev Pleno.
Desenvolvi APIs REST com Node.js e bancos PostgreSQL.

Fiz faculdade de Ciência da Computação na USP de 2015 a 2019.

Minhas principais habilidades: TypeScript, React, Next.js, Node.js, 
PostgreSQL, Docker, AWS, Git.

Falo português nativo e inglês avançado.`;

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resume, setResume] = useState<ResumeData | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setApiKeySaved(true);
    }
    const savedInput = getLastInput();
    if (savedInput) setPrompt(savedInput);
  }, []);

  function handleSaveKey() {
    saveApiKey(apiKey.trim());
    setApiKeySaved(true);
  }

  async function handleGenerate() {
    if (!apiKey.trim()) {
      setError("Insira sua chave da API Gemini antes de gerar.");
      return;
    }
    if (!prompt.trim()) {
      setError("Descreva suas informações no campo de texto.");
      return;
    }

    setError("");
    setLoading(true);
    setResume(null);
    saveLastInput(prompt);

    try {
      const result = await generateResume(prompt, apiKey.trim());
      setResume(result);
      saveLastResume(result);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao gerar currículo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadPDF() {
    if (!resume) return;
    generateResumePDF(resume);
  }

  return (
    <main className="app-wrapper">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-badge">
          <span>✦</span> Powered by Gemini AI
        </div>
        <h1>Crie seu Currículo<br />com Inteligência Artificial</h1>
        <p>
          Descreva suas experiências em linguagem natural e a IA
          monta um currículo profissional pronto para baixar em PDF.
        </p>
      </header>

      {/* ── API Key ── */}
      <div className="card api-section">
        <div className="section-label">
          <span className="dot" />
          Chave da API Gemini (gratuita)
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="api-link"
          >
            Obter chave gratuita ↗
          </a>
        </div>
        <div className="api-row">
          <input
            id="api-key-input"
            type="password"
            className="api-key-input"
            placeholder="AIza..."
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setApiKeySaved(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
          />
          <button id="save-api-key" className="api-save-btn" onClick={handleSaveKey}>
            Salvar chave
          </button>
        </div>
        <div className={`api-status ${apiKeySaved ? "ok" : "empty"}`}>
          {apiKeySaved ? "✓ Chave salva na sessão" : "⚠ Chave não salva"}
        </div>
      </div>

      {/* ── Prompt ── */}
      <div className="card form-section">
        <label className="form-label" htmlFor="prompt-input">
          Suas informações{" "}
          <span>— escreva como quiser, em linguagem natural</span>
        </label>
        <textarea
          id="prompt-input"
          className="prompt-textarea"
          placeholder={PLACEHOLDER}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="char-count">{prompt.length} caracteres</div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="error-box" role="alert">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* ── Generate Button ── */}
      <button
        id="generate-btn"
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? (
          <>✦ Gerando seu currículo<span className="loading-dots" /></>
        ) : (
          "✦ Gerar Currículo com IA"
        )}
      </button>

      {/* ── Loading ── */}
      {loading && (
        <div className="card loading-state" style={{ marginTop: 24 }}>
          <div className="spinner" />
          <p>
            A IA está estruturando seu currículo<br />
            <span style={{ color: "var(--text-3)", fontSize: 12 }}>
              Isso leva alguns segundos...
            </span>
          </p>
        </div>
      )}

      {/* ── Result ── */}
      {resume && (
        <div className="result-section" ref={resultRef} style={{ marginTop: 32 }}>
          <div className="card">
            <div className="result-header">
              <h2>
                <span className="check">✓</span>
                Currículo gerado com sucesso!
              </h2>
            </div>

            {/* Preview */}
            <div className="resume-preview">
              {/* Coluna esquerda */}
              <div className="resume-left">
                <div className="resume-name">{resume.name}</div>
                {resume.title && (
                  <div className="resume-title">{resume.title}</div>
                )}

                {resume.contact && (
                  <>
                    <div className="preview-section-title">Contato</div>
                    {resume.contact.email && (
                      <div className="contact-item">
                        <span className="contact-icon">✉</span>
                        {resume.contact.email}
                      </div>
                    )}
                    {resume.contact.phone && (
                      <div className="contact-item">
                        <span className="contact-icon">☎</span>
                        {resume.contact.phone}
                      </div>
                    )}
                    {resume.contact.location && (
                      <div className="contact-item">
                        <span className="contact-icon">⌖</span>
                        {resume.contact.location}
                      </div>
                    )}
                    {resume.contact.linkedin && (
                      <div className="contact-item">
                        <span className="contact-icon">in</span>
                        {resume.contact.linkedin}
                      </div>
                    )}
                    {resume.contact.github && (
                      <div className="contact-item">
                        <span className="contact-icon">⊛</span>
                        {resume.contact.github}
                      </div>
                    )}
                  </>
                )}

                {resume.skills?.length > 0 && (
                  <>
                    <div className="preview-section-title">Habilidades</div>
                    <div>
                      {resume.skills.map((s, i) => (
                        <span key={i} className="skill-tag">{s}</span>
                      ))}
                    </div>
                  </>
                )}

                {resume.languages?.length > 0 && (
                  <>
                    <div className="preview-section-title">Idiomas</div>
                    {resume.languages.map((l, i) => (
                      <div key={i} className="contact-item">
                        <span>{l.language}</span>
                        <span style={{ color: "var(--text-3)", marginLeft: 4 }}>
                          · {l.level}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Coluna direita */}
              <div className="resume-right">
                {resume.summary && (
                  <>
                    <div className="preview-section-title">Sobre Mim</div>
                    <p className="summary-text">{resume.summary}</p>
                  </>
                )}

                {resume.experience?.length > 0 && (
                  <>
                    <div className="preview-section-title">
                      Experiência Profissional
                    </div>
                    {resume.experience.map((exp, i) => (
                      <div key={i} className="exp-entry">
                        <div className="exp-role">{exp.role}</div>
                        <div className="exp-meta">
                          {exp.company} · {exp.period}
                        </div>
                        {exp.description?.map((d, j) => (
                          <div key={j} className="exp-bullet">{d}</div>
                        ))}
                      </div>
                    ))}
                  </>
                )}

                {resume.education?.length > 0 && (
                  <>
                    <div className="preview-section-title">Formação Acadêmica</div>
                    {resume.education.map((edu, i) => (
                      <div key={i} className="exp-entry">
                        <div className="exp-role">{edu.degree}</div>
                        <div className="exp-meta">
                          {edu.institution} · {edu.period}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Download PDF */}
            <button id="download-pdf-btn" className="pdf-btn" onClick={handleDownloadPDF}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Baixar PDF Profissional
            </button>
          </div>
        </div>
      )}

      {/* ── Tip ── */}
      <div className="tip-box">
        <span>💡</span>
        <span>
          <strong>Dica:</strong> Quanto mais detalhes você fornecer (conquistas com números,
          tecnologias usadas, períodos exatos), melhor será o currículo gerado.
          Sua chave fica somente no navegador e nunca é enviada a outro servidor.
        </span>
      </div>
    </main>
  );
}
