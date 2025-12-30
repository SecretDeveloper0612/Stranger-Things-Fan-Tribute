
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const TRACKS = [
  { 
    id: 'kids', 
    season: 'Season 1', 
    title: 'Kids', 
    prompt: 'In a deep, mysterious, slightly distorted voice, say: Season one. Kids. A melody of innocence lost in the woods of Hawkins. The synth pulses like a heartbeat in the dark.' 
  },
  { 
    id: 'hill', 
    season: 'Season 4', 
    title: 'Running Up That Hill', 
    prompt: 'In a breathless, emotional, haunting voice, say: Season four. Running up that hill. A deal with God to swap our places. The sound of escaping the shadows of the mind.' 
  },
  { 
    id: 'puppets', 
    season: 'Season 4', 
    title: 'Master of Puppets', 
    prompt: 'In a gritty, intense, powerful cinematic voice, say: Season four. Master of Puppets. The ultimate shred. For Eddie. For Hawkins. For the metal.' 
  }
];

// Helper functions for audio processing as per Google GenAI guidelines
function decodeBase64(base64: string) {
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

const MusicSection: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
    setActiveTrack(null);
  };

  const playTrack = async (trackId: string, prompt: string) => {
    if (activeTrack === trackId) {
      stopAudio();
      return;
    }

    if (activeTrack) stopAudio();

    setIsLoading(trackId);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' }, // Using 'Puck' for a more mysterious tone
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data returned");

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const audioBuffer = await decodeAudioData(
        decodeBase64(base64Audio),
        audioContextRef.current,
        24000,
        1
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setActiveTrack(null);
      };

      source.start();
      sourceRef.current = source;
      setActiveTrack(trackId);
    } catch (error) {
      console.error("Audio generation failed:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section className="bg-zinc-950 py-40 overflow-hidden relative">
      {/* Background Synth Waveform Animation Visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="flex items-center gap-2 h-64">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 bg-red-600 rounded-full transition-all duration-500 ${activeTrack ? 'opacity-100' : 'opacity-40'}`}
              style={{
                height: `${20 + Math.random() * 80}%`,
                animation: activeTrack 
                  ? `soundwave ${0.5 + Math.random()}s infinite ease-in-out alternate`
                  : `soundwave ${2 + Math.random()}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="st-font text-4xl text-red-600 mb-6">THE SOUND OF HAWKINS</h2>
        <p className="st-serif text-3xl italic text-zinc-300 mb-12">
          "If I only could, I'd make a deal with God, and I'd get him to swap our places."
        </p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {TRACKS.map((track) => (
            <div 
              key={track.id}
              onClick={() => playTrack(track.id, track.prompt)}
              className={`p-6 bg-black border transition-all duration-500 w-48 group cursor-pointer relative overflow-hidden ${
                activeTrack === track.id ? 'border-red-600 shadow-[0_0_30px_rgba(229,9,20,0.3)]' : 'border-zinc-900 hover:border-red-600/50'
              }`}
            >
              {isLoading === track.id && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                  <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className={`w-12 h-12 border-2 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                activeTrack === track.id ? 'bg-red-600 border-red-600' : 'border-red-600 group-hover:bg-red-600'
              }`}>
                {activeTrack === track.id ? (
                  <div className="flex gap-1 items-center">
                    <div className="w-1 h-3 bg-white animate-pulse"></div>
                    <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent translate-x-1"></div>
                )}
              </div>
              
              <span className="st-font text-sm text-zinc-500 block">{track.season}</span>
              <span className="text-zinc-100 font-bold block mt-1">{track.title}</span>
              
              {activeTrack === track.id && (
                <div className="mt-4 text-[10px] text-red-600 st-font tracking-widest animate-pulse">
                  PLAYING NARRATION...
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-16 text-zinc-600 text-xs uppercase tracking-widest">
          Narrated by the Voice of the Void • Generated with Gemini AI
        </p>
      </div>

      <style>{`
        @keyframes soundwave {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.8); }
        }
      `}</style>
    </section>
  );
};

export default MusicSection;
