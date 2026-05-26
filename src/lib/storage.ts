import type { ResumeData } from "./gemini";

const SESSION_KEY = "curriculo_ai_session";

interface SessionData {
  apiKey: string;
  lastInput: string;
  lastResume: ResumeData | null;
}

function getSession(): SessionData {
  if (typeof window === "undefined") {
    return { apiKey: "", lastInput: "", lastResume: null };
  }
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { apiKey: "", lastInput: "", lastResume: null };
}

function saveSession(data: Partial<SessionData>) {
  if (typeof window === "undefined") return;
  const current = getSession();
  const updated = { ...current, ...data };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
}

export function getApiKey(): string {
  return getSession().apiKey;
}

export function saveApiKey(key: string) {
  saveSession({ apiKey: key });
}

export function getLastInput(): string {
  return getSession().lastInput;
}

export function saveLastInput(input: string) {
  saveSession({ lastInput: input });
}

export function getLastResume(): ResumeData | null {
  return getSession().lastResume;
}

export function saveLastResume(resume: ResumeData) {
  saveSession({ lastResume: resume });
}

export function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}
