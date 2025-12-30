
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Villains: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Background color transition
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to("body", { backgroundColor: "#0a1128", duration: 1 });
        },
        onLeaveBack: () => {
          gsap.to("body", { backgroundColor: "#050505", duration: 1 });
        },
        scrub: true
      }
    });

    // Title breathing and glitch effect
    const titleTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    titleTimeline.to(titleRef.current, {
      scale: 1.02,
      duration: 3,
      ease: "sine.inOut"
    });

    // Entrance animation for cards
    gsap.fromTo(cardsRef.current?.children || [], 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        }
      }
    );

    // Initial reveal animation
    gsap.fromTo(textRef.current,
      { filter: "blur(10px) brightness(0)", scale: 1.1 },
      { 
        filter: "blur(0px) brightness(1)", 
        scale: 1, 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: 1
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[150vh] bg-[#0a1128] overflow-hidden flex flex-col items-center justify-center">
      {/* Moving Vines / Shadow Effect */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <filter id="distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
          </filter>
          <rect width="100" height="100" filter="url(#distort)" fill="none" stroke="rgba(229,9,20,0.15)" strokeWidth="0.8" className="animate-pulse" />
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="rgba(229,9,20,0.1)" strokeWidth="0.2" filter="url(#distort)" className="vines-anim" />
          <path d="M0,70 Q30,90 60,70 T100,70" fill="none" stroke="rgba(229,9,20,0.05)" strokeWidth="0.5" filter="url(#distort)" className="vines-anim-slow" />
        </svg>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-5xl">
        <span className="st-font text-red-600 text-2xl tracking-[0.5em] mb-4 block glitch-text">WARNING</span>
        <h2 ref={titleRef} className="st-font text-7xl md:text-[11rem] text-zinc-100 leading-none select-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          UPSIDE DOWN
        </h2>
        <p className="mt-8 text-zinc-400 text-xl md:text-2xl st-serif italic max-w-2xl mx-auto opacity-80">
          "It's like Hawkins, but with monsters. And it's cold. And it smells like death."
        </p>
        
        <div ref={cardsRef} className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {[
            { name: "DEMOGORGON", desc: "The mindless predator. Pure, raw hunger from the shadows." },
            { name: "MIND FLAYER", desc: "The shadow that rules. A hive mind of cosmic dread." },
            { name: "VECNA", desc: "The architect of trauma. A human spirit turned god of misery." }
          ].map((villain, i) => (
            <div 
              key={villain.name}
              className={`group p-10 border border-zinc-800 bg-black/40 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-red-600/50 hover:-translate-y-2 ${i === 1 ? 'md:scale-110 md:z-20' : 'md:z-10'}`}
            >
              {/* Animated corner glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <h4 className="st-font text-3xl text-red-600 mb-6 tracking-wider group-hover:text-red-500 transition-colors">
                {villain.name}
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition-colors">
                {villain.desc}
              </p>
              
              {/* Subtle scanning line effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-b from-transparent via-red-600/20 to-transparent scanline h-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/20 w-1 h-1 rounded-full blur-[2px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${7 + Math.random() * 8}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
        }

        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        .scanline {
          animation: scanline 3s linear infinite;
        }

        .vines-anim {
          animation: undulate 10s ease-in-out infinite alternate;
        }

        .vines-anim-slow {
          animation: undulate 15s ease-in-out infinite alternate-reverse;
        }

        @keyframes undulate {
          from { stroke-dashoffset: 0; transform: scaleX(1); }
          to { stroke-dashoffset: 100; transform: scaleX(1.1); }
        }

        .glitch-text {
          animation: glitch 4s infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); opacity: 1; }
          1% { transform: translate(-2px, 2px); opacity: 0.8; }
          2% { transform: translate(2px, -2px); opacity: 1; }
          3% { transform: translate(0); }
          50% { transform: translate(0); }
          51% { transform: translate(3px, 0); color: #fff; }
          52% { transform: translate(0); color: #E50914; }
          100% { transform: translate(0); }
        }
      `}</style>
    </section>
  );
};

export default Villains;
