import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-brand-primary border-b border-brand-dark/30 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo Univás */}
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-36 flex-shrink-0">
              <Image
                src="/logo-univas.svg"
                alt="Logo Univás"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Título central */}
          <div className="flex-1 text-center hidden sm:block">
            <p className="text-white/90 text-xs font-semibold tracking-widest uppercase">
              Projeto de Extensão
            </p>
            <h1 className="text-white font-bold text-sm leading-tight">
              Orientação Profissional & Geração de Currículos
            </h1>
          </div>

          {/* Logo Psicologia */}
          <div className="flex items-center gap-3 justify-end">
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src="/logo-psicologia.svg"
                alt="Logo Psicologia"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white/70 text-xs font-semibold hidden md:block leading-tight text-right">
              Curso de<br/>Psicologia
            </span>
          </div>
        </div>

        {/* Mobile title */}
        <div className="text-center mt-2 sm:hidden">
          <h1 className="text-white font-bold text-sm">
            Orientação Profissional & Currículos
          </h1>
        </div>
      </div>
    </header>
  );
}
