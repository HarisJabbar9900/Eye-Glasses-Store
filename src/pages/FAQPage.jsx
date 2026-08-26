import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const FAQPage = () => {
  const { navigateTo } = useStore();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="badge-gold text-xs">HELP CENTER &amp; SUPPORT</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-4 font-serif leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about custom prescription lenses, shipping, returns, and AR virtual try-on.
          </p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-4 mb-14 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-color)] transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-5 sm:p-6 bg-none border-none text-left flex items-center justify-between cursor-pointer text-base sm:text-lg font-bold transition-colors font-serif ${
                    isOpen ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
                  }`}
                >
                  <span className="flex items-center gap-3.5 pr-2">
                    <HelpCircle className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[var(--accent-gold)]' : 'text-[var(--text-muted)]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-14 sm:pl-16 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center bg-gradient-to-br from-[#d4af37]/10 via-slate-900/90 to-slate-950 border border-[var(--border-color)] max-w-4xl mx-auto shadow-xl">
          <MessageSquare className="w-12 h-12 text-[var(--accent-gold)] mx-auto mb-4" />
          <h4 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 font-serif">
            Still Have Questions For Our Licensed Optometrists?
          </h4>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 max-w-md mx-auto leading-relaxed">
            Our customer care specialists and master opticians are available 24/7.
          </p>
          <button onClick={() => navigateTo('contact')} className="btn-gold py-4 px-10 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-[#d4af37]/25">
            Contact Support Team &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
