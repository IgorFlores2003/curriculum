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
  lineHeight: number
): number {
  const words = text.split(" ");
  let currentLine = "";
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine + word + " ";
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth > maxWidth && i > 0) {
      // Draw justified line
      const lineWords = currentLine.trim().split(" ");
      if (lineWords.length > 1) {
        const textWidth = doc.getTextWidth(currentLine.trim());
        const spaceToAdd = (maxWidth - textWidth) / (lineWords.length - 1);
        let currentX = x;
        for (let j = 0; j < lineWords.length; j++) {
          doc.text(lineWords[j], currentX, currentY);
          currentX += doc.getTextWidth(lineWords[j]) + spaceToAdd + doc.getTextWidth(" ");
        }
      } else {
        doc.text(currentLine.trim(), x, currentY);
      }
      currentLine = word + " ";
      currentY += lineHeight;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine.trim().length > 0) {
    // Last line shouldn't be justified
    doc.text(currentLine.trim(), x, currentY);
    currentY += lineHeight;
  }

  return currentY;
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
    { label: "Idade:", value: resume.contact?.age },
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
  y += 6; // Espaço após o cabeçalho

  // Helper para títulos de seção (ARIAL 14, NEGRITO)
  const drawSectionTitle = (title: string) => {
    y = checkPageBreak(doc, y, 15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title.toUpperCase() + ":", MARGIN_X, y);
    y += 6;
  };

  // 3. OBJETIVO (Justificado, Arial 12)
  if (resume.summary) {
    drawSectionTitle("Objetivo");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    y = justifyText(doc, resume.summary, MARGIN_X, y, CONTENT_W, 6);
    y += 8; // Espaço entre conteúdos
  }

  // 4. FORMAÇÃO ACADÊMICA
  if (resume.education?.length) {
    drawSectionTitle("Formação Acadêmica");
    
    for (const edu of resume.education) {
      y = checkPageBreak(doc, y, 10);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(edu.degree || "Curso", MARGIN_X, y);
      y += 6;
      
      doc.setFont("helvetica", "normal");
      doc.text(`${edu.institution} | ${edu.period}`, MARGIN_X, y);
      y += 8;
    }
  }

  // 5. EXPERIÊNCIA PROFISSIONAL
  if (resume.experience?.length) {
    drawSectionTitle("Experiência Profissional");
    
    for (const exp of resume.experience) {
      y = checkPageBreak(doc, y, 15);
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      // Cargo
      doc.text(exp.role || "Cargo", MARGIN_X, y);
      
      // Empresa e Período (Alinhado à direita ou mesma linha)
      doc.setFont("helvetica", "normal");
      const detailsText = ` - ${exp.company} (${exp.period})`;
      doc.text(detailsText, MARGIN_X + doc.getTextWidth(exp.role || "Cargo"), y);
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
      y += 8;
    }
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
      y = checkPageBreak(doc, y, 6);
      const isLast = i === allSkills.length - 1;
      const text = allSkills[i].trim() + (isLast ? "." : ";");
      doc.text(text, MARGIN_X, y);
      y += 6;
    }
    y += 4;
  }

  // 7. INFORMAÇÕES COMPLEMENTARES
  if (resume.extras?.length) {
    drawSectionTitle("Informações Complementares");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    for (let i = 0; i < resume.extras.length; i++) {
      y = checkPageBreak(doc, y, 6);
      const isLast = i === resume.extras.length - 1;
      const text = resume.extras[i].trim() + (isLast ? "." : ";");
      doc.text(text, MARGIN_X, y);
      y += 6;
    }
    y += 4;
  }

  // 8. CURSOS COMPLEMENTARES
  if (resume.courses?.length) {
    drawSectionTitle("Cursos Complementares");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    for (let i = 0; i < resume.courses.length; i++) {
      y = checkPageBreak(doc, y, 6);
      const isLast = i === resume.courses.length - 1;
      const text = resume.courses[i].trim() + (isLast ? "." : ";");
      doc.text(text, MARGIN_X, y);
      y += 6;
    }
    y += 4;
  }

  const filename = `curriculo-${(resume.name || "profissional")
    .toLowerCase()
    .replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
