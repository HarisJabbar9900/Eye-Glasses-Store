import React from 'react';
import { Award, ShieldCheck, Heart, Glasses, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutUs = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">OUR HERITAGE &amp; MISSION</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            Redefining Eyewear Through Precision Optics &amp; Timeless Elegance
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
            Founded in 2012 by master optometrists and industrial sculptors, LUMEN &amp; OPTIC bridges high-fashion aesthetic design with clinical optical perfection.
          </p>
        </div>

        {/* Story Banner */}
        <div className="glass-panel p-8 sm:p-10 lg:p-12 rounded-3xl mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[var(--border-color)] shadow-xl">
          <div className="lg:col-span-7">
            <span className="text-[var(--accent-gold)] text-xs font-bold tracking-widest uppercase block mb-2">✦ BESPOKE OPTICAL CRAFTSMANSHIP</span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4 font-serif leading-tight">
              Handcrafted With Surgical Precision
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              Every single frame undergoes over 120 meticulous hand-polishing and optical calibration steps. We engineer our eyewear with featherlight beta-titanium and organic plant-based bio-acetate to create frames that are ultra-light, highly resilient, and comfortable for all-day wear.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-semibold text-[var(--accent-gold)]">
              <span className="flex items-center gap-2">✦ 100% Hypoallergenic Beta-Titanium</span>
              <span className="flex items-center gap-2">✦ Hand-Polished Bio-Acetate</span>
              <span className="flex items-center gap-2">✦ Zero-Distortion Anti-Glare Lenses</span>
              <span className="flex items-center gap-2">✦ Sub-micron Laser Calibration</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
              alt="Craftsmanship"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-3xl shadow-2xl border border-[var(--border-color)]"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between shadow-md">
            <div>
              <Award className="w-10 h-10 text-[var(--accent-gold)] mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">Optical Excellence</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Our state-of-the-art optical lab cuts prescription lenses with sub-micron robotic precision, eliminating peripheral distortion.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between shadow-md">
            <div>
              <ShieldCheck className="w-10 h-10 text-cyan-400 mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">Doctor Guarantee</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Every prescription order is verified by licensed optometrists before shipping. If your vision isn't 100% sharp, we remake them free.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[var(--border-color)] flex flex-col justify-between shadow-md">
            <div>
              <Heart className="w-10 h-10 text-rose-500 mb-4" />
              <h4 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">Sustainable Luxury</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                We plant one tree for every frame sold and utilize 100% recyclable, biodegradable packaging materials.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigateTo('shop')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Explore Our Eyewear Collection &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
