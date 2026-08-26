import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { SIZE_GUIDE_DATA } from '../data/products';
import { useStore } from '../context/StoreContext';

export const SizeGuide = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">FRAME FIT GUIDE</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            Find Your Exact Eyeglasses Frame Size
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Learn how frame width, bridge width, and temple length work together for all-day comfort.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 sm:mb-16 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] mb-4 flex items-center gap-2.5 font-serif">
            <CreditCard className="w-6 h-6 shrink-0" /> Standard Credit Card Measurement Method
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
            Standing 12 inches from a mirror, hold any standard credit card vertically against the bridge of your nose under one eye:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[var(--bg-input)] rounded-3xl border border-[var(--border-color)] shadow-sm">
              <span className="badge-gold text-xs block w-max mb-2">SIZE S</span>
              <strong className="text-[var(--accent-gold)] block text-base sm:text-lg mb-2 font-serif">Small Fit (S)</strong>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">Card edge extends beyond the outer corner of your eye.</p>
            </div>
            <div className="p-6 bg-[var(--bg-input)] rounded-3xl border-2 border-[#d4af37] shadow-md">
              <span className="badge-gold text-xs block w-max mb-2">MOST COMMON</span>
              <strong className="text-[var(--accent-gold)] block text-base sm:text-lg mb-2 font-serif">Medium Fit (M)</strong>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">Card edge touches the outer corner of your eye exactly (~80% fit).</p>
            </div>
            <div className="p-6 bg-[var(--bg-input)] rounded-3xl border border-[var(--border-color)] shadow-sm">
              <span className="badge-gold text-xs block w-max mb-2">SIZE L</span>
              <strong className="text-[var(--accent-gold)] block text-base sm:text-lg mb-2 font-serif">Large Fit (L)</strong>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">Card edge ends before reaching the outer corner of your eye.</p>
            </div>
          </div>
        </div>

        {/* Size Table */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 sm:mb-16 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 font-serif">
            Dimensions Reference Table
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--bg-input)] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  <th className="p-4 rounded-l-2xl">Size</th>
                  <th className="p-4">Frame Width</th>
                  <th className="p-4">Lens Width</th>
                  <th className="p-4 rounded-r-2xl">Face Type Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {SIZE_GUIDE_DATA.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-bold text-[var(--accent-gold)] font-serif text-base">{row.size}</td>
                    <td className="p-4 text-[var(--text-primary)] font-medium">{row.frameWidth}</td>
                    <td className="p-4 text-[var(--text-primary)] font-medium">{row.lensWidth}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigateTo('shop')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Find Your Size in Shop &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
