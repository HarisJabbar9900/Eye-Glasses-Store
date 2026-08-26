import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Truck, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    totalAmount,
    clearCart,
    addToast
  } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@optic-lumen.com',
    phone: '+92 300 1234567',
    address: 'House 42, Block H, Gulberg III',
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderId = 'LUMEN-' + Math.floor(100000 + Math.random() * 900000);
    const receipt = {
      orderId,
      date: new Date().toLocaleDateString(),
      customer: formData,
      items: [...cartItems],
      total: totalAmount
    };

    setOrderReceipt(receipt);
    setStep(3);
    clearCart();
    addToast(`Order ${orderId} successfully placed!`, 'success');
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950/85 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-y-auto flex flex-col shadow-2xl bg-[var(--bg-primary)]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-[var(--text-primary)] font-serif line-clamp-1">
              {step === 3 ? 'Order Receipt Confirmation' : '256-Bit Encrypted Secure Checkout'}
            </h3>
          </div>

          <button onClick={() => setIsCheckoutOpen(false)} className="btn-icon w-9 h-9 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Body: Grid on desktop lg (7 cols Form, 5 cols Summary) */}
        <div className="p-5 sm:p-8">
          {step !== 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Side (Col 7 on lg) */}
              <div className="lg:col-span-7">
                {step === 1 && (
                  <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2.5 font-serif">
                      <Truck className="w-5 h-5 text-cyan-400" /> Step 1: Shipping Address &amp; Recipient
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
                      <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Street Address</label>
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
                        <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">Postal ZIP Code</label>
                        <input required name="zip" value={formData.zip} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" />
                      </div>
                    </div>

                    <button type="submit" className="btn-gold w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-[#d4af37]/25">
                      Continue to Payment <ArrowRight className="w-4 h-4" />
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
                            <label className="text-xs text-[var(--text-muted)] block mb-1 font-medium">CVC Security Code</label>
                            <input required name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} className="input-field py-2.5 text-xs sm:text-sm" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3.5 pt-2">
                      <button type="button" onClick={() => setStep(1)} className="btn-outline w-full sm:w-auto py-2.5 px-5 text-xs rounded-xl font-medium">
                        &larr; Back to Address
                      </button>

                      <button type="submit" className="btn-gold w-full sm:w-auto py-3 px-8 text-xs sm:text-sm font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
                        Pay &amp; Complete Order
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

                <div className="max-h-64 overflow-y-auto flex flex-col gap-3 mb-5 pr-1">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs pb-3 border-b border-[var(--border-color)] last:border-none">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl shrink-0" />
                        <div>
                          <div className="font-bold text-[var(--text-primary)] line-clamp-1 font-serif text-sm">{item.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">Qty: {item.quantity} {item.color?.name ? `• ${item.color.name}` : ''}</div>
                        </div>
                      </div>
                      <span className="font-bold text-[var(--accent-gold)] shrink-0 font-serif text-sm">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Courier:</span>
                    <span className="text-cyan-400 font-bold">FREE Express</span>
                  </div>
                  <div className="flex justify-between font-bold text-base text-[var(--text-primary)] pt-3 border-t border-[var(--border-color)]">
                    <span>Total Amount:</span>
                    <span className="text-[var(--accent-gold)] font-serif text-lg">Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Step 3: Order Receipt */
            <div className="text-center py-6 sm:py-8 max-w-xl mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 text-cyan-400 inline-flex items-center justify-center mb-5">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 font-serif">
                Thank You For Your Order!
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-8">
                Your order ID is <strong className="text-[var(--accent-gold)] font-bold">{orderReceipt.orderId}</strong>. A confirmation receipt has been sent to {orderReceipt.customer.email}.
              </p>

              <div className="p-6 bg-[var(--bg-input)] rounded-2xl text-left mb-8 text-xs sm:text-sm border border-[var(--border-color)]">
                <div className="flex flex-col sm:flex-row justify-between mb-4 pb-3 border-b border-[var(--border-color)] gap-1 font-medium">
                  <span>Shipping To: <strong>{orderReceipt.customer.fullName}</strong></span>
                  <span className="text-[var(--text-muted)]">Date: {orderReceipt.date}</span>
                </div>

                <div className="font-bold text-[var(--accent-gold)] mb-3 uppercase tracking-wider text-xs">
                  Purchased Items Summary:
                </div>
                {orderReceipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between mb-2 text-[var(--text-secondary)] text-xs">
                    <span>{it.name} x{it.quantity} ({it.color?.name})</span>
                    <span>Rs. {(it.price * it.quantity).toLocaleString()}</span>
                  </div>
                ))}

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between font-bold text-base sm:text-lg text-[var(--text-primary)]">
                  <span>Total Amount Paid:</span>
                  <span className="text-[var(--accent-gold)] font-serif">Rs. {orderReceipt.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep(1);
                  }}
                  className="btn-gold py-3 px-8 text-sm font-bold rounded-2xl"
                >
                  Return to Home Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

