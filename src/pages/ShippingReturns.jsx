import React from 'react';
import { Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShippingReturns = () => {
  const { navigateTo } = useStore();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">DISPATCH &amp; GUARANTEE POLICY</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            Shipping &amp; Returns Policy
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Free express delivery on orders over Rs. 5,000 and 30 days risk-free home trial.
          </p>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-10 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] mb-6 flex items-center gap-3 font-serif">
            <Truck className="w-6 h-6 shrink-0" /> Delivery Speeds &amp; Shipping Rates
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--bg-input)] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  <th className="p-4 rounded-l-2xl">Order Type</th>
                  <th className="p-4">Delivery Speed</th>
                  <th className="p-4 rounded-r-2xl">Shipping Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                <tr>
                  <td className="p-4 font-bold text-[var(--text-primary)]">Standard Eyewear Frames</td>
                  <td className="p-4 text-[var(--text-secondary)]">2 - 3 Business Days</td>
                  <td className="p-4 text-cyan-400 font-bold">FREE over Rs. 5,000 (Rs. 250 below)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--text-primary)]">Custom Prescription Lenses</td>
                  <td className="p-4 text-[var(--text-secondary)]">3 - 5 Business Days (Lab Calibration)</td>
                  <td className="p-4 text-cyan-400 font-bold">FREE Express Courier</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[var(--text-primary)]">Urgent Same-Day Dispatch</td>
                  <td className="p-4 text-[var(--text-secondary)]">24 Hours Metro Delivery</td>
                  <td className="p-4 text-[var(--accent-gold)] font-bold">Rs. 450 Flat Rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-12 border border-[var(--border-color)] shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--accent-gold)] mb-3 flex items-center gap-3 font-serif">
            <RefreshCw className="w-6 h-6 shrink-0" /> 30-Day Money Back &amp; Lens Remake Guarantee
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            If you are not 100% satisfied with your frame fit or vision clarity, return your item within 30 days of receiving your order for a 100% full refund or free optical lens remake.
          </p>
        </div>

        <div className="text-center">
          <button onClick={() => navigateTo('shop')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Return to Store &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
