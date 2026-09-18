import React, { useState } from 'react';
import { Camera, Star, ArrowRight, ShieldCheck, Sparkles, Eye, Ruler, Award, Compass } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, TESTIMONIALS, FACE_SHAPE_RECOMMENDATIONS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const Home = () => {
  const { navigateTo, setArProduct, setSelectedCategory, setSelectedShape } = useStore();
  const [selectedFaceShape, setSelectedFaceShape] = useState(FACE_SHAPE_RECOMMENDATIONS[0]);

  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="w-full flex flex-col space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Category Grid Showcase */}
      <CategoryGrid />

      {/* 3. Bestsellers Showcase */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4">
            <div>
              <span className="badge-gold text-xs inline-block mb-2.5">ATELIER HIGHLIGHTS</span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                Signature Optical Silhouettes
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="btn-outline text-xs sm:text-sm py-3 px-6 flex items-center gap-2 rounded-xl"
            >
              <span>Explore Complete Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Virtual Fitting Mirror & Precision Fit Studio */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#121622] via-[#090d16] to-[#04060a] border border-[#d4af37]/30 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center shadow-2xl">
            <div>
              <span className="bg-[#d4af37]/15 text-[var(--accent-gold)] border border-[#d4af37]/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider inline-block mb-4">
                ✦ BESPOKE OPTICAL FITTING
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight font-serif">
                Experience Millimeter-Scale Fitting Before You Order
              </h3>

              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-8">
                Every face structure possesses unique cheekbone geometry and pupillary distance. Our Virtual Mirror accurately aligns frame scale, temple width, and bridge proportion to your natural contours.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span className="text-[var(--text-primary)]">Real-Time Facial Calibration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span className="text-[var(--text-primary)]">Accurate Millimeter Scale</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setArProduct(PRODUCTS[0])}
                  className="btn-gold py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25"
                >
                  <Camera className="w-4 h-4" /> Launch Virtual Fitting Mirror
                </button>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="btn-outline py-3.5 px-6 text-sm font-semibold rounded-2xl flex items-center justify-center"
                >
                  Optometric Size Guide &rarr;
                </button>
              </div>
            </div>

            <div className="relative text-center">
              <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
                <img
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80"
                  alt="Fitting Studio Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-left">
                    <span className="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-wider block">
                      Live Calibration
                    </span>
                    <h5 className="text-sm sm:text-base font-bold text-white font-serif">
                      Apex Titanium Aviator • Precision Atelier Edition
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Face Shape Frame Finder Interactive Section */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="badge-gold text-xs inline-block mb-2">CURATED STYLING</span>
            <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] font-serif">
              Find Your Ideal Silhouette by Face Shape
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto mt-2">
              Select your facial profile below to explore optometrist-recommended frame geometries crafted to balance your natural features.
            </p>
          </div>

          {/* Face Shape Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {FACE_SHAPE_RECOMMENDATIONS.map((fs) => (
              <button
                key={fs.shape}
                onClick={() => setSelectedFaceShape(fs)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
                  selectedFaceShape.shape === fs.shape
                    ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/20 font-bold'
                    : 'glass-panel text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {fs.shape}
              </button>
            ))}
          </div>

          {/* Selected Face Shape Recommendation Display */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xl bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex-1">
              <span className="text-[10px] text-[var(--accent-gold)] font-mono uppercase tracking-wider block mb-1">
                OPTICIAN'S RECOMMENDATION
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-serif mb-2">
                Flattering Silhouettes for {selectedFaceShape.shape}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {selectedFaceShape.tip}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[var(--text-muted)] mr-1">Recommended Styles:</span>
                {selectedFaceShape.recommendedStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => {
                      setSelectedShape(style);
                      navigateTo('shop');
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#d4af37]/10 text-[var(--accent-gold)] border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-slate-950 transition-colors"
                  >
                    {style} &rarr;
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedShape('All');
                navigateTo('shop');
              }}
              className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold rounded-xl shrink-0"
            >
              Shop {selectedFaceShape.shape.split(' ')[0]} Frames
            </button>
          </div>
        </div>
      </section>

      {/* 6. Optical Lab Craftsmanship Standards */}
      <section className="w-full relative block bg-white/[0.01] py-12 border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-base text-[var(--text-primary)] mb-1">Ultra-Light Titanium</h5>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Engineered with flexible aerospace-grade titanium, weighing as little as 9 grams with zero nose-bridge fatigue.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-base text-[var(--text-primary)] mb-1">Hand-Polished Acetate</h5>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Organic cellulose acetate, precision hand-buffed for skin comfort, vibrant color depth, and lasting durability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-base text-[var(--text-primary)] mb-1">Anti-Glare &amp; Blue Cut</h5>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Multi-layer hydrophobic anti-reflective coatings that banish digital screen eye strain and repel smudges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[var(--accent-gold)] shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-serif font-bold text-base text-[var(--text-primary)] mb-1">Optometric Accuracy</h5>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Every prescription lens is individually surfaced, laser-checked, and glazed with accurate pupillary distance (PD).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals Showcase */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4">
            <div>
              <span className="badge-gold text-xs inline-block mb-2.5">NEW ARRIVALS</span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                Spring / Summer 2026 Editions
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="btn-outline text-xs sm:text-sm py-3 px-6 flex items-center gap-2 rounded-xl"
            >
              <span>Explore All New Frames</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Patron Testimonials */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="badge-gold text-xs inline-block mb-2.5">VERIFIED REVIEWS</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
              Words from Our Discerning Patrons
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-panel p-8 rounded-3xl flex flex-col justify-between gap-6 border border-[var(--border-color)] shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-primary)] italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-3.5 pt-5 border-t border-[var(--border-color)]">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover shrink-0 border border-[#d4af37]/40 shadow-sm" />
                  <div>
                    <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug font-serif">
                      {t.name}
                    </h5>
                    <span className="text-[11px] text-[var(--text-muted)] block">
                      {t.role} • {t.city}
                    </span>
                    <span className="text-[10px] text-[var(--accent-gold)] font-mono">
                      Verified: {t.purchasedProduct}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
