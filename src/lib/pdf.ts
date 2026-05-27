import jsPDF from "jspdf";
import type { ResumeData } from "./gemini";

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN_X = 20;
const MARGIN_Y = 20;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

function justifyText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: "left" | "center" = "left"
): number {
  if (align === "center") {
    const lines = doc.splitTextToSize(text, maxWidth);
    for (let i = 0; i < lines.length; i++) {
      const w = doc.getTextWidth(lines[i]);
      doc.text(lines[i], x + (maxWidth - w) / 2, y);
      y += lineHeight;
    }
    return y;
  }

  const lines = doc.splitTextToSize(text, maxWidth);
  for (let i = 0; i < lines.length; i++) {
    if (i === lines.length - 1 || lines.length === 1) {
      doc.text(lines[i], x, y);
    } else {
      doc.text(lines[i], x, y, { maxWidth: maxWidth, align: "justify" });
    }
    y += lineHeight;
  }

  return y;
}

function checkPageBreak(doc: jsPDF, currentY: number, heightNeeded: number): number {
  if (currentY + heightNeeded > PAGE_H - MARGIN_Y) {
    doc.addPage();
    return MARGIN_Y + 10;
  }
  return currentY;
}

export function generateResumePDF(resume: ResumeData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_Y + 5;

  // Cor principal sempre preta
  doc.setTextColor(0, 0, 0);

  // 1. NOME (CAIXA ALTA, ARIAL 14, NEGRITO, CENTRALIZADO)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  const name = (resume.name || "Seu Nome").toUpperCase();
  const nameWidth = doc.getTextWidth(name);
  doc.text(name, (PAGE_W - nameWidth) / 2, y);
  y += 5;

  // Linha abaixo do nome
  doc.setLineWidth(0.2);
  doc.line(MARGIN_X, y, PAGE_W - MARGIN_X, y);
  y += 5;

  // 2. INFORMAÇÕES DE IDENTIFICAÇÃO (ARIAL 12, CENTRALIZADO)
  doc.setFontSize(10);

  const contacts = [
    { label: "E-mail:", value: resume.contact?.email },
    { label: "Telefone:", value: resume.contact?.phone },
    { label: "Endereço:", value: resume.contact?.location },
    { label: "Data de Nascimento:", value: resume.contact?.birthDate },
    { label: "LinkedIn:", value: resume.contact?.linkedin }
  ];

  for (const c of contacts) {
    if (c.value) {
      doc.setFont("helvetica", "bold");
      const labelW = doc.getTextWidth(c.label + " ");
      doc.setFont("helvetica", "normal");
      const valueW = doc.getTextWidth(c.value);
      const totalW = labelW + valueW;
      
      const startX = (PAGE_W - totalW) / 2;
      
      doc.setFont("helvetica", "bold");
      doc.text(c.label + " ", startX, y);
      doc.setFont("helvetica", "normal");
      doc.text(c.value, startX + labelW, y);
      
      y += 5;
    }
  }

  // Linha após contatos
  const lineY = y - 2; // Subimos um pouco para ficar simétrico à distância superior
  doc.line(MARGIN_X, lineY, PAGE_W - MARGIN_X, lineY);
  y += 12; // Aumentado o espaço antes da seção OBJETIVO

  // Helper para títulos de seção (ARIAL 14, NEGRITO)
  const drawSectionTitle = (title: string) => {
    y = checkPageBreak(doc, y, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title.toUpperCase() + ":", MARGIN_X, y);
    y += 8;
  };

  // 3. OBJETIVO (Justificado, Arial 12)
  if (resume.summary) {
    drawSectionTitle("Objetivo");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    y = justifyText(doc, resume.summary, MARGIN_X, y, CONTENT_W, 6);
    y += 6; // Espaço padrão de fim de seção
  }

  // 4. FORMAÇÃO ACADÊMICA
  if (resume.education?.length) {
    drawSectionTitle("Formação Acadêmica");
    
    for (let i = 0; i < resume.education.length; i++) {
      const edu = resume.education[i];
      y = checkPageBreak(doc, y, 10);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(edu.degree || "Curso", MARGIN_X, y);
      y += 6;
      
      doc.setFont("helvetica", "normal");
      doc.text(`${edu.institution} | ${edu.period}`, MARGIN_X, y);
      y += 6;
      
      if (i < resume.education.length - 1) {
        y += 4; // Espaço menor entre itens da mesma seção
      }
    }
    y += 6; // Espaço padrão de fim de seção
  }

  // 5. EXPERIÊNCIA PROFISSIONAL
  if (resume.experience?.length) {
    drawSectionTitle("Experiência Profissional");
    
    for (let eIdx = 0; eIdx < resume.experience.length; eIdx++) {
      const exp = resume.experience[eIdx];
      y = checkPageBreak(doc, y, 15);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      // Empresa (Negrito)
      doc.text(exp.company || "Empresa", MARGIN_X, y);
      y += 6;
      
      // Cargo (Normal)
      doc.setFont("helvetica", "normal");
      doc.text(exp.role || "Cargo", MARGIN_X, y);
      y += 6;

      // Período (Normal)
      doc.text(exp.period || "Período", MARGIN_X, y);
      y += 6;

      // Descrições (Bullets)
      if (exp.description?.length) {
        doc.setFontSize(12);
        for (let i = 0; i < exp.description.length; i++) {
          const isLast = i === exp.description.length - 1;
          let descText = exp.description[i].trim();
          
          if (descText.endsWith(".") || descText.endsWith(";")) {
            descText = descText.slice(0, -1);
          }
          descText += isLast ? "." : ";";

          const bullet = "• ";
          const textX = MARGIN_X + 5;
          const textW = CONTENT_W - 5;
          
          doc.text(bullet, MARGIN_X, y);
          y = justifyText(doc, descText, textX, y, textW, 6);
        }
      }
      
      if (eIdx < resume.experience.length - 1) {
        y += 4; // Espaço menor entre experiências
      }
    }
    y += 6; // Espaço padrão de fim de seção
  }

  // 6. COMPETÊNCIAS E HABILIDADES
  if (resume.skills?.length || resume.languages?.length) {
    drawSectionTitle("Competências e Habilidades");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    const allSkills = [...(resume.skills || [])];
    if (resume.languages?.length) {
      for (const l of resume.languages) {
        allSkills.push(`${l.language} (${l.level})`);
      }
    }

    for (let i = 0; i < allSkills.length; i++) {
      const isLast = i === allSkills.length - 1;
      let text = allSkills[i].trim();
      if (text.endsWith(".") || text.endsWith(";")) text = text.slice(0, -1);
      text += isLast ? "." : ";";
      
      const textX = MARGIN_X + 5;
      const textW = CONTENT_W - 5;
      
      y = checkPageBreak(doc, y, 6);
      doc.text("• ", MARGIN_X, y);
      y = justifyText(doc, text, textX, y, textW, 6);
    }
    y += 6; // Espaço padrão de fim de seção
  }

  // 7. INFORMAÇÕES COMPLEMENTARES
  if (resume.extras?.length) {
    drawSectionTitle("Informações Complementares");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    for (let i = 0; i < resume.extras.length; i++) {
      const isLast = i === resume.extras.length - 1;
      let text = resume.extras[i].trim();
      if (text.endsWith(".") || text.endsWith(";")) text = text.slice(0, -1);
      text += isLast ? "." : ";";
      
      const textX = MARGIN_X + 5;
      const textW = CONTENT_W - 5;
      
      y = checkPageBreak(doc, y, 6);
      doc.text("• ", MARGIN_X, y);
      y = justifyText(doc, text, textX, y, textW, 6);
    }
    y += 6; // Espaço padrão de fim de seção
  }

  // 8. CURSOS COMPLEMENTARES
  if (resume.courses?.length) {
    drawSectionTitle("Cursos Complementares");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    for (let i = 0; i < resume.courses.length; i++) {
      const isLast = i === resume.courses.length - 1;
      let text = resume.courses[i].trim();
      if (text.endsWith(".") || text.endsWith(";")) text = text.slice(0, -1);
      text += isLast ? "." : ";";
      
      const textX = MARGIN_X + 5;
      const textW = CONTENT_W - 5;
      
      y = checkPageBreak(doc, y, 6);
      doc.text("• ", MARGIN_X, y);
      y = justifyText(doc, text, textX, y, textW, 6);
    }
    y += 6; // Espaço padrão de fim de seção
  }

  const filename = `curriculo-${(resume.name || "profissional")
    .toLowerCase()
    .replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
