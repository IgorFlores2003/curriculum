"use client";

import { generateResumePDF } from "@/lib/pdf";
import { generateResumeDocx } from "@/lib/docx-gen";
import type { ResumeData } from "@/lib/gemini";
import { FileText, FileDown } from "lucide-react";

interface ExportButtonsProps {
  resume: ResumeData;
}

export default function ExportButtons({ resume }: ExportButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        id="download-pdf-btn"
        onClick={() => generateResumePDF(resume)}
        className="flex-1 flex items-center justify-center gap-2 bg-red-50 border-2 border-red-300 text-red-700 font-bold py-3 rounded-xl hover:bg-red-100 hover:border-red-400 transition-all text-sm"
      >
        <FileText className="w-5 h-5" />
        Baixar PDF
      </button>
      <button
        id="download-docx-btn"
        onClick={() => generateResumeDocx(resume)}
        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 border-2 border-blue-300 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100 hover:border-blue-400 transition-all text-sm"
      >
        <FileDown className="w-5 h-5" />
        Baixar DOCX
      </button>
    </div>
  );
}
