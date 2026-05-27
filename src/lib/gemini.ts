export interface ResumeData {
  name: string;
  title: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    age?: string;
  };
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  skills: string[];
  languages?: { language: string; level: string }[];
  extras?: string[];
  courses?: string[];
}

export async function generateResume(
  userInput: string,
  _apiKey?: string, // Opcional agora, pois usaremos a variável de ambiente do servidor
  retries = 3
): Promise<ResumeData> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput }),
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Rate limit atingido. Aguarda 15 segundos e tenta de novo.
        await new Promise((r) => setTimeout(r, 15000));
        return generateResume(userInput, _apiKey, retries - 1);
      }
      
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Erro do servidor: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Falha ao se comunicar com a API interna.");
  }
}
