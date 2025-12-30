
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { scale: 1.5, opacity: 0, filter: 'blur(10px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=1"
    );

    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      scale: 1.1,
      opacity: 0.5,
      y: 100
    });
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1920&h=1080&auto=format&fit=crop" 
          alt="Hawkins Background" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 
          ref={titleRef}
          className="st-title st-logo text-7xl md:text-[10rem] leading-none select-none"
        >
          STRANGER THINGS
        </h1>
        <div ref={subtitleRef} className="mt-8 flex flex-col items-center">
          <p className="st-serif text-2xl md:text-3xl text-zinc-300 italic tracking-wide">
            From Hawkins to the Upside Down
          </p>
          <div className="mt-6 flex items-center gap-6 text-zinc-500 font-bold uppercase tracking-[0.5em] text-sm st-font">
            <span>2016</span>
            <div className="w-16 h-[1.5px] bg-red-600"></div>
            <span>2025</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-zinc-600 st-font text-xs tracking-widest animate-pulse">SCROLL TO ENTER</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-red-600 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
