import React, { useState } from 'react';
import { Star, Heart, Eye, Camera, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { 
    navigateTo, 
    toggleWishlist, 
    isWishlisted, 
    addToCart, 
    setQuickViewProduct, 
    setArProduct,
    setPrescriptionProduct,
    formatPrice
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const isWish = isWishlisted(product.id);

  return (
    <div className="glass-panel rounded-3xl overflow-hidden transition-all duration-300 flex flex-col relative group hover:-translate-y-1.5 border border-[var(--border-color)] hover:border-[#d4af37]/60 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/10">
      {/* Product Image Box & Badges */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#050810] flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-500 cursor-pointer group-hover:scale-105 drop-shadow-md"
          onClick={() => navigateTo('product-detail', product.id)}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent && (
            <span className="bg-rose-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
              NEW RELEASE
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#d4af37] text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`btn-icon absolute top-3 right-3 z-10 w-9 h-9 sm:w-10 sm:h-10 backdrop-blur-md transition-transform active:scale-95 rounded-xl ${
            isWish ? 'border-rose-500 bg-rose-500/20' : 'bg-slate-900/60 border-white/20'
          }`}
          title={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWish ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
        </button>

        {/* Quick View & Virtual Mirror Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 sm:group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setArProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-[#d4af37] hover:bg-[#c5a880] backdrop-blur-md rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-lg"
          >
            <Camera className="w-3.5 h-3.5" /> Mirror
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 px-3 bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-lg"
            title="Inspect frame"
          >
            <Eye className="w-3.5 h-3.5" /> Inspect
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Gender / Material Tag */}
          <div className="flex justify-between items-center mb-2 text-xs text-[var(--text-muted)] font-medium">
            <span>{product.gender} • {product.frameShape}</span>
            <span className="text-[var(--accent-gold)] font-mono text-[11px]">{product.material}</span>
          </div>

          {/* Title */}
          <h4
            onClick={() => navigateTo('product-detail', product.id)}
            className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 cursor-pointer hover:text-[var(--accent-gold)] transition-colors font-serif leading-snug line-clamp-1"
          >
            {product.name}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">
              {product.rating}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              ({product.reviewsCount} verified)
            </span>
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`w-5 h-5 rounded-full transition-all cursor-pointer ${
                    selectedColor?.name === c.name ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-xs text-[var(--text-muted)] ml-1 line-clamp-1">
                {selectedColor?.name}
              </span>
            </div>
          )}
        </div>

        {/* Price & Cart Actions */}
        <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
          <div>
            <div className="text-lg sm:text-xl font-bold text-[var(--accent-gold)] font-mono">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through block font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {(product.category === 'prescription' || product.secondaryCategories?.includes('prescription')) && (
              <button
                onClick={() => setPrescriptionProduct(product)}
                className="bg-[var(--accent-gold)]/15 border border-[#d4af37]/30 text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/25 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Customize Prescription"
              >
                + Rx
              </button>
            )}

            <button
              onClick={() => addToCart(product, selectedColor)}
              className="btn-gold px-3.5 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 rounded-xl shadow-md shadow-[#d4af37]/20"
              title="Add frame to bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
