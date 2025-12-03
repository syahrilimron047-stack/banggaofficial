import React, { useState } from 'react';
import { generateCreativeContent } from '../services/geminiService';
import { GeneratorMode } from '../types';

const StudioAI: React.FC = () => {
  const [mode, setMode] = useState<GeneratorMode>(GeneratorMode.LYRICS);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult('');
    
    const output = await generateCreativeContent(mode, prompt);
    
    setResult(output);
    setLoading(false);
  };

  return (
    <section id="studio-ai" className="py-24 bg-[#151515] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <div className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-accent text-xs font-bold tracking-widest uppercase rounded-full mb-4">
              Powered by Gemini 2.5 Flash
            </div>
            <h2 className="font-display text-4xl font-bold text-white mb-6">
              Bangga Creative Assistant <span className="text-brand-primary">AI</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Buntu ide saat menulis lagu? Atau butuh saran teknis cepat? 
              Gunakan asisten AI kami yang didesain untuk membantu proses kreatifmu di BanggaOfficial.
              Gratis untuk semua musisi.
            </p>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  { id: GeneratorMode.LYRICS, label: 'Tulis Lirik' },
                  { id: GeneratorMode.PRODUCTION_TIPS, label: 'Tips Produksi' },
                  { id: GeneratorMode.NAME_GENERATOR, label: 'Ide Nama' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      mode === m.id 
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                        : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {mode === GeneratorMode.LYRICS ? 'Topik Lagu / Mood' : mode === GeneratorMode.PRODUCTION_TIPS ? 'Masalah / Pertanyaan Teknis' : 'Kata Kunci'}
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      mode === GeneratorMode.LYRICS ? "Contoh: Patah hati di kota Jakarta saat hujan..." : 
                      mode === GeneratorMode.PRODUCTION_TIPS ? "Bagaimana cara membuat vocal terdengar tebal?" : 
                      "Indie folk, senja, kopi..."
                    }
                    className="w-full bg-[#0f0f0f] text-white p-4 rounded-xl border border-white/10 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none min-h-[120px] transition-all"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full py-4 bg-brand-accent text-brand-dark font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sedang Memproses...
                    </>
                  ) : (
                    'Generate Ide'
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-leaf/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-[#1a1a1a] rounded-3xl border border-white/10 h-full p-8 overflow-hidden flex flex-col">
               <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <span className="ml-auto text-xs text-gray-600 font-mono">OUTPUT_CONSOLE</span>
               </div>
               
               <div className="flex-1 overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-brand-primary/50 scrollbar-track-transparent">
                 {result ? (
                   <div className="whitespace-pre-wrap text-gray-300 animate-fade-in">
                     {result}
                   </div>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-gray-700">
                     <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                     </svg>
                     <p>Hasil AI akan muncul di sini...</p>
                   </div>
                 )}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StudioAI;