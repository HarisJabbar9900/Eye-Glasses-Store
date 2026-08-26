import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Camera } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { useStore } from '../context/StoreContext';

export const HeroSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { navigateTo, setSelectedCategory, setArProduct, filteredProducts } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleButtonClick = () => {
    if (slide.buttonAction === 'ar-studio') {
      setArProduct(filteredProducts[0] || null);
    } else if (slide.buttonCategory) {
      setSelectedCategory(slide.buttonCategory);
      navigateTo('shop');
    } else {
      navigateTo('shop');
    }
  };

  return (
    <div className="relative w-full h-[500px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden">
      {/* Background Slide Image & Gradient */}
      <div
        key={slide.id}
        className="animate-fade-in absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `${slide.bgGradient}, url(${slide.image})`
        }}
      />

      {/* Slide Content Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="max-w-xl lg:max-w-2xl animate-fade-in py-10">
          <div className="inline-flex items-center gap-2 mb-4 flex-wrap">
            <span className="badge-gold text-xs">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              {slide.tag}
            </span>
            <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
              ✦ {slide.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 font-serif">
            {slide.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-8 max-w-xl leading-relaxed">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <button
              onClick={handleButtonClick}
              className="btn-gold text-sm sm:text-base py-3.5 px-8 flex items-center justify-center gap-2 font-semibold shadow-lg shadow-[#d4af37]/30"
            >
              {slide.buttonText} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => setArProduct(filteredProducts[0] || null)}
              className="btn-outline text-sm sm:text-base py-3.5 px-6 bg-slate-950/60 backdrop-blur-md border-white/30 text-white hover:border-[#d4af37] hover:text-[#d4af37] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> Virtual Fitting Studio
            </button>
          </div>
        </div>
      </div>

      {/* Prev / Next Slider Navigation Buttons (Visible on tablet & desktop) */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex btn-icon absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 backdrop-blur-md w-11 h-11 items-center justify-center"
        title="Previous slide"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex btn-icon absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-slate-900/60 backdrop-blur-md w-11 h-11 items-center justify-center"
        title="Next slide"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Pagination Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlideIndex 
                ? 'w-8 bg-[#d4af37]' 
                : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

