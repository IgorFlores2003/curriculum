"use client";

import { useState } from "react";
import type { ResumeData } from "@/lib/gemini";
import ExportButtons from "./ExportButtons";
import { Mail, Phone, MapPin, Link, Code, Pencil, ChevronRight } from "lucide-react";

interface ResumePreviewProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

function EditableField({
  value, onChange, multiline = false, placeholder = "", className = "",
}: {
  value: string; onChange: (v: string) => void;
  multiline?: boolean; placeholder?: string; className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const base = "w-full bg-transparent border-0 outline-none focus:ring-1 focus:ring-brand-primary/40 rounded px-1 transition-all";

  if (editing) {
    if (multiline) {
      return (
        <textarea autoFocus className={`${base} resize-y ${className}`} value={value}
          placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)} rows={3} />
      );
    }
    return (
      <input autoFocus className={`${base} ${className}`} value={value}
        placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)} />
    );
  }

  return (
    <span onClick={() => setEditing(true)} title="Clique para editar"
      className={`cursor-text hover:bg-brand-primary/5 rounded px-1 transition-colors inline-block w-full group relative ${
        value ? "" : "text-slate-300 italic text-sm"
      } ${className}`}>
      {value || placeholder || "Clique para editar"}
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-40 absolute right-1 top-1/2 -translate-y-1/2 text-brand-primary" />
    </span>
  );
}

