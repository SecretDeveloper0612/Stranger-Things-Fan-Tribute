
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ALPHABET_ROWS = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
  ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

const MESSAGE = "RUNHEISHERE";

const Finale: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bikesRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, filter: 'blur(20px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1
          }
        }
      );

      // Alphabet Wall Lighting Animation
      const spellMessage = () => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        
        // Initial random flickering
        tl.to(".alphabet-light", {
          opacity: 0.3,
          duration: 0.1,
          stagger: { amount: 1, from: "random" },
          repeat: 3,
          yoyo: true
        });

        // Spell the message
        MESSAGE.split('').forEach((char) => {
          tl.to(`.light-${char}`, {
            opacity: 1,
            filter: 'brightness(3) blur(8px)',
            backgroundColor: '#FFD700',
            duration: 0.5,
            ease: "power2.in"
          })
          .to(`.light-${char}`, {
            opacity: 0.15,
            filter: 'brightness(1) blur(0px)',
            backgroundColor: 'currentColor',
            duration: 0.3
          }, "+=0.15");
        });

        // Final burst
        tl.to(".alphabet-light", {
          opacity: 1,
          duration: 0.05,
          repeat: 8,
          yoyo: true,
          stagger: { amount: 0.5, from: "center" }
        });
      };

      spellMessage();

      // Bicycle Silhouette Animation
      gsap.to(bikesRef.current, {
        x: "110vw",
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lightColors = ['#E50914', '#FFD700', '#4682B4', '#006400', '#FF4500'];

  return (
    <section ref={containerRef} className="relative min-h-[180vh] bg-black flex flex-col items-center justify-start py-40 px-4 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(229,9,20,0.1)_0%,transparent_60%)] pointer-events-none"></div>

      {/* 3. Alphabet Wall */}
      <div ref={wallRef} className="relative z-20 w-full max-w-5xl mx-auto mb-32 p-16 rounded-sm shadow-2xl overflow-hidden border border-zinc-800"
        style={{
          backgroundColor: '#d2c2a8', // Vintage wallpaper color
          backgroundImage: `url('https://www.transparenttextures.com/patterns/p6.png'), radial-gradient(circle at center, transparent, rgba(0,0,0,0.2))`,
        }}
      >
        {/* Floral Pattern Overlays */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}></div>
        
        <div className="flex flex-col gap-16 md:gap-24 relative z-10">
          {ALPHABET_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-6 md:gap-12 flex-wrap">
              {row.map((char, charIdx) => {
                const color = lightColors[(charIdx + rowIdx) % lightColors.length];
                const rotation = (Math.random() * 14 - 7);

                return (
                  <div key={char} className="flex flex-col items-center">
                    {/* The Light Bulb */}
                    <div 
                      className={`alphabet-light light-${char} w-4 h-6 rounded-full mb-8 opacity-15 transition-all duration-300`}
                      style={{ 
                        backgroundColor: color,
                        color: color,
                        boxShadow: `0 0 15px ${color}`
                      }}
                    />
                    {/* The Painted Letter - Rock Salt Font */}
                    <span 
                      className="st-handwritten text-4xl md:text-7xl font-black select-none tracking-tighter"
                      style={{ 
                        transform: `rotate(${rotation}deg)`,
                        color: '#111', // Deep black "paint"
                        opacity: 0.85,
                        filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))'
                      }}
                    >
                      {char}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Grungy Cables */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
            <path d="M0,110 Q250,160 500,120 T1000,110" fill="none" stroke="#222" strokeWidth="3" />
            <path d="M0,320 Q250,370 500,330 T1000,320" fill="none" stroke="#222" strokeWidth="3" />
            <path d="M0,530 Q250,580 500,540 T1000,530" fill="none" stroke="#222" strokeWidth="3" />
          </svg>
        </div>
      </div>

      <div className="relative z-20 text-center max-w-5xl">
        <h2 ref={titleRef} className="st-title text-6xl md:text-[12rem] text-zinc-100 leading-none tracking-tighter mb-8">
          THE END<br/>
          <span className="text-red-600 glitch-hover transition-all duration-300">IS NEAR</span>
        </h2>
        
        <p className="mt-8 text-zinc-400 text-xl md:text-2xl st-serif italic max-w-3xl mx-auto leading-snug">
          "Hawkins will fall. The Gate is open. One last stand for everything we love."
        </p>

        {/* The Party Bicycle Silhouette Animation */}
        <div ref={bikesRef} className="mt-40 w-full h-24 relative opacity-40 pointer-events-none overflow-visible left-[-20%]">
          <div className="flex items-end gap-16 grayscale invert">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm14-8.5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm-4.2-10l-1-1.3c-.4-.5-1-.8-1.7-.8H7v2h3.5l1.8 2.3-3.2 5.3 1.7 1 3.2-5.3 2.1 2.7H19V11h-4.2z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="mt-48 grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-12 relative">
          <div className="text-center group cursor-default">
            <span className="block st-font text-6xl text-zinc-100 mb-2 group-hover:text-red-600 transition-colors">2016</span>
            <span className="text-zinc-500 uppercase tracking-widest text-xs border-t border-zinc-800 pt-2">The Vanishing</span>
          </div>
          <div className="hidden md:flex flex-col items-center">
             <div className="w-[1px] h-24 bg-gradient-to-b from-red-600 to-transparent"></div>
             <div className="text-red-600 st-font text-2xl my-4 animate-pulse">VS</div>
             <div className="w-[1px] h-24 bg-gradient-to-t from-zinc-800 to-transparent"></div>
          </div>
          <div className="text-center group cursor-default">
            <span className="block st-font text-6xl text-red-600 mb-2 group-hover:scale-110 transition-transform">2025</span>
            <span className="text-zinc-500 uppercase tracking-widest text-xs border-t border-zinc-800 pt-2">The Final Stand</span>
          </div>
        </div>
      </div>

      <style>{`
        .glitch-hover:hover {
          text-shadow: 4px 0 #fff, -4px 0 #ff0000;
          animation: st-glitch 0.2s infinite;
        }

        @keyframes st-glitch {
          0% { transform: translate(0); }
          25% { transform: translate(-3px, 2px); }
          50% { transform: translate(-3px, -2px); }
          75% { transform: translate(3px, 2px); }
          100% { transform: translate(3px, -2px); }
        }

        .alphabet-light {
          transition: opacity 0.2s ease, filter 0.2s ease;
        }
      `}</style>
    </section>
  );
};

export default Finale;
