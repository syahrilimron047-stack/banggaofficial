import { GoogleGenAI, Type, Modality } from "@google/genai";
import { GeneratorMode, SongDraft } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helpers for Audio Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// 1. Existing Text Generation
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

// 2. New Song Draft Generation (Structured JSON)
export const generateSongDraft = async (prompt: string): Promise<SongDraft | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Buat lagu lengkap berdasarkan deskripsi: "${prompt}". Output harus JSON.`,
      config: {
        systemInstruction: "Kamu adalah 'Bangga Composer AI', mesin pembuat lagu canggih seperti Suno AI tetapi fokus pada struktur komposisi. Buat judul, gaya musik, lirik lengkap (Verse 1, Chorus, Verse 2, Chorus, Outro), dan progresi chord dasar.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            style: { type: Type.STRING, description: "Genre dan mood musik, misal: 'Indie Folk, Melancholic'" },
            mood: { type: Type.STRING },
            lyrics: { type: Type.STRING, description: "Lirik lengkap dengan penanda bagian [Verse], [Chorus]" },
            chords: { type: Type.STRING, description: "Progresi chord utama untuk gitar/piano" },
            description: { type: Type.STRING, description: "Deskripsi singkat tentang vibe lagu ini" }
          },
          required: ["title", "style", "lyrics", "chords", "description"]
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        ...data,
        id: Date.now().toString(),
        createdAt: Date.now()
      };
    }
    return null;
  } catch (error) {
    console.error("Error generating song draft:", error);
    throw error;
  }
};

// 3. Audio Generation (TTS for Vocal Guide)
export const generateSongAudio = async (textToSpeak: string): Promise<AudioBuffer | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: textToSpeak }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' }, // Deep, resonant voice suitable for drafts
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        outputAudioContext,
        24000,
        1,
      );
      return audioBuffer;
    }
    return null;
  } catch (error) {
    console.error("Error generating audio:", error);
    return null;
  }
};