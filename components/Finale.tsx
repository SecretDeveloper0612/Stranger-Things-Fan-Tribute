
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
  const riftRef = useRef<HTMLDivElement>(null);
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
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
        
        // Initial random flickering
        tl.to(".alphabet-light", {
          opacity: 0.2,
          duration: 0.1,
          stagger: { amount: 1, from: "random" },
          repeat: 5,
          yoyo: true
        });

        // Spell the message
        MESSAGE.split('').forEach((char, i) => {
          tl.to(`.light-${char}`, {
            opacity: 1,
            filter: 'brightness(2.5) blur(6px)',
            backgroundColor: '#FFD700', // Gold/Yellow glow
            duration: 0.6,
            ease: "power2.inOut"
          })
          .to(`.light-${char}`, {
            opacity: 0.1,
            filter: 'brightness(1) blur(0px)',
            backgroundColor: 'currentColor',
            duration: 0.4
          }, "+=0.2");
        });

        // Final burst
        tl.to(".alphabet-light", {
          opacity: 0.8,
          duration: 0.05,
          repeat: 10,
          yoyo: true,
          stagger: 0.02
        });
      };

      spellMessage();

      // Bicycle Silhouette Animation
      gsap.to(bikesRef.current, {
        x: "100vw",
        duration: 25,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: false
        }
      });

      // Rift Pulse
      gsap.to(riftRef.current, {
        opacity: 0.6,
        scale: 1.2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Spores/Particles drifting
      const particles = document.querySelectorAll('.finale-particle');
      particles.forEach((p) => {
        gsap.to(p, {
          y: -window.innerHeight,
          x: "random(-200, 200)",
          opacity: 0,
          duration: "random(15, 25)",
          repeat: -1,
          ease: "none",
          delay: "random(0, 15)"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lightColors = ['#E50914', '#FFD700', '#4682B4', '#006400', '#FF4500'];

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-black flex flex-col items-center justify-start py-40 px-4 overflow-hidden">
      
      {/* 1. Cinematic Rift Background */}
      <div ref={riftRef} className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-full bg-[radial-gradient(circle,rgba(229,9,20,0.08)_0%,transparent_70%)] pointer-events-none"></div>

      {/* 2. Floating Spores/Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="finale-particle absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              bottom: "-20px",
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* 3. Alphabet Wall (The Joyce Byers Prop) */}
      <div ref={wallRef} className="relative z-20 w-full max-w-4xl mx-auto mb-32 p-12 bg-stone-900/10 backdrop-blur-md rounded-lg border border-white/5 shadow-2xl overflow-hidden">
        {/* Grungy Wall Texture Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none grayscale mix-blend-overlay" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')"}}></div>
        
        <div className="flex flex-col gap-12 md:gap-16 relative">
          {ALPHABET_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-6 md:gap-10 flex-wrap">
              {row.map((char, charIdx) => {
                const color = lightColors[(charIdx + rowIdx) % lightColors.length];
                // Random jitter for hand-painted look
                const rotation = (Math.random() * 10 - 5);
                const jitterY = (Math.random() * 6 - 3);

                return (
                  <div key={char} className="flex flex-col items-center" style={{ transform: `translateY(${jitterY}px)` }}>
                    {/* The Light Bulb */}
                    <div 
                      className={`alphabet-light light-${char} w-4 h-6 rounded-full mb-6 opacity-10 transition-all duration-300 shadow-[0_0_20px_currentColor]`}
                      style={{ 
                        backgroundColor: color,
                        color: color,
                        boxShadow: `0 0 20px ${color}`
                      }}
                    />
                    {/* The Painted Letter */}
                    <span 
                      className="st-handwritten text-4xl md:text-6xl text-zinc-100 opacity-60 select-none tracking-tighter"
                      style={{ 
                        transform: `rotate(${rotation}deg)`,
                        color: '#0a0a0a',
                        textShadow: '0px 0px 1px rgba(255,255,255,0.1)',
                        WebkitTextStroke: '0.5px rgba(255,255,255,0.05)'
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
        
        {/* Hanging Wire Visuals */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
          <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
            <path d="M0,80 Q200,140 400,100 T800,80" fill="none" stroke="#222" strokeWidth="2" />
            <path d="M0,260 Q200,320 400,280 T800,260" fill="none" stroke="#222" strokeWidth="2" />
            <path d="M0,440 Q200,500 400,460 T800,440" fill="none" stroke="#222" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="relative z-20 text-center max-w-5xl">
        <h2 ref={titleRef} className="st-title text-6xl md:text-[14rem] text-zinc-100 leading-none tracking-tighter drop-shadow-2xl mb-8">
          THE END<br/>
          <span className="text-red-600 glitch-hover transition-all duration-300">IS NEAR</span>
        </h2>
        
        <p className="mt-8 text-zinc-400 text-xl md:text-2xl st-serif italic max-w-3xl mx-auto leading-snug">
          "The gate is wide open. The messages from the void are no longer whispers. The final stand approaches."
        </p>

        {/* The Party Bicycle Silhouette Animation */}
        <div ref={bikesRef} className="mt-32 w-full h-24 relative opacity-40 pointer-events-none overflow-visible">
          <div className="absolute left-[-200px] flex items-end gap-16 grayscale invert">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm14-8.5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm-4.2-10l-1-1.3c-.4-.5-1-.8-1.7-.8H7v2h3.5l1.8 2.3-3.2 5.3 1.7 1 3.2-5.3 2.1 2.7H19V11h-4.2z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-12 relative">
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
          animation: glitch-text 0.2s infinite;
        }

        @keyframes glitch-text {
          0% { transform: translate(0); }
          25% { transform: translate(-5px, 3px); }
          50% { transform: translate(-5px, -3px); }
          75% { transform: translate(5px, 3px); }
          100% { transform: translate(5px, -3px); }
        }

        .alphabet-light {
          transition: opacity 0.3s ease, filter 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Finale;
