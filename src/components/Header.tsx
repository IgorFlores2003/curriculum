import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-brand-primary border-b border-brand-dark/30 shadow-lg">
      <div className="w-full px-6 sm:px-8 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo Psicologia */}
          <div className="flex items-center gap-3">
            <img
              src="/psicologo-logo.jpg"
              alt="Logo Psicologia"
              className="h-10 sm:h-14 w-auto rounded-xl shadow-sm"
            />
          </div>

          {/* Título central */}
          <div className="flex-1 text-center hidden sm:block">
            <p className="text-white text-2xl font-black tracking-widest mb-1">
              VitaeLab
            </p>
            <h1 className="text-white font-bold text-sm leading-tight">
              Inteligência para construir currículos mais estratégicos
            </h1>
          </div>
        </div>

        {/* Mobile title */}
        <div className="text-center mt-3 sm:hidden">
          <h1 className="text-white font-bold text-xs leading-snug opacity-90">
            Orientação Profissional & Currículos
          </h1>
        </div>
      </div>
    </header>
  );
}
