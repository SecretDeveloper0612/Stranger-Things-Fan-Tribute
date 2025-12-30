
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CHARACTERS } from '../constants';

const CharacterSpotlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.char-panel');
    
    // Significantly increased the scroll distance (500% per panel) and scrub value (3)
    // to provide a much slower, more cinematic horizontal scroll experience.
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 3, // Higher scrub value makes the movement feel "heavier" and slower
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.3, max: 1.2 },
          delay: 0.2,
          ease: "power2.inOut"
        },
        start: "top top",
        end: () => `+=${panels.length * 500}%`, // 5x total width for maximum slow-down
      }
    });

    // Parallax effect for the background images relative to the horizontal movement
    panels.forEach((panel: any) => {
      gsap.fromTo(panel.querySelector('.char-img'), 
        { x: "-30%", scale: 1.3, filter: 'grayscale(1)' },
        { 
          x: "30%",
          scale: 1, 
          filter: 'grayscale(0)',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        }
      );

      // Text reveal animation per panel
      gsap.fromTo(panel.querySelector('.char-content'),
        { y: 80, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 70%",
            end: "left 30%",
            scrub: true
          }
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-zinc-950 overflow-hidden h-screen flex flex-nowrap">
      <div className="flex h-full min-w-full">
        {/* Intro Panel - THE PARTY */}
        <div className="char-panel min-w-full h-full flex flex-col justify-center px-12 md:px-32 bg-black relative">
           <h2 className="st-font text-6xl md:text-8xl text-zinc-100 opacity-10 absolute top-20 select-none">HAWKINS HEROES</h2>
           <div className="max-w-2xl char-content">
             <h3 className="st-font text-8xl md:text-[10rem] text-red-600 leading-none">THE<br/>PARTY</h3>
             <p className="mt-8 text-zinc-400 text-xl md:text-2xl st-serif leading-relaxed">
               The heroes we didn't expect, the family they chose. Bound by secrets, loyalty, and a world that turned Upside Down.
             </p>
             <div className="mt-12 flex items-center gap-6">
               <div className="w-24 h-[1px] bg-red-600"></div>
               <span className="text-zinc-500 st-font text-2xl tracking-[0.4em] animate-pulse">SCROLL TO MEET THEM</span>
             </div>
           </div>
        </div>

        {/* Individual Character Panels */}
        {CHARACTERS.map((char) => (
          <div key={char.name} className="char-panel min-w-full h-full flex items-center justify-center relative p-8 md:p-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={char.imageUrl} 
                className="char-img w-full h-full object-cover opacity-20" 
                alt={char.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12 char-content">
              <div className="order-2 md:order-1">
                <span className="inline-block px-3 py-1 bg-red-600 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 text-white">THE PARTY • CLASSIFIED</span>
                <h3 className="st-font text-7xl md:text-9xl text-zinc-100">{char.name}</h3>
                <blockquote className="mt-6 border-l-4 border-red-600 pl-6 bg-red-900/5 py-4">
                  <p className="st-serif text-3xl md:text-4xl italic text-zinc-300 leading-tight">"{char.quote}"</p>
                </blockquote>
                <p className="mt-8 text-zinc-400 text-lg md:text-xl leading-relaxed max-w-md st-serif">
                  {char.arc}
                </p>
              </div>
              
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative group">
                    <div className="absolute -inset-12 bg-red-600/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <img 
                      src={char.imageUrl} 
                      alt={char.name} 
                      className="w-64 md:w-[26rem] aspect-[2/3] object-cover rounded-sm shadow-2xl relative z-10 border border-zinc-800 transition-all duration-1000 ease-out group-hover:scale-[1.05] group-hover:border-red-600/30 group-hover:shadow-[0_0_100px_-20px_rgba(229,9,20,0.5)]" 
                    />
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSpotlight;
