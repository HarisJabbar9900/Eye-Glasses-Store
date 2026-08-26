import React, { useState } from 'react';
import { Glasses, ShieldCheck, Truck, RefreshCw, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { navigateTo, setSelectedCategory, addToast } = useStore();
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
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">Free Global Express Shipping</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">On all eyewear orders over Rs. 5,000</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <RefreshCw className="w-9 h-9 text-cyan-400 shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">30-Day Money Back Guarantee</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Hassle-free 100% returns &amp; exchanges</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="w-9 h-9 text-[var(--accent-gold)] shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">100% Optical Accuracy</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Certified doctor prescription guarantee</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Lock className="w-9 h-9 text-rose-400 shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-[var(--text-primary)] leading-snug">256-Bit SSL Encrypted</h5>
              <span className="text-xs text-[var(--text-muted)] block mt-0.5">Bank-level payment data protection</span>
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
              Crafting luxury optical frames and high-precision prescription lenses using titanium and Italian Mazzucchelli acetate since 2012.
            </p>

            <span className="badge-gold text-[10px] inline-block">
              ✦ Official Certified Optical Retailer
            </span>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Shop Eyewear
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <li>
                <span onClick={() => { setSelectedCategory('gents'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Gents Specs</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('ladies'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Ladies Frames</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('kids'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Kids Specs</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('sunglasses'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">UV Sunglasses</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('blue-light'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Blue Light Blockers</span>
              </li>
              <li>
                <span onClick={() => { setSelectedCategory('contact-lenses'); navigateTo('shop'); }} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Contact Lenses</span>
              </li>
            </ul>
          </div>

          {/* Customer Guides (SEO Pages) */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Optical Guides
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <li>
                <span onClick={() => navigateTo('prescription-guide')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Prescription Guide</span>
              </li>
              <li>
                <span onClick={() => navigateTo('size-guide')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Frame Size Finder</span>
              </li>
              <li>
                <span onClick={() => navigateTo('faq')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Help &amp; FAQ</span>
              </li>
              <li>
                <span onClick={() => navigateTo('shipping')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Shipping &amp; Returns</span>
              </li>
              <li>
                <span onClick={() => navigateTo('about')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">About Our Story</span>
              </li>
              <li>
                <span onClick={() => navigateTo('contact')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Contact &amp; Support</span>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Legal &amp; Policy
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <li>
                <span onClick={() => navigateTo('legal')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span onClick={() => navigateTo('legal')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Terms of Service</span>
              </li>
              <li>
                <span onClick={() => navigateTo('legal')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Lens Warranty</span>
              </li>
              <li>
                <span onClick={() => navigateTo('legal')} className="hover:text-[var(--accent-gold)] cursor-pointer transition-colors">Cookie Settings</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="sm:col-span-2 md:col-span-1">
            <h5 className="text-sm font-bold text-[var(--text-primary)] mb-4 font-serif">
              Join Optical Privilege
            </h5>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
              Subscribe to receive exclusive access to new seasonal collections and 15% off your first frame.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field text-xs sm:text-sm py-2.5 px-3.5 flex-1"
              />
              <button type="submit" className="btn-gold py-2.5 px-4 text-xs shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} LUMEN &amp; OPTIC Eyewear Inc. All rights reserved. Designed for precision &amp; elegance.
          </div>

          <div className="flex gap-6">
            <span onClick={() => navigateTo('legal')} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Privacy</span>
            <span onClick={() => navigateTo('legal')} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Terms</span>
            <span onClick={() => navigateTo('faq')} className="hover:text-[var(--text-primary)] cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

