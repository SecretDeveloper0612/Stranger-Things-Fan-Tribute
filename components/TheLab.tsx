
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TheLab: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Monitor flicker
      gsap.to('.crt-flicker', {
        opacity: "random(0.3, 0.8)",
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // Text reveal animation
      gsap.fromTo('.lab-text', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-zinc-900 py-32 overflow-hidden border-y border-zinc-800">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Surveillance Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[40px] border-black/80 mix-blend-multiply z-20"></div>
      <div className="absolute top-10 left-10 z-30 flex items-center gap-3">
        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
        <span className="text-zinc-500 st-font text-xl tracking-widest">CAM 011 - THE VOID</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          {/* CRT Monitor Effect Container */}
          <div ref={monitorRef} className="relative aspect-video bg-zinc-950 rounded-xl overflow-hidden border-4 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <img 
              src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1200&auto=format&fit=crop" 
              alt="Project Indigo" 
              className="w-full h-full object-cover opacity-50 grayscale contrast-150"
            />
            
            {/* CRT Lines and Glitch Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               <div className="absolute inset-0 crt-lines opacity-20"></div>
               <div className="absolute top-0 left-0 w-full h-full crt-flicker bg-blue-500/5 mix-blend-screen"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-white/20 st-font text-8xl rotate-[-15deg] select-none">CLASSIFIED</div>
               </div>
            </div>
            
            <div className="absolute bottom-6 right-6 text-red-600/60 st-font text-2xl tracking-[0.5em]">011</div>
          </div>
          
          {/* Scientific Notes */}
          <div className="absolute -bottom-10 -right-10 bg-zinc-100 p-8 shadow-2xl rotate-3 max-w-xs hidden md:block">
            <h5 className="text-black font-bold uppercase text-xs mb-2 tracking-widest">Project Indigo Log #84</h5>
            <p className="text-zinc-700 text-sm italic st-serif">
              "Subject shows heightened response to sensory deprivation. The tear is widening. God help us all."
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-red-600 st-font text-2xl tracking-widest block mb-4 lab-text">DEPARTMENT OF ENERGY</span>
          <h2 className="st-font text-6xl md:text-8xl text-zinc-100 mb-8 lab-text">HAWKINS LAB</h2>
          <div className="space-y-6 lab-text">
            <p className="text-zinc-400 text-xl st-serif leading-relaxed italic">
              "The experiments performed at Hawkins National Laboratory weren't just science. They were a bridge to the nightmare we call home."
            </p>
            <p className="text-zinc-500 leading-relaxed">
              Dr. Martin Brenner's quest for power led to the systematic breaking of children's minds. Through sensory deprivation and psychic amplification, a door was opened that can never truly be closed.
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4 lab-text">
            {["MKUltra", "Telekinesis", "Sensory Deprivation", "The Void"].map((tag) => (
              <span key={tag} className="px-4 py-1 border border-zinc-700 text-zinc-500 text-xs uppercase tracking-widest rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .crt-lines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          ),
          linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 3px 100%;
        }
      `}</style>
    </section>
  );
};

export default TheLab;
