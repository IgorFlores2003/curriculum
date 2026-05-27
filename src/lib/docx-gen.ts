import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Packer,
  ShadingType,
  convertInchesToTwip,
} from "docx";
import { saveAs } from "file-saver";
import type { ResumeData } from "./gemini";

const BLACK = "000000";
const FONT = "Arial";

function hr(): Paragraph {
  return new Paragraph({
    border: {
      bottom: { color: BLACK, size: 2, space: 1, style: BorderStyle.SINGLE },
    },
    spacing: { after: 120 },
  });
}

function sectionTitle(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        color: BLACK,
        size: 28, // 14pt
        font: FONT,
      }),
    ],
    spacing: { before: 240, after: 120 },
  });
}

function bulletLine(text: string, isLast: boolean, spacingAfter: number = 0): Paragraph {
  let processedText = text.trim();
  if (processedText.endsWith(";") || processedText.endsWith(".")) {
    processedText = processedText.slice(0, -1);
  }
  processedText += isLast ? "." : ";";

  return new Paragraph({
    children: [
      new TextRun({ text: "•  ", color: BLACK, font: FONT, size: 24 }), // 12pt
      new TextRun({ text: processedText, color: BLACK, font: FONT, size: 24 }),
    ],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 0, after: spacingAfter }, // Usa o parâmetro em vez de 0 hardcoded
    indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.25) },
  });
}

export async function generateResumeDocx(resume: ResumeData): Promise<void> {
  const children: Paragraph[] = [];

  // ── Nome ─────────────────────────────────────────────────────────
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: (resume.name || "Nome Completo").toUpperCase(),
          bold: true,
          color: BLACK,
          size: 28, // 14pt
          font: FONT,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    })
  );

  // Linha abaixo do nome
  children.push(hr());

  // ── Contato ────────────────────────────────────────────────────────
  const contacts = [
    { label: "E-mail:", value: resume.contact?.email },
    { label: "Telefone:", value: resume.contact?.phone },
    { label: "Endereço:", value: resume.contact?.location },
    { label: "Data de Nascimento:", value: resume.contact?.birthDate },
    { label: "LinkedIn:", value: resume.contact?.linkedin },
  ];

  for (const c of contacts) {
    if (c.value) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${c.label} `,
              bold: true,
              color: BLACK,
              size: 24, // 12pt
              font: FONT,
            }),
            new TextRun({
              text: c.value,
              color: BLACK,
              size: 24, // 12pt
              font: FONT,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 20, after: 20 },
        })
      );
    }
  }

  // Linha após contatos
  children.push(hr());

  // Helper para os novos títulos
  const secTitle = (t: string) => sectionTitle(t.toUpperCase() + ":");

  // ── OBJETIVO ───────────────────────────────────────────
  if (resume.summary) {
    children.push(secTitle("Objetivo"));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: resume.summary,
            color: BLACK,
            size: 24, // 12pt
            font: FONT,
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { before: 60, after: 120 },
      })
    );
  }

  // ── FORMAÇÃO ACADÊMICA ──────────────────────────────────────────────────────
  if (resume.education?.length) {
    children.push(secTitle("Formação Acadêmica"));
    for (let i = 0; i < resume.education.length; i++) {
      const edu = resume.education[i];
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree || "Curso", bold: true, color: BLACK, size: 24, font: FONT }),
          ],
          spacing: { before: 120, after: 40 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.institution} | ${edu.period}`, color: BLACK, size: 24, font: FONT }),
          ],
          spacing: { after: i === resume.education.length - 1 ? 120 : 0 },
        })
      );
    }
  }

  // ── EXPERIÊNCIA PROFISSIONAL ───────────────────────────────────────────────────
  if (resume.experience?.length) {
    children.push(secTitle("Experiência Profissional"));
    for (let eIndex = 0; eIndex < resume.experience.length; eIndex++) {
      const exp = resume.experience[eIndex];
      children.push(
        // Empresa (Negrito)
        new Paragraph({
          children: [
            new TextRun({ text: exp.company || "Empresa", bold: true, color: BLACK, size: 24, font: FONT }),
          ],
          spacing: { before: 120, after: 0 },
        }),
        // Cargo (Normal)
        new Paragraph({
          children: [
            new TextRun({ text: exp.role || "Cargo", color: BLACK, size: 24, font: FONT }),
          ],
          spacing: { before: 40, after: 0 },
        }),
        // Período (Normal)
        new Paragraph({
          children: [
            new TextRun({ text: exp.period || "Período", color: BLACK, size: 24, font: FONT }),
          ],
          spacing: { before: 40, after: 60 },
        })
      );
      
      const descs = exp.description || [];
      for (let i = 0; i < descs.length; i++) {
        const isVeryLastExp = eIndex === resume.experience.length - 1 && i === descs.length - 1;
        children.push(bulletLine(descs[i], i === descs.length - 1, isVeryLastExp ? 120 : 0));
      }
    }
  }

  // ── COMPETÊNCIAS E HABILIDADES ───────────────────────────────────────────────────
  if (resume.skills?.length || resume.languages?.length) {
    children.push(secTitle("Competências e Habilidades"));
    
    const allSkills = [...(resume.skills || [])];
    if (resume.languages?.length) {
      for (const l of resume.languages) {
        allSkills.push(`${l.language} (${l.level})`);
      }
    }

    for (let i = 0; i < allSkills.length; i++) {
      const isLast = i === allSkills.length - 1;
      children.push(bulletLine(allSkills[i], isLast, isLast ? 120 : 0));
    }
  }

  // ── INFORMAÇÕES COMPLEMENTARES ───────────────────────────────────────────────────────
  if (resume.extras?.length) {
    children.push(secTitle("Informações Complementares"));
    for (let i = 0; i < resume.extras.length; i++) {
      const isLast = i === resume.extras.length - 1;
      children.push(bulletLine(resume.extras[i], isLast, isLast ? 120 : 0));
    }
  }

  // ── CURSOS COMPLEMENTARES ───────────────────────────────────────────────────────
  if (resume.courses?.length) {
    children.push(secTitle("Cursos Complementares"));
    for (let i = 0; i < resume.courses.length; i++) {
      const isLast = i === resume.courses.length - 1;
      children.push(bulletLine(resume.courses[i], isLast, isLast ? 120 : 0));
    }
  }

  // ── Montar documento ──────────────────────────────────────────────
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(0.8),
              right: convertInchesToTwip(0.8),
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const filename = `curriculo-${(resume.name || "profissional")
    .toLowerCase()
    .replace(/\s+/g, "-")}.docx`;
  saveAs(blob, filename);
}
