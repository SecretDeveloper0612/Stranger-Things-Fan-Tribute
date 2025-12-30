
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEASONS } from '../constants';

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.season-section');
    
    sections.forEach((section: any, i: number) => {
      gsap.fromTo(section.querySelector('.content-box'), 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      gsap.to(section.querySelector('.bg-image'), {
        y: -50,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="st-font text-5xl text-center mb-32 text-zinc-100 tracking-widest">THE TIMELINE</h2>
        
        <div className="space-y-40">
          {SEASONS.map((season, idx) => (
            <div key={season.id} className="season-section relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
              <div className={`relative overflow-hidden rounded-lg aspect-video ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <img 
                  src={season.imageUrl} 
                  alt={season.theme} 
                  className="bg-image w-full h-full object-cover opacity-60 scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              </div>

              <div className={`content-box space-y-6 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-4">
                  <span className="st-font text-6xl text-red-600/30">{idx + 1}</span>
                  <div className="h-[1px] flex-grow bg-red-600/30"></div>
                  <span className="st-font text-3xl text-zinc-100">{season.year}</span>
                </div>
                
                <h3 className="st-font text-4xl text-zinc-100 uppercase">{season.theme}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed st-serif italic">
                  "{season.description}"
                </p>
                
                <button className="group flex items-center gap-2 text-red-600 uppercase tracking-widest text-sm font-bold mt-4 hover:text-white transition-colors duration-300">
                  Relive the season
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
