import React, { useState } from 'react';
import { 
  Star, Heart, ShoppingBag, Camera, ShieldCheck, Truck, RefreshCw, 
  Ruler, Eye, CheckCircle2, Send, Sparkles 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { FrameViewer360 } from '../components/FrameViewer360';

export const ProductDetail = () => {
  const { 
    selectedProductId, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setArProduct, 
    setPrescriptionProduct,
    setIsSizeGuideOpen,
    addToast,
    formatPrice
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const gallery = product.gallery || [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      name: 'Hamza Malik',
      date: '2 weeks ago',
      rating: 5,
      comment: 'Exceptional titanium build quality! Extremely lightweight and the anti-reflective lens coating is crystal clear.'
    },
    {
      id: 2,
      name: 'Ayesha Siddiqui',
      date: '1 month ago',
      rating: 5,
      comment: 'Fits comfortably across the bridge with zero pinching. The optical prescription was spot on.'
    }
  ]);

  const isWish = isWishlisted(product.id);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (newComment && reviewerName) {
      setReviewsList([
        {
          id: Date.now(),
          name: reviewerName,
          date: 'Just now',
          rating: newRating,
          comment: newComment
        },
        ...reviewsList
      ]);
      setNewComment('');
      setReviewerName('');
      addToast('Thank you! Your patron review has been verified.', 'success');
    }
  };

  const [viewMode, setViewMode] = useState('studio'); // 'photo' | 'studio'

  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16 items-start">
          {/* Gallery & Studio Column */}
          <div className="flex flex-col gap-4">
            {/* View Mode Toggle Bar */}
            <div className="flex items-center justify-between bg-slate-900/60 p-1.5 rounded-2xl border border-[var(--border-color)]">
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('studio')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === 'studio'
                      ? 'bg-[var(--accent-gold)] text-slate-950 shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Studio Loupe Inspector
                </button>
                <button
                  onClick={() => setViewMode('photo')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'photo'
                      ? 'bg-[var(--accent-gold)] text-slate-950 shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  Editorial Gallery
                </button>
              </div>

              {product.arStyle && (
                <button
                  onClick={() => setArProduct(product)}
                  className="px-3.5 py-1.5 bg-[#d4af37]/15 text-[var(--accent-gold)] hover:bg-[#d4af37]/25 border border-[#d4af37]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" /> Virtual Mirror
                </button>
              )}
            </div>

            {viewMode === 'studio' ? (
              <FrameViewer360 product={product} activeColor={selectedColor} />
            ) : (
              <>
                <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden bg-[#040710] border border-[var(--border-color)] shadow-xl flex items-center justify-center p-6">
                  <img
                    src={gallery[activeImageIndex] || product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl"
                  />

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`btn-icon absolute top-4 right-4 z-10 w-11 h-11 backdrop-blur-md rounded-xl ${
                      isWish ? 'border-rose-500 bg-rose-500/10' : 'bg-slate-900/60 border-white/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWish ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                  </button>
                </div>

                {/* Thumbnail Tabs */}
                {gallery.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {gallery.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer shrink-0 border transition-all p-1 bg-black/40 ${
                          activeImageIndex === idx ? 'border-2 border-[#d4af37] shadow-md scale-105' : 'border-[var(--border-color)] opacity-70 hover:opacity-100'
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

          {/* Details Column */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="badge-gold text-xs uppercase tracking-wider">
                {product.gender} • {product.frameShape} • {product.material}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-2 font-serif">
                {product.name}
              </h2>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2.5">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-sm font-bold text-[var(--text-primary)]">{product.rating}</span>
              <span className="text-xs text-[var(--text-muted)]">({product.reviewsCount} verified patron reviews)</span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-[var(--accent-gold)] font-mono">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--text-muted)] line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && (
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] block mb-3 uppercase tracking-wider">
                  Select Frame Metallurgy / Finish: <strong className="text-[var(--accent-gold)] font-sans">{selectedColor?.name}</strong>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                        selectedColor?.name === c.name ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons Stack */}
            <div className="flex flex-col gap-3.5 mt-2">
              <div className="flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => addToCart(product, selectedColor)}
                  className="btn-gold flex-1 py-4 px-8 text-sm sm:text-base font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25"
                >
                  <ShoppingBag className="w-5 h-5" /> Add Frame to Bag
                </button>

                <button
                  onClick={() => setPrescriptionProduct(product)}
                  className="btn-outline flex-1 border-[var(--accent-gold)] text-[var(--accent-gold)] py-4 px-8 text-sm sm:text-base font-bold flex items-center justify-center gap-2 rounded-2xl"
                >
                  <Eye className="w-5 h-5" /> Add Prescription Lenses
                </button>
              </div>

              {product.arStyle && (
                <button
                  onClick={() => setArProduct(product)}
                  className="btn-outline py-3 px-6 text-sm text-[var(--accent-gold)] border-[#d4af37]/40 hover:bg-[#d4af37]/10 flex items-center justify-center gap-2 rounded-2xl font-semibold"
                >
                  <Camera className="w-4 h-4" /> Launch Virtual Fitting Mirror
                </button>
              )}

              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-gold)] cursor-pointer flex items-center gap-1.5 justify-center py-2 bg-none border-none font-medium transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" /> View Millimeter Fit &amp; Size Guide
              </button>
            </div>

            {/* Value Props Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2 p-5 bg-[var(--bg-input)] rounded-2xl text-xs sm:text-sm text-[var(--text-secondary)] border border-[var(--border-color)]">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[var(--accent-gold)] shrink-0" /> Free White-Glove Shipping
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" /> 30-Day Home Trial Guarantee
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0" /> Lifetime Atelier Frame Warranty
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 100% Prescription Accuracy
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Breakdown */}
        {product.specs && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-14 border border-[var(--border-color)] shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 font-serif">
              Optical Frame Engineering
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              <div className="p-5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold tracking-wider mb-1 uppercase">LENS WIDTH</span>
                <strong className="text-lg sm:text-xl text-[var(--accent-gold)] font-mono">{product.specs.lensWidth}</strong>
              </div>
              <div className="p-5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold tracking-wider mb-1 uppercase">BRIDGE WIDTH</span>
                <strong className="text-lg sm:text-xl text-[var(--accent-gold)] font-mono">{product.specs.bridgeWidth}</strong>
              </div>
              <div className="p-5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold tracking-wider mb-1 uppercase">TEMPLE LENGTH</span>
                <strong className="text-lg sm:text-xl text-[var(--accent-gold)] font-mono">{product.specs.templeLength}</strong>
              </div>
              <div className="p-5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold tracking-wider mb-1 uppercase">FRAME METALLURGY</span>
                <strong className="text-sm sm:text-base text-[var(--text-primary)]">{product.material}</strong>
              </div>
              <div className="p-5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)] col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold tracking-wider mb-1 uppercase">FRAME WEIGHT</span>
                <strong className="text-sm sm:text-base text-emerald-400 font-mono">{product.weight}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8 font-serif">
            Patron Reviews &amp; Optical Ratings ({reviewsList.length})
          </h3>

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="mb-10 p-6 sm:p-8 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)] shadow-sm">
            <h4 className="text-base font-bold text-[var(--text-primary)] mb-4 font-serif">
              Submit a Verified Patron Review
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Your Name</label>
                <input required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="input-field py-2.5 text-xs sm:text-sm" placeholder="e.g. Harris Malik" />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Rating</label>
                <select value={newRating} onChange={(e) => setNewRating(Number(e.target.value))} className="input-field py-2.5 text-xs sm:text-sm">
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Stars)</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Review Comments</label>
              <textarea required rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} className="input-field py-2.5 text-xs sm:text-sm" placeholder="Share your experience regarding frame fit, comfort, and optical lens clarity..." />
            </div>

            <button type="submit" className="btn-gold py-3 px-8 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <Send className="w-4 h-4" /> Submit Verified Review
            </button>
          </form>

          {/* Existing Reviews Feed */}
          <div className="flex flex-col gap-6">
            {reviewsList.map((rev) => (
              <div key={rev.id} className="pb-6 border-b border-[var(--border-color)] last:border-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">{rev.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{rev.date}</span>
                </div>
                <div className="flex text-amber-400 gap-1 mb-2.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
