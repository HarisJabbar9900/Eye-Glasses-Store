import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, Lock, ArrowRight, ShoppingBag, Printer, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    clearCart,
    addToast,
    formatPrice,
    appliedCoupon,
    applyPromo,
    removeCoupon,
    trackOrder
  } = useStore();

  const [step, setStep] = useState(1);
  const [couponInput, setCouponInput] = useState('');
  const [formData, setFormData] = useState({
    fullName: 'Harris Jabbar',
    email: 'client@atelier-optic.com',
    phone: '+92 300 8472910',
    address: 'Atelier Residence, Block H, Gulberg III',
    city: 'Lahore',
    state: 'Punjab',
    zip: '54000',
    country: 'Pakistan',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [orderReceipt, setOrderReceipt] = useState(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromo(couponInput.trim());
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = 'LMN-' + Math.floor(100000 + Math.random() * 900000);
    const receipt = {
      orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      customer: formData,
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: totalAmount
    };

    setOrderReceipt(receipt);
    setStep(3);
    clearCart();
    addToast(`Order ${orderId} successfully placed!`, 'success');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-y-auto flex flex-col shadow-2xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] font-serif line-clamp-1">
              {step === 3 ? 'Bespoke Order Confirmation' : '256-Bit SSL Encrypted Secure Checkout'}
            </h3>
          </div>

          <button onClick={() => setIsCheckoutOpen(false)} className="btn-icon w-9 h-9 shrink-0 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body */}
        <div className="p-5 sm:p-8">
          {step !== 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Side (Col 7 on lg) */}
              <div className="lg:col-span-7">
                {step === 1 && (
                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2.5 font-serif">
                      <Truck className="w-5 h-5 text-[var(--accent-gold)]" /> Step 1: Shipping Destination &amp; Client Info
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Full Name</label>
                        <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Street Address &amp; Suite</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">City</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">State / Province</label>
                        <input required name="state" value={formData.state} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Postal ZIP</label>
                        <input required name="zip" value={formData.zip} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                    </div>

                    <button type="submit" className="btn-gold w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25">
                      Continue to Payment Method <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handlePlaceOrder}>
                    <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2.5 font-serif">
                      <CreditCard className="w-5 h-5 text-[var(--accent-gold)]" /> Step 2: Select Payment Method
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                      {['card', 'cod', 'easypaisa'].map((pm) => (
                        <div
                          key={pm}
                          onClick={() => setFormData({ ...formData, paymentMethod: pm })}
                          className={`p-3.5 rounded-2xl border text-center cursor-pointer font-bold text-xs transition-all ${
                            formData.paymentMethod === pm
                              ? 'border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] shadow-md'
                              : 'border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/40'
                          }`}
                        >
                          {pm === 'card' && 'Credit/Debit Card'}
                          {pm === 'cod' && 'Cash on Delivery'}
                          {pm === 'easypaisa' && 'JazzCash / EasyPaisa'}
                        </div>
                      ))}
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="flex flex-col gap-3.5 mb-6">
                        <div>
                          <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Card Number</label>
                          <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Expiry Date</label>
                            <input required name="cardExp" value={formData.cardExp} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">CVC Code</label>
                            <input required name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3.5 pt-2">
                      <button type="button" onClick={() => setStep(1)} className="btn-outline w-full sm:w-auto py-2.5 px-5 text-xs rounded-xl font-medium">
                        &larr; Back to Shipping
                      </button>

                      <button type="submit" className="btn-gold w-full sm:w-auto py-3 px-8 text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
                        Authorize Payment &amp; Place Order ({formatPrice(totalAmount)})
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Order Summary Side (Col 5 on lg) */}
              <div className="lg:col-span-5 bg-[var(--bg-input)] p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
                <h4 className="text-xs font-bold text-[var(--accent-gold)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Order Summary ({cartItems.length} items)
                </h4>

                <div className="max-h-56 overflow-y-auto flex flex-col gap-3 mb-5 pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-[var(--border-color)] last:border-none">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl shrink-0 border border-white/10" />
                        <div>
                          <div className="font-bold text-[var(--text-primary)] line-clamp-1 font-serif text-sm">{item.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">Qty: {item.quantity} {item.color?.name ? `• ${item.color.name}` : ''}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[var(--accent-gold)] shrink-0 font-mono text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input & Badges */}
                <div className="mb-4 pt-3 border-t border-[var(--border-color)]">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                      <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" /> Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.percent}%)
                      </span>
                      <button type="button" onClick={removeCoupon} className="text-rose-400 hover:underline text-[11px]">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <form onSubmit={handleApplyCoupon} className="flex gap-1.5 mb-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. PORTFOLIO20)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="input-field py-1.5 px-3 text-xs flex-1 uppercase"
                        />
                        <button type="submit" className="btn-outline px-3 py-1.5 text-xs font-bold rounded-xl">
                          Apply
                        </button>
                      </form>
                      <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                        <span>Portfolio Test Codes:</span>
                        <button
                          type="button"
                          onClick={() => applyPromo('PORTFOLIO20')}
                          className="text-[var(--accent-gold)] hover:underline font-mono"
                        >
                          PORTFOLIO20
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => applyPromo('FIRST10')}
                          className="text-[var(--accent-gold)] hover:underline font-mono"
                        >
                          FIRST10
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono text-[var(--text-primary)]">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promotional Discount:</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White-Glove Courier:</span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      {shippingCost === 0 ? 'COMPLIMENTARY' : formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="flex justify-between font-bold text-base text-[var(--text-primary)] pt-3 border-t border-[var(--border-color)]">
                    <span>Total Amount:</span>
                    <span className="text-[var(--accent-gold)] font-serif text-lg font-mono">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 3: Order Receipt Confirmation */
            <div className="text-center py-6 sm:py-8 max-w-xl mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 text-emerald-400 inline-flex items-center justify-center mb-5 border border-emerald-500/30">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 font-serif">
                Bespoke Order Confirmed
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
                Your optical reference is <strong className="text-[var(--accent-gold)] font-mono text-sm">{orderReceipt.orderId}</strong>. A formal invoice has been dispatched to {orderReceipt.customer.email}.
              </p>

              {/* Printable Invoice View */}
              <div className="p-6 bg-[var(--bg-input)] rounded-2xl text-left mb-6 text-xs sm:text-sm border border-[var(--border-color)] shadow-sm">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--border-color)]">
                  <div>
                    <h5 className="font-serif font-bold text-base text-[var(--text-primary)]">LUMEN &amp; OPTIC ATELIER</h5>
                    <span className="text-[10px] text-[var(--text-muted)]">Official Optical Invoice</span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] font-mono">{orderReceipt.date}</span>
                </div>

                <div className="mb-3 text-xs">
                  <span className="text-[var(--text-muted)] block">Delivery Recipient:</span>
                  <strong className="text-[var(--text-primary)]">{orderReceipt.customer.fullName}</strong>
                  <div className="text-[var(--text-secondary)]">{orderReceipt.customer.address}, {orderReceipt.customer.city}</div>
                </div>

                <div className="font-bold text-[var(--accent-gold)] mb-2 uppercase tracking-wider text-[10px]">
                  Crafted Items:
                </div>
                {orderReceipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between mb-1.5 text-[var(--text-secondary)] text-xs">
                    <span>{it.name} x{it.quantity} ({it.color?.name || 'Default'})</span>
                    <span className="font-mono text-[var(--text-primary)]">{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between font-bold text-base text-[var(--text-primary)]">
                  <span>Total Settled:</span>
                  <span className="text-[var(--accent-gold)] font-serif font-mono text-lg">{formatPrice(orderReceipt.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    trackOrder(orderReceipt.orderId);
                  }}
                  className="btn-gold py-2.5 px-6 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Live Track This Order
                </button>

                <button
                  onClick={() => window.print()}
                  className="btn-outline py-2.5 px-5 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Invoice
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep(1);
                  }}
                  className="btn-outline py-2.5 px-5 text-xs rounded-xl"
                >
                  Back to Boutique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