export default function ResumePreview({ resume, onChange }: ResumePreviewProps) {
  function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    onChange({ ...resume, [key]: value });
  }
  function updateContact(field: keyof ResumeData["contact"], value: string) {
    onChange({ ...resume, contact: { ...resume.contact, [field]: value } });
  }
  function updateExp(index: number, field: string, value: string | string[]) {
    const updated = resume.experience.map((e, i) => i === index ? { ...e, [field]: value } : e);
    update("experience", updated);
  }
  function updateExpBullet(expIdx: number, bulletIdx: number, value: string) {
    const updated = resume.experience.map((e, i) => {
      if (i !== expIdx) return e;
      const desc = [...e.description]; desc[bulletIdx] = value;
      return { ...e, description: desc };
    });
    update("experience", updated);
  }
  function updateEdu(index: number, field: string, value: string) {
    const updated = resume.education.map((e, i) => i === index ? { ...e, [field]: value } : e);
    update("education", updated);
  }

  const contactFields = [
    { key: "email" as const,    Icon: Mail,     placeholder: "email@exemplo.com" },
    { key: "phone" as const,    Icon: Phone,    placeholder: "(00) 00000-0000" },
    { key: "location" as const, Icon: MapPin,   placeholder: "Cidade, Estado" },
    { key: "birthDate" as const, Icon: Code,    placeholder: "Data de Nascimento" }, // Icon doesn't matter much for birthDate, maybe Calendar if imported
    { key: "linkedin" as const, Icon: Link,     placeholder: "linkedin.com/in/..." },
  ];

  function updateExtra(index: number, value: string) {
    const updated = [...(resume.extras || [])];
    updated[index] = value;
    update("extras", updated);
  }
  function updateCourse(index: number, value: string) {
    const updated = [...(resume.courses || [])];
    updated[index] = value;
    update("courses", updated);
  }
  function updateSkill(index: number, value: string) {
    const updated = [...(resume.skills || [])];
    updated[index] = value;
    update("skills", updated);
  }

  return (
    <div className="animate-fade-in">
      {/* Aviso */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4">
        <Pencil className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-800 font-medium">
          Clique em qualquer campo para editar diretamente antes de baixar o arquivo.
        </p>
      </div>

      {/* Preview */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card mb-5">
        {/* Cabeçalho */}
        <div className="bg-brand-primary px-8 py-6">
          <div className="text-3xl font-bold text-white mb-1 leading-tight text-center">
            <EditableField value={resume.name || ""} onChange={(v) => update("name", v)}
              placeholder="Nome Completo" className="text-3xl font-bold text-white text-center" />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 justify-center">
            {contactFields.map(({ key, Icon, placeholder }) => {
              const val = resume.contact?.[key] || "";
              return (
                <span key={key} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                  <EditableField value={val} onChange={(v) => updateContact(key, v)}
                    placeholder={placeholder} className="text-white/80 text-xs" />
                </span>
              );
            })}
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Resumo */}
          {resume.summary !== undefined && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 pb-1 border-b border-brand-primary/20">
                Objetivo
              </h3>
              <EditableField value={resume.summary || ""} onChange={(v) => update("summary", v)}
                multiline placeholder="Resumo profissional..."
                className="text-sm text-slate-600 italic leading-relaxed" />
            </div>
          )}

    {/* Formação */}
          {resume.education?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 pb-1 border-b border-brand-primary/20">
                Formação Acadêmica
              </h3>
              <div className="space-y-3">
                {resume.education.map((edu, ei) => (
                  <div key={ei}>
                    <EditableField value={edu.degree || ""} onChange={(v) => updateEdu(ei, "degree", v)}
                      placeholder="Curso / Grau" className="font-bold text-slate-800 text-sm" />
                    <div className="flex items-center gap-2">
                      <EditableField value={edu.institution || ""} onChange={(v) => updateEdu(ei, "institution", v)}
                        placeholder="Instituição" className="text-xs text-slate-500" />
                      <span className="text-slate-300 text-xs">·</span>
                      <EditableField value={edu.period || ""} onChange={(v) => updateEdu(ei, "period", v)}
                        placeholder="Período" className="text-xs text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Experiência */}
          {resume.experience?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 pb-1 border-b border-brand-primary/20">
                Experiência Profissional
              </h3>
              <div className="space-y-4">
                {resume.experience.map((exp, ei) => (
                  <div key={ei} className="mb-4">
                    <EditableField value={exp.company || ""} onChange={(v) => updateExp(ei, "company", v)}
                      placeholder="Empresa" className="font-bold text-slate-800 text-sm" />
                    <div className="mt-0.5">
                      <EditableField value={exp.role || ""} onChange={(v) => updateExp(ei, "role", v)}
                        placeholder="Cargo" className="text-xs text-slate-700" />
                    </div>
                    <div className="mt-0.5">
                      <EditableField value={exp.period || ""} onChange={(v) => updateExp(ei, "period", v)}
                        placeholder="Período" className="text-xs text-slate-500" />
                    </div>
                    <div className="mt-2 space-y-1">
                      {exp.description?.map((d, di) => (
                        <div key={di} className="flex gap-2 items-start">
                          <ChevronRight className="w-3.5 h-3.5 text-brand-primary flex-shrink-0 mt-0.5" />
                          <EditableField value={d} onChange={(v) => updateExpBullet(ei, di, v)}
                            placeholder="Descreva a atividade..." className="text-xs text-slate-600 leading-relaxed" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills + Idiomas combinados */}
          {((resume.skills?.length ?? 0) > 0 || (resume.languages?.length ?? 0) > 0) && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 pb-1 border-b border-brand-primary/20">
                Competências e Habilidades
              </h3>
              <div className="space-y-1">
                {resume.skills?.map((s, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-brand-primary flex-shrink-0 mt-0.5 text-xs font-bold">•</span>
                    <EditableField value={s} onChange={(v) => updateSkill(i, v)}
                      placeholder="Habilidade" className="text-xs text-slate-600 leading-relaxed" />
                  </div>
                ))}
                {resume.languages?.map((l, i) => (
                  <div key={`lang-${i}`} className="flex gap-2 items-start">
                    <span className="text-brand-primary flex-shrink-0 mt-0.5 text-xs font-bold">•</span>
                    <span className="text-xs text-slate-600 leading-relaxed">{l.language} ({l.level})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {(resume.extras?.length ?? 0) > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 pb-1 border-b border-brand-primary/20">
                Informações Complementares
              </h3>
              <div className="space-y-1">
                {resume.extras?.map((e, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-brand-primary flex-shrink-0 mt-0.5 text-xs font-bold">•</span>
                    <EditableField value={e} onChange={(v) => updateExtra(i, v)}
                      placeholder="Informação complementar" className="text-xs text-slate-600 leading-relaxed" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cursos */}
          {(resume.courses?.length ?? 0) > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 pb-1 border-b border-brand-primary/20">
                Cursos Complementares
              </h3>
              <div className="space-y-1">
                {resume.courses?.map((c, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-brand-primary flex-shrink-0 mt-0.5 text-xs font-bold">•</span>
                    <EditableField value={c} onChange={(v) => updateCourse(i, v)}
                      placeholder="Curso complementar" className="text-xs text-slate-600 leading-relaxed" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ExportButtons resume={resume} />
    </div>
  );
}
