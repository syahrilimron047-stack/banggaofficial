import { GoogleGenAI } from "@google/genai";
import { GeneratorMode } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeContent = async (
  mode: GeneratorMode, 
  promptInput: string
): Promise<string> => {
  
  let systemInstruction = "";
  
  switch (mode) {
    case GeneratorMode.LYRICS:
      systemInstruction = "Kamu adalah penulis lagu profesional untuk BanggaOfficial Studio. Buat lirik lagu yang puitis dan bermakna dalam Bahasa Indonesia berdasarkan topik yang diberikan. Sertakan struktur (Verse, Chorus, Bridge).";
      break;
    case GeneratorMode.PRODUCTION_TIPS:
      systemInstruction = "Kamu adalah audio engineer senior di BanggaOfficial Studio. Berikan tips mixing atau recording teknis yang jelas dan actionable untuk pemula hingga menengah.";
      break;
    case GeneratorMode.NAME_GENERATOR:
      systemInstruction = "Kamu adalah branding consultant musik. Buatkan daftar 5 nama band atau judul lagu yang unik, filosofis, dan menarik berdasarkan kata kunci.";
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptInput,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
      }
    });

    return response.text || "Maaf, ide sedang buntu. Coba lagi nanti.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten kreatif. Pastikan API Key valid.";
  }
};