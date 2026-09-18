import React from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    promoCode,
    setPromoCode,
    appliedCoupon,
    applyPromo,
    removeCoupon,
    setIsCheckoutOpen,
    formatPrice
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/80 backdrop-blur-md z-[1000] flex justify-end animate-fade-in">
      <div className="glass-panel animate-slide-right w-full sm:max-w-md h-full flex flex-col shadow-2xl bg-[var(--bg-primary)] border-l border-[var(--border-color)]">
        {/* Cart Drawer Header */}
        <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[var(--accent-gold)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">
              Shopping Bag ({cartItems.length})
            </h3>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="btn-icon w-9 h-9 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Complimentary Courier Progress */}
        <div className="py-3 px-5 bg-[var(--bg-input)] border-b border-[var(--border-color)]">
          <div className="text-xs text-[var(--text-secondary)] mb-2 flex justify-between items-center">
            <span>
              {remainingForFreeShipping === 0 ? (
                <strong className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Complimentary Express Shipping Qualified!
                </strong>
              ) : (
                <>Add <strong className="text-[var(--accent-gold)] font-mono">{formatPrice(remainingForFreeShipping)}</strong> more for free courier</>
              )}
            </span>
            <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#b89628] transition-all duration-500 rounded-full" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 px-4 text-[var(--text-muted)] flex flex-col items-center justify-center my-auto">
              <ShoppingBag className="w-14 h-14 opacity-25 mb-4 text-[var(--accent-gold)]" />
              <p className="text-lg font-bold text-[var(--text-primary)] mb-2 font-serif">Your bag is empty</p>
              <p className="text-xs sm:text-sm max-w-xs leading-relaxed text-[var(--text-secondary)]">
                Explore our Men's, Women's &amp; Screen Optics collections to select handcrafted frames.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.key}
                className="flex gap-3.5 p-3.5 bg-[var(--bg-input)] rounded-2xl border border-[var(--border-color)] shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-xl shrink-0 p-1 bg-black/40 border border-white/5"
                />

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1 font-serif">
                        {item.name}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-[var(--text-muted)] hover:text-rose-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-[var(--text-muted)] mt-0.5">
                      Finish: {item.color?.name || 'Standard'}
                    </div>

                    {item.prescription && (
                      <div className="mt-1.5 p-1.5 px-2 bg-[var(--accent-gold)]/10 rounded-lg text-xs text-[var(--accent-gold)] font-medium font-mono">
                        ✦ {item.prescription.lensType} (+{formatPrice(item.prescription.lensPrice)})
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-1 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-2 bg-[var(--bg-secondary)] px-2 py-0.5 rounded-lg border border-[var(--border-color)]">
                      <button onClick={() => updateQuantity(item.key, -1)} className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] p-0.5">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, 1)} className="text-[var(--text-primary)] hover:text-[var(--accent-gold)] p-0.5">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[var(--accent-gold)] font-mono">
                      {formatPrice((item.price + (item.prescription?.lensPrice || 0)) * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[var(--border-color)] bg-slate-900/90 sticky bottom-0">
            {/* Promo input */}
            <div className="mb-4">
              {appliedCoupon ? (
                <div className="flex justify-between items-center p-2.5 px-3.5 bg-[var(--accent-gold)]/15 rounded-xl border border-[#d4af37]/30">
                  <span className="text-xs text-[var(--accent-gold)] font-bold flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Code {appliedCoupon.code} (-{appliedCoupon.percent}%)
                  </span>
                  <button onClick={removeCoupon} className="text-xs text-[var(--text-muted)] hover:text-white font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. PORTFOLIO20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="input-field py-2 px-3 text-xs rounded-xl flex-1 uppercase"
                  />
                  <button
                    onClick={() => applyPromo(promoCode)}
                    className="btn-outline py-2 px-4 text-xs rounded-xl font-bold"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-2 text-xs sm:text-sm mb-5">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-mono text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promotional Discount</span>
                  <span className="font-mono">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'text-emerald-400 font-semibold font-mono' : 'font-mono'}>
                  {shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-bold text-[var(--text-primary)] pt-3 border-t border-[var(--border-color)]">
                <span>Total</span>
                <span className="text-[var(--accent-gold)] font-serif font-mono text-xl">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="btn-gold w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25"
            >
              Proceed to Checkout ({formatPrice(totalAmount)}) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
