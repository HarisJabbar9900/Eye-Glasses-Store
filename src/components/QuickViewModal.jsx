import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Camera, Eye, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FrameViewer360 } from './FrameViewer360';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isWishlisted,
    setArProduct,
    navigateTo,
    setSelectedProductId,
    formatPrice
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'gallery'

  useEffect(() => {
    if (quickViewProduct?.colors?.length) {
      setSelectedColor(quickViewProduct.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWish = isWishlisted(quickViewProduct.id);
  const gallery = quickViewProduct.gallery || [quickViewProduct.image];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[96vh] md:max-h-[92vh] rounded-2xl sm:rounded-3xl overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
        {/* Left Column: Gallery & Optical Studio */}
        <div className="p-3.5 sm:p-6 bg-[#050810] flex flex-col gap-3 sm:gap-4 border-b md:border-b-0 md:border-r border-[var(--border-color)]">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-gold text-[9px] sm:text-[10px] tracking-wider uppercase truncate">
              {quickViewProduct.gender} • {quickViewProduct.frameShape}
            </span>

            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => setViewMode('studio')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  viewMode === 'studio'
                    ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm font-bold'
                    : 'bg-slate-900/80 text-[var(--text-secondary)] border-white/10 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                  viewMode === 'gallery'
                    ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm font-bold'
                    : 'bg-slate-900/80 text-[var(--text-secondary)] border-white/10 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Photos</span>
              </button>
            </div>
          </div>

          {viewMode === 'studio' ? (
            <FrameViewer360 product={quickViewProduct} activeColor={selectedColor} />
          ) : (
            <>
              <div className="relative w-full h-56 xs:h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-[var(--border-color)] flex items-center justify-center p-4">
                <img
                  src={gallery[activeImageIndex] || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                />
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`btn-icon absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 backdrop-blur-md rounded-xl ${
                    isWish ? 'border-rose-500 bg-rose-500/10' : 'bg-slate-900/60 border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                </button>
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden cursor-pointer shrink-0 border transition-all p-1 bg-black/40 ${
                        activeImageIndex === idx ? 'border-2 border-[#d4af37] scale-105' : 'border-[var(--border-color)] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="p-4 sm:p-7 flex flex-col gap-3.5 sm:gap-4 overflow-y-auto">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] sm:text-xs text-[var(--accent-gold)] tracking-widest font-mono uppercase">
                {quickViewProduct.material}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mt-0.5 font-serif line-clamp-1">
                {quickViewProduct.name}
              </h3>
            </div>
            <button onClick={() => setQuickViewProduct(null)} className="btn-icon w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">{quickViewProduct.rating}</span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)]">({quickViewProduct.reviewsCount} verified reviews)</span>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--accent-gold)] font-serif flex items-baseline gap-2">
            {formatPrice(quickViewProduct.price)}
            {quickViewProduct.originalPrice && (
              <span className="text-xs sm:text-sm text-[var(--text-muted)] line-through font-normal font-sans">
                {formatPrice(quickViewProduct.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
            {quickViewProduct.description}
          </p>

          {/* Color Selection */}
          {quickViewProduct.colors && (
            <div>
              <label className="text-[10px] sm:text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1.5">
                Frame Finish: <strong className="text-[var(--accent-gold)]">{selectedColor?.name}</strong>
              </label>
              <div className="flex gap-2">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer transition-all ${
                      selectedColor?.name === c.name ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 scale-110' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Specifications */}
          {quickViewProduct.specs && (
            <div className="grid grid-cols-2 gap-2 p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px]">
              <div>
                <span className="text-[var(--text-muted)] block">Hinge Architecture:</span>
                <span className="text-[var(--text-primary)] font-medium truncate block">{quickViewProduct.specs.hingeType || '5-Barrel Precision'}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block">Lens Material:</span>
                <span className="text-[var(--text-primary)] font-medium truncate block">{quickViewProduct.specs.lensMaterial || 'CR-39 Anti-Glare'}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <button
              onClick={() => {
                addToCart(quickViewProduct, selectedColor);
                setQuickViewProduct(null);
              }}
              className="btn-gold w-full py-3 sm:py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25"
            >
              <ShoppingBag className="w-4 h-4" /> Add Frame to Bag
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setArProduct(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="btn-outline flex-1 py-2 sm:py-2.5 text-xs text-[var(--accent-gold)] border-[#d4af37]/30 hover:border-[#d4af37] rounded-xl font-medium"
              >
                <Camera className="w-3.5 h-3.5 inline mr-1" /> Virtual Mirror
              </button>
              <button
                onClick={() => {
                  setSelectedProductId(quickViewProduct.id);
                  navigateTo('product-detail');
                  setQuickViewProduct(null);
                }}
                className="btn-outline flex-1 py-2 sm:py-2.5 text-xs rounded-xl font-medium"
              >
                Atelier Details &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
