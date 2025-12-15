
import { GoogleGenAI } from "@google/genai";
import { Quest, QuestDifficulty, QuestStatus } from "../types";

// Safe Environment Variable Retrieval
const getEnvVar = (key: string): string => {
  try {
    if ((import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key];
    }
  } catch (e) {}
  
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
  } catch (e) {}

  return '';
};

const apiKey = getEnvVar('API_KEY');
// Initialize with dummy key to prevent crash on init if missing
const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy' });

export const generateQuestDescription = async (taskName: string): Promise<string> => {
  if (!apiKey) return `Processando diretriz: ${taskName}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Transforme esta tarefa comum em uma missão estilo cyberpunk/sci-fi curta e empolgante (máximo 15 palavras) em PORTUGUÊS: "${taskName}"`,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      }
    });
    
    return response.text?.trim() || `Protocolo de execução: ${taskName}`;
  } catch (error) {
    console.warn("Gemini offline, using fallback.");
    return `Operação manual: ${taskName}`;
  }
};

export const analyzeEfficiency = async (completedQuests: number): Promise<string> => {
  if (!apiKey) return "Neural link offline. Estatísticas indisponíveis.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `O usuário completou ${completedQuests} tarefas hoje. Dê uma notificação de sistema estilo cyberpunk de 1 frase elogiando ou observando a performance em PORTUGUÊS.`,
    });
    return response.text?.trim() || "Sistemas nominais.";
  } catch (error) {
    return "Fluxo de dados interrompido.";
  }
};
