
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import CharacterSpotlight from './components/CharacterSpotlight';
import TheLab from './components/TheLab';
import Villains from './components/Villains';
import Locations from './components/Locations';
import Gallery from './components/Gallery';
import MusicSection from './components/MusicSection';
import Finale from './components/Finale';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Global scroll animations could go here
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-black overflow-x-hidden">
      {/* Decorative Red Fog Background Fixed */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-800 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="relative z-10">
        <Hero />
        <Timeline />
        <CharacterSpotlight />
        <TheLab />
        <Villains />
        <Locations />
        <Gallery />
        <MusicSection />
        <Finale />
      </main>

      <footer className="py-12 text-center text-zinc-500 text-sm border-t border-zinc-900 relative z-10 bg-black">
        <p className="mb-2">A Tribute to Stranger Things (2016 - 2025)</p>
        <p>© Fan-made Project. Not affiliated with Netflix or The Duffer Brothers.</p>
      </footer>
    </div>
  );
};

export default App;
