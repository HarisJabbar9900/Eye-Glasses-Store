import React from 'react';
import { Camera, Star, ArrowRight } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, TESTIMONIALS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const Home = () => {
  const { navigateTo, setArProduct, setSelectedCategory } = useStore();

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
              <span className="badge-gold text-xs inline-block mb-2.5">CUSTOMER FAVORITES</span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                Bestselling Eyewear Frames
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="btn-outline text-xs sm:text-sm py-3 px-6 flex items-center gap-2"
            >
              <span>View Full Catalog</span>
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

      {/* 4. Virtual AR Fitting Studio Interactive Banner */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center shadow-2xl">
            <div>
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider inline-block mb-4">
                ✦ REAL-TIME AR TECHNOLOGY
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight font-serif">
                Try On Any Frame Live Before You Order
              </h3>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8">
                Never second-guess how a pair of glasses will suit your facial contours. Our Virtual Fitting Mirror uses real-time 3D camera scaling to render frames with exact optical proportion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setArProduct(PRODUCTS[0])}
                  className="btn-gold bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-lg shadow-cyan-500/25"
                >
                  <Camera className="w-5 h-5" /> Launch Virtual AR Mirror
                </button>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="btn-outline py-3.5 px-6 text-sm flex items-center justify-center"
                >
                  Frame Size Guide &rarr;
                </button>
              </div>
            </div>

            <div className="relative text-center">
              <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/40">
                <img
                  src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80"
                  alt="AR Studio Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Showcase */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4">
            <div>
              <span className="badge-gold text-xs inline-block mb-2.5">NEW RELEASE</span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
                Spring 2026 New Arrivals
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('shop');
              }}
              className="btn-outline text-xs sm:text-sm py-3 px-6 flex items-center gap-2"
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

      {/* 6. Customer Testimonials */}
      <section className="w-full relative block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="badge-gold text-xs inline-block mb-2.5">VERIFIED REVIEWS</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
              Loved by Over 50,000+ Eye Care Clients
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

                  <p className="text-sm sm:text-base text-[var(--text-primary)] italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-4 pt-6 border-t border-[var(--border-color)]">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#d4af37]/40 shadow-sm" />
                  <div>
                    <h5 className="text-base font-bold text-[var(--text-primary)] leading-snug font-serif">
                      {t.name}
                    </h5>
                    <span className="text-xs text-[var(--text-muted)] block mt-0.5">
                      {t.role} • Verified Buyer ({t.purchasedProduct})
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

