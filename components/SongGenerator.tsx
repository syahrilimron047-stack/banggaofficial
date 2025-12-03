import React, { useState, useRef } from 'react';
import { SongDraft } from '../types';
import { generateSongDraft, generateSongAudio } from '../services/geminiService';

const SongGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [songs, setSongs] = useState<SongDraft[]>([]);
  const [activeSong, setActiveSong] = useState<SongDraft | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const newSong = await generateSongDraft(prompt);
      if (newSong) {
        setSongs([newSong, ...songs]);
        setActiveSong(newSong);
      }
    } catch (e) {
      alert("Gagal membuat lagu. Coba lagi.");
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  const handlePlayAudio = async (song: SongDraft) => {
    // Stop current if playing
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }

    if (activeSong?.id === song.id && isPlaying) {
      setIsPlaying(false);
      return;
    }

    setActiveSong(song);
    setLoadingAudio(true);

    try {
      // Generate vocal guide using only the first part of lyrics for demo
      const demoLyrics = song.lyrics.split('\n').slice(0, 8).join(' '); 
      const audioBuffer = await generateSongAudio(demoLyrics);

      if (audioBuffer) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        }
        
        const ctx = audioContextRef.current;
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        
        source.onended = () => setIsPlaying(false);
        
        source.start();
        sourceNodeRef.current = source;
        setIsPlaying(true);
      }
    } catch (e) {
      console.error("Audio playback error", e);
    } finally {
      setLoadingAudio(false);
    }
  };

  return (
    <section id="ai-composer" className="py-20 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-brand-accent text-xs font-bold tracking-[0.3em] uppercase">Fitur Baru</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Bangga <span className="italic text-brand-primary">Composer</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Buat demo lagu instan dengan AI. Dapatkan lirik, chord, dan panduan vokal dalam hitungan detik. Powered by Gemini.
          </p>
        </div>

        {/* Generator Input Area */}
        <div className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-2xl p-2 md:p-4 border border-white/10 shadow-2xl mb-16">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Jelaskan lagu yang ingin dibuat (misal: Lagu akustik sedih tentang hujan di Bogor)"
              className="flex-grow bg-[#0f0f0f] text-white placeholder-gray-500 rounded-xl px-6 py-4 outline-none border border-transparent focus:border-brand-primary transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button
              onClick={handleCreate}
              disabled={isGenerating || !prompt.trim()}
              className="bg-brand-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-brand-primary/20"
            >
              {isGenerating ? 'Creating...' : 'Create Song'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[500px]">
          
          {/* Left: Song List (Suno Style) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg px-2">Library</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
              {songs.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                  <p className="text-gray-500">Belum ada lagu. Buat sekarang!</p>
                </div>
              )}
              
              {songs.map((song) => (
                <div 
                  key={song.id}
                  onClick={() => setActiveSong(song)}
                  className={`group p-4 rounded-xl cursor-pointer transition-all border ${
                    activeSong?.id === song.id 
                    ? 'bg-white/5 border-brand-primary/50' 
                    : 'bg-[#151515] border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Generated "Album Art" Placeholder */}
                    <div className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${
                      song.id.endsWith('1') ? 'from-purple-900 to-brand-dark' : 
                      song.id.endsWith('2') ? 'from-brand-primary to-brand-dark' :
                      'from-blue-900 to-gray-900'
                    }`}>
                      <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h4 className={`font-bold truncate ${activeSong?.id === song.id ? 'text-brand-accent' : 'text-white'}`}>
                        {song.title}
                      </h4>
                      <p className="text-xs text-gray-400 truncate">{song.style}</p>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); handlePlayAudio(song); }}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-primary text-white transition-colors"
                    >
                      {loadingAudio && activeSong?.id === song.id ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : isPlaying && activeSong?.id === song.id ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      ) : (
                        <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detail View */}
          <div className="lg:col-span-7">
            {activeSong ? (
              <div className="bg-[#151515] border border-white/5 rounded-2xl p-8 h-full min-h-[600px] flex flex-col relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{activeSong.title}</h2>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-brand-accent border border-white/10">{activeSong.style}</span>
                        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">{activeSong.mood}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handlePlayAudio(activeSong)}
                      className="bg-brand-accent text-brand-dark px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors flex items-center gap-2"
                    >
                       {isPlaying ? 'Stop Audio' : 'Play Guide'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Lyrics Column */}
                    <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Lyrics</h3>
                      <pre className="font-sans text-gray-300 whitespace-pre-wrap leading-loose text-sm">
                        {activeSong.lyrics}
                      </pre>
                    </div>

                    {/* Info Column */}
                    <div className="space-y-6">
                      <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">Chord Progression</h3>
                        <p className="text-brand-primary font-mono text-lg font-bold">{activeSong.chords}</p>
                      </div>
                      
                      <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">About this Song</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{activeSong.description}</p>
                      </div>

                      <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                        <p className="text-xs text-brand-accent">
                          <strong>Note:</strong> Gunakan hasil ini sebagai referensi rekaman di BanggaOfficial Studio. Audio yang diputar adalah "Vocal Guide" (TTS) untuk referensi ritme lirik.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-white/5 rounded-2xl bg-[#151515] min-h-[400px]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="text-lg">Pilih atau buat lagu untuk melihat detail</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SongGenerator;