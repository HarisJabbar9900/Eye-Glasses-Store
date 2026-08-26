import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, Heart, Camera, RotateCw } from 'lucide-react';
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
    setSelectedProductId
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | '360'

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
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-5 animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-y-auto lg:overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl bg-[var(--bg-primary)]">
        {/* Left Column: Gallery */}
        <div className="p-5 sm:p-7 bg-[#050810] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setViewMode(viewMode === '360' ? 'photo' : '360')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                viewMode === '360'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-900 text-cyan-400 border-cyan-500/30 hover:bg-slate-800'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              {viewMode === '360' ? 'Show Photos' : '360° Interactive Orbit'}
            </button>
          </div>

          {viewMode === '360' ? (
            <FrameViewer360 product={quickViewProduct} activeColor={selectedColor} />
          ) : (
            <>
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-[var(--border-color)]">
                <img
                  src={gallery[activeImageIndex] || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`btn-icon absolute top-3 right-3 z-10 w-9 h-9 backdrop-blur-md ${
                    isWish ? 'border-rose-500 bg-rose-500/10' : 'bg-slate-900/60 border-white/20'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWish ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                </button>
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer shrink-0 border transition-all ${
                        activeImageIndex === idx ? 'border-2 border-[#d4af37] scale-105' : 'border-[var(--border-color)] opacity-70'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Details */}
        <div className="p-6 sm:p-8 flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-start">
            <div>
              <span className="badge-gold text-xs">
                {quickViewProduct.gender} • {quickViewProduct.frameShape}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mt-2 font-serif line-clamp-1">
                {quickViewProduct.name}
              </h3>
            </div>
            <button onClick={() => setQuickViewProduct(null)} className="btn-icon w-9 h-9 shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-sm font-bold text-[var(--text-primary)]">{quickViewProduct.rating}</span>
            <span className="text-xs text-[var(--text-muted)]">({quickViewProduct.reviewsCount} reviews)</span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--accent-gold)] font-serif">
            Rs. {quickViewProduct.price.toLocaleString()}{' '}
            {quickViewProduct.originalPrice && (
              <span className="text-sm text-[var(--text-muted)] line-through font-normal">
                Rs. {quickViewProduct.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
            {quickViewProduct.description}
          </p>

          {/* Colors */}
          {quickViewProduct.colors && (
            <div>
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                Color: <strong className="text-[var(--accent-gold)]">{selectedColor?.name}</strong>
              </label>
              <div className="flex gap-2.5">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full cursor-pointer transition-all ${
                      selectedColor?.name === c.name ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 scale-110' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2.5 mt-auto pt-3">
            <button
              onClick={() => {
                addToCart(quickViewProduct, selectedColor);
                setQuickViewProduct(null);
              }}
              className="btn-gold w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25"
            >
              <ShoppingBag className="w-4 h-4" /> Add Frame to Bag
            </button>

            <div className="flex gap-2">
              {quickViewProduct.arStyle && (
                <button
                  onClick={() => {
                    setArProduct(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="btn-outline flex-1 py-2.5 text-xs text-cyan-400 border-cyan-500/40 rounded-xl font-medium"
                >
                  <Camera className="w-3.5 h-3.5 inline mr-1" /> AR Try-On
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedProductId(quickViewProduct.id);
                  navigateTo('product-detail');
                  setQuickViewProduct(null);
                }}
                className="btn-outline flex-1 py-2.5 text-xs rounded-xl font-medium"
              >
                Full Details &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
