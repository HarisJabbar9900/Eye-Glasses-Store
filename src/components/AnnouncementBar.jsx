import React from 'react';
import { Sparkles, Sun, Moon, ShieldCheck, Tag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { applyPromo } = useStore();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-[#d4af37]/20 text-slate-100 py-2 px-4 sm:px-6 text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
          <span className="badge-gold px-2.5 py-0.5 text-[10px]">
            LIMITED OFFER
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm">
            <Tag size={14} className="text-[#d4af37] shrink-0" />
            <span>
              Free Express Courier over Rs. 5,000 | 20% OFF with code{' '}
              <strong 
                className="text-[#d4af37] cursor-pointer underline hover:text-amber-300 transition-colors font-bold tracking-wide"
                onClick={() => applyPromo('VISION20')}
                title="Click to apply promo VISION20"
              >
                VISION20
              </strong>
            </span>
          </span>
        </div>

        <div className="flex items-center justify-center gap-4">
          <span className="hidden md:flex items-center gap-1.5 text-slate-300 text-xs">
            <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
            30-Day Guarantee
          </span>

          <button
            onClick={toggleTheme}
            className="bg-white/10 hover:bg-white/20 text-slate-100 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={13} className="text-[#d4af37]" /> Light Mode
              </>
            ) : (
              <>
                <Moon size={13} className="text-purple-400" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

