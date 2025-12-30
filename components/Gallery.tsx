
import React from 'react';
import { GALLERY_ITEMS } from '../constants';

const Gallery: React.FC = () => {
  return (
    <section className="bg-black py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-red-600 font-bold uppercase tracking-widest text-xs">A Decade of Memories</span>
            <h2 className="st-font text-5xl md:text-6xl text-zinc-100 mt-2">ICONIC MOMENTS</h2>
          </div>
          <p className="text-zinc-500 max-w-md st-serif italic">
            Capturing the essence of friendship, the thrill of the hunt, and the heartbreak of letting go.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="group relative overflow-hidden aspect-[4/3] rounded-sm cursor-pointer border border-zinc-900">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="st-font text-2xl text-zinc-100 drop-shadow-lg">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-4 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 rounded-sm st-font text-xl uppercase tracking-widest">
            View All Stills
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
