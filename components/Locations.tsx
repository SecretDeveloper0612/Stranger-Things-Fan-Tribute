
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { LOCATIONS } from '../constants';

const Locations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.location-card');
    
    gsap.fromTo(cards, 
      { scale: 0.9, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-40 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="st-font text-5xl md:text-7xl text-zinc-100 tracking-widest mb-4">HAWKINS ARCHIVE</h2>
          <div className="w-24 h-[1px] bg-red-600 mx-auto"></div>
          <p className="mt-6 text-zinc-500 st-serif italic text-xl">The places that shaped a decade of mystery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {LOCATIONS.map((loc) => (
            <div 
              key={loc.id} 
              className="location-card group relative h-[500px] rounded-lg overflow-hidden border border-zinc-900 transition-all duration-500 hover:border-red-600/30 shadow-2xl"
            >
              {/* Image Layer */}
              <img 
                src={loc.imageUrl} 
                alt={loc.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-red-600 font-bold st-font text-sm tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                  LOCATION REPORT
                </span>
                <h3 className="st-font text-4xl text-zinc-100 mb-4">{loc.name}</h3>
                <p className="text-zinc-400 text-sm st-serif italic leading-relaxed mb-6">
                  "{loc.description}"
                </p>
                
                <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 border-t border-zinc-800 pt-6">
                   <h4 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Tactical Significance</h4>
                   <p className="text-zinc-500 text-xs leading-relaxed">{loc.significance}</p>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-4 right-4 text-zinc-800 st-font text-3xl opacity-20 group-hover:text-red-600 group-hover:opacity-100 transition-all">
                #0{loc.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
