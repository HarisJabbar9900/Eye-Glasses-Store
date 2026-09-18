import React, { useState } from 'react';
import { Glasses, ShieldCheck, Truck, RefreshCw, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { navigateTo, setSelectedCategory, addToast, formatPrice, setIsOrderTrackerOpen } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      addToast('Thank you for subscribing! Check your email for a 15% welcome code.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="w-full relative z-10 block bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-12 mt-20 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[var(--border-color)] mb-14">
          <div className="flex items-center gap-4">
            <Truck className="w-9 h-9 text-[var(--accent-gold)] shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">Complimentary Courier</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5 font-mono">On orders above {formatPrice(5000)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RefreshCw className="w-9 h-9 text-emerald-400 shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">30-Day Home Trial Guarantee</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Complimentary returns &amp; exchanges</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="w-9 h-9 text-[var(--accent-gold)] shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">Lifetime Atelier Warranty</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Titanium &amp; acetate hinge protection</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Lock className="w-9 h-9 text-amber-400 shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">256-Bit SSL Encrypted</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Protected prescription data &amp; checkout</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b89628] flex items-center justify-center shrink-0 shadow-md">
                <Glasses className="w-5 h-5 text-slate-950" />
              </div>
              <h4 className="text-lg font-bold tracking-wider text-[var(--text-primary)] font-serif">
                LUMEN &amp; OPTIC
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              Premium handcrafted eyewear and high-precision prescription optics. Ultra-lightweight titanium and hand-polished acetate engineered for all-day comfort.
            </p>

            <div className="text-xs text-[var(--text-secondary)] space-y-1 mb-3">
              <p className="font-semibold text-white">Flagship Optical Studio:</p>
              <p className="text-[var(--text-muted)]">Block H, Gulberg III, Lahore, Pakistan</p>
              <p className="text-[var(--accent-gold)] font-mono">+92 (042) 3578-2910</p>
            </div>

            <span className="badge-gold text-[10px] inline-block">
              ✦ Certified Optical House &bull; Est. 2020
            </span>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Shop Collections
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <li>
                <span onClick={() => { setSelectedCategory('gents'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Men's Frames</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('ladies'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Women's Eyewear</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('sunglasses'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Polarized Sunglasses</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('blue-light'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Computer &amp; Blue Light</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('prescription'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Prescription Lenses</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('kids'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Kids &amp; Teens Frames</span>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <li>
                <span onClick={() => setIsOrderTrackerOpen(true)} className="text-[var(--accent-gold)] hover:underline cursor-pointer font-medium flex items-center gap-1">
                  ✦ Track Your Order
                </span>
              </li>
              <li>
                <span onClick={() => navigateTo('prescription-guide')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Prescription Guide</span>
              </li>
              <li>
                <span onClick={() => navigateTo('size-guide')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Frame Size Calculator</span>
              </li>
              <li>
                <span onClick={() => navigateTo('faq')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Frequently Asked Questions</span>
              </li>
              <li>
                <span onClick={() => navigateTo('shipping')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Delivery &amp; Exchange Policy</span>
              </li>
              <li>
                <span onClick={() => navigateTo('about')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">About Our Brand</span>
              </li>
            </ul>
          </div>

          {/* Payment & Delivery */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Payment &amp; Delivery
            </h5>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li className="text-[var(--text-primary)] font-medium">Cash on Delivery (COD)</li>
              <li>Nationwide Delivery (TCS / Leopard)</li>
              <li>Visa, Mastercard, Raast</li>
              <li>24 - 48 Hours Express Dispatch</li>
              <li>14-Day Free Exchange</li>
              <li>1-Year Frame Warranty</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="sm:col-span-2 md:col-span-1">
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Newsletter &amp; Offers
            </h5>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
              Subscribe for new arrival alerts, seasonal sales, and special promotional discounts.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-xs sm:text-sm py-2.5 px-3.5 flex-1"
              />
              <button type="submit" className="btn-gold py-2.5 px-4 text-xs shrink-0 rounded-xl">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} LUMEN &amp; OPTIC. All rights reserved • Developed by <span className="text-[var(--accent-gold)] font-medium">Haris Jabbar</span>
          </div>

          <div className="flex gap-6">
            <span onClick={() => navigateTo('legal')} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Privacy Policy</span>
            <span onClick={() => navigateTo('legal')} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Terms of Service</span>
            <span onClick={() => navigateTo('faq')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
