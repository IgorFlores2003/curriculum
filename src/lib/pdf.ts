import jsPDF from "jspdf";
import type { ResumeData } from "./gemini";

const COLORS = {
  primary: [37, 99, 235] as [number, number, number],
  dark: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  accent: [99, 102, 241] as [number, number, number],
  bg: [248, 250, 252] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  border: [226, 232, 240] as [number, number, number],
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const COL_LEFT_W = 68;
const COL_RIGHT_X = MARGIN + COL_LEFT_W + 8;
const COL_RIGHT_W = PAGE_W - COL_RIGHT_X - MARGIN;

function setColor(
  doc: jsPDF,
  color: [number, number, number],
  type: "fill" | "text" | "draw" = "fill"
) {
  if (type === "fill") doc.setFillColor(...color);
  else if (type === "text") doc.setTextColor(...color);
  else doc.setDrawColor(...color);
}

function addPage(doc: jsPDF) {
  doc.addPage();
  drawSidebar(doc);
}

function drawSidebar(doc: jsPDF) {
  setColor(doc, COLORS.dark, "fill");
  doc.rect(0, 0, MARGIN + COL_LEFT_W + 4, PAGE_H, "F");
}

function sectionTitle(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  isLeft = false
): number {
  const color = isLeft ? COLORS.white : COLORS.primary;
  setColor(doc, color, "text");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(text.toUpperCase(), x, y);

  setColor(doc, isLeft ? COLORS.accent : COLORS.border, "draw");
  doc.setLineWidth(0.5);
  doc.line(x, y + 1.5, x + (isLeft ? COL_LEFT_W - 2 : COL_RIGHT_W), y + 1.5);
  return y + 7;
}

function wrapText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight = 4.5
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeight;
}

export function generateResumePDF(resume: ResumeData): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  drawSidebar(doc);

  let leftY = 20;
  const leftX = MARGIN;

  setColor(doc, COLORS.white, "text");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const nameLines = doc.splitTextToSize(resume.name || "Seu Nome", COL_LEFT_W - 4);
  doc.text(nameLines, leftX, leftY);
  leftY += nameLines.length * 7 + 2;

  setColor(doc, COLORS.accent, "fill");
  doc.roundedRect(leftX, leftY - 1, COL_LEFT_W - 4, 6, 1, 1, "F");
  setColor(doc, COLORS.white, "text");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  const titleText = doc.splitTextToSize(resume.title || "", COL_LEFT_W - 8);
  doc.text(titleText, leftX + 2, leftY + 3.5);
  leftY += titleText.length * 5 + 8;

  leftY = sectionTitle(doc, "Contato", leftX, leftY, true);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setColor(doc, COLORS.bg, "text");

  const contacts = [
    { icon: "✉", value: resume.contact?.email },
    { icon: "☎", value: resume.contact?.phone },
    { icon: "⌖", value: resume.contact?.location },
    { icon: "in", value: resume.contact?.linkedin },
    { icon: "⊛", value: resume.contact?.github },
  ];

  for (const c of contacts) {
    if (!c.value) continue;
    doc.setFont("helvetica", "bold");
    doc.text(c.icon, leftX, leftY);
    doc.setFont("helvetica", "normal");
    const valLines = doc.splitTextToSize(c.value, COL_LEFT_W - 8);
    doc.text(valLines, leftX + 5, leftY);
    leftY += valLines.length * 4 + 1.5;
  }

  leftY += 6;

  if (resume.skills?.length) {
    leftY = sectionTitle(doc, "Habilidades", leftX, leftY, true);
    doc.setFontSize(7.5);
    for (const skill of resume.skills) {
      setColor(doc, [50, 65, 90] as [number, number, number], "fill");
      doc.roundedRect(leftX, leftY - 3.5, COL_LEFT_W - 4, 5.5, 1, 1, "F");
      setColor(doc, COLORS.white, "text");
      doc.setFont("helvetica", "normal");
      doc.text(skill, leftX + 2, leftY + 0.5);
      leftY += 7;
      if (leftY > PAGE_H - 20) break;
    }
    leftY += 4;
  }

  if (resume.languages?.length) {
    leftY = sectionTitle(doc, "Idiomas", leftX, leftY, true);
    doc.setFontSize(8);
    for (const lang of resume.languages) {
      setColor(doc, COLORS.white, "text");
      doc.setFont("helvetica", "bold");
      doc.text(lang.language, leftX, leftY);
      setColor(doc, COLORS.bg, "text");
      doc.setFont("helvetica", "normal");
      doc.text(lang.level, leftX, leftY + 4);
      leftY += 9;
    }
  }

  let rightY = 20;
  const rx = COL_RIGHT_X;

  if (resume.summary) {
    rightY = sectionTitle(doc, "Sobre Mim", rx, rightY, false);
    setColor(doc, COLORS.dark, "text");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    rightY = wrapText(doc, resume.summary, rx, rightY, COL_RIGHT_W);
    rightY += 8;
  }

  if (resume.experience?.length) {
    rightY = sectionTitle(doc, "Experiência Profissional", rx, rightY, false);

    for (const exp of resume.experience) {
      if (rightY > PAGE_H - 30) { addPage(doc); rightY = 20; }

      setColor(doc, COLORS.dark, "text");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(exp.role || "", rx, rightY);

      setColor(doc, COLORS.muted, "text");
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.text(`${exp.company}  ·  ${exp.period}`, rx, rightY + 5);
      rightY += 10;

      doc.setFontSize(8.5);
      for (const desc of exp.description || []) {
        if (rightY > PAGE_H - 20) { addPage(doc); rightY = 20; }
        setColor(doc, COLORS.primary, "text");
        doc.text("▸", rx, rightY);
        setColor(doc, COLORS.dark, "text");
        const lines = doc.splitTextToSize(desc, COL_RIGHT_W - 5);
        doc.text(lines, rx + 4, rightY);
        rightY += lines.length * 4.5;
      }
      rightY += 6;
    }
  }

  if (resume.education?.length) {
    if (rightY > PAGE_H - 40) { addPage(doc); rightY = 20; }
    rightY = sectionTitle(doc, "Formação Acadêmica", rx, rightY, false);

    for (const edu of resume.education) {
      setColor(doc, COLORS.dark, "text");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(edu.degree || "", rx, rightY);

      setColor(doc, COLORS.muted, "text");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`${edu.institution}  ·  ${edu.period}`, rx, rightY + 5);
      rightY += 12;
    }
  }

  setColor(doc, COLORS.muted, "text");
  doc.setFontSize(7);
  doc.text(
    `Gerado com IA em ${new Date().toLocaleDateString("pt-BR")}`,
    COL_RIGHT_X,
    PAGE_H - 8
  );

  const filename = `curriculo-${(resume.name || "profissional")
    .toLowerCase()
    .replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);
}
