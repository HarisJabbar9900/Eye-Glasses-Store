import React, { useState, useRef, useEffect } from 'react';
import {
  Glasses, Search, ShoppingBag, Heart, Camera, Menu, X,
  ChevronDown, Sparkles, Sun, Moon, Truck, Globe
} from 'lucide-react';
import { useStore, CURRENCIES } from '../context/StoreContext';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/products';

export const Navbar = () => {
  const {
    activePage,
    navigateTo,
    cartItems,
    wishlist,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    filteredProducts,
    setArProduct,
    currency,
    setCurrency,
    formatPrice,
    setIsOrderTrackerOpen
  } = useStore();

  const { theme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);

  const searchInputRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryMenuOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setIsCurrencyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    navigateTo('shop');
    setIsCategoryMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0 shrink"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b89628] flex items-center justify-center shadow-lg shadow-[#d4af37]/20 group-hover:scale-105 transition-transform shrink-0">
            <Glasses className="w-4 h-4 sm:w-6 sm:h-6 text-[#090d16]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-xl md:text-2xl font-bold tracking-widest leading-tight text-[var(--text-primary)] font-serif whitespace-nowrap">
              LUMEN <span className="text-[var(--accent-gold)]">&amp;</span> OPTIC
            </h1>
            <span className="text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[var(--text-muted)] block truncate font-sans">
              Haute Optometry • Est. 2026
            </span>
          </div>
        </div>

        {/* Desktop Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => navigateTo('home')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              activePage === 'home' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
            }`}
          >
            Home
          </button>

          {/* Categories Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${
                activePage === 'shop' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
              }`}
            >
              Collections <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180 text-[var(--accent-gold)]' : 'opacity-70'}`} />
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl p-2.5 z-50 shadow-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] animate-fade-in backdrop-blur-md">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-2.5 rounded-xl cursor-pointer flex items-center justify-between text-xs sm:text-sm text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[var(--accent-gold)] text-[10px]">✦</span>
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">&rarr;</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Virtual Fitting Mirror Trigger */}
          <button
            onClick={() => setArProduct(filteredProducts[0] || null)}
            className="bg-[#d4af37]/10 border border-[#d4af37]/30 text-[var(--accent-gold)] hover:bg-[#d4af37]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" /> Virtual Mirror
          </button>

          {/* Live Order Tracker Trigger */}
          <button
            onClick={() => setIsOrderTrackerOpen(true)}
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-gold)] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Track custom prescription order"
          >
            <Truck className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`text-sm font-medium transition-colors cursor-pointer ${
              activePage === 'about' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
            }`}
          >
            Atelier
          </button>
        </nav>

        {/* Right Actions Header */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Multi-Currency Dropdown Selector */}
          <div className="relative" ref={currencyDropdownRef}>
            <button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              className="btn-icon px-2.5 h-8 sm:h-9 flex items-center gap-1 text-xs font-semibold font-mono rounded-xl border border-[var(--border-color)]"
              title="Select Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isCurrencyMenuOpen && (
              <div className="glass-panel absolute right-0 top-full mt-2 w-32 rounded-xl p-1.5 z-50 shadow-2xl animate-fade-in border border-[var(--border-color)]">
                {Object.keys(CURRENCIES).map((currCode) => (
                  <button
                    key={currCode}
                    onClick={() => {
                      setCurrency(currCode);
                      setIsCurrencyMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      currency === currCode
                        ? 'bg-[var(--accent-gold)] text-slate-950 font-bold'
                        : 'text-[var(--text-primary)] hover:bg-white/10'
                    }`}
                  >
                    <span>{currCode}</span>
                    <span className="font-mono text-[11px] opacity-75">{CURRENCIES[currCode].symbol.trim()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#d4af37]" />
            ) : (
              <Moon className="w-4 h-4 text-purple-500" />
            )}
          </button>

          {/* Quick Search Button / Input */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="btn-icon w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl"
              title="Search store"
            >
              <Search className="w-4 h-4" />
            </button>

            {isSearchOpen && (
              <div className="glass-panel animate-fade-in absolute right-0 top-[120%] w-72 sm:w-80 rounded-2xl p-3 z-50 shadow-2xl border border-[var(--border-color)]">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search aviators, titanium, cat-eye..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pr-9 py-2 text-xs sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--accent-gold)] cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {searchQuery.trim() && (
                  <div className="mt-3 max-h-60 overflow-y-auto">
                    <p className="text-[10px] text-[var(--text-muted)] mb-2 font-semibold tracking-wider">
                      FOUND {filteredProducts.length} DESIGNS
                    </p>
                    {filteredProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateTo('product-detail', p.id);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-2.5 p-1.5 rounded-xl cursor-pointer mb-1 hover:bg-[var(--bg-card-hover)] transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[var(--text-primary)] truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[var(--accent-gold)] font-medium font-mono">
                            {formatPrice(p.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={() => navigateTo('shop')}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center relative rounded-xl"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-gold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 shadow-md shadow-[#d4af37]/20"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#090d16] text-[#d4af37] px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <div className="block lg:hidden shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border-amber-500/40 text-[var(--accent-gold)]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-[var(--text-primary)]" /> : <Menu className="w-4 h-4 text-[var(--accent-gold)]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="glass-panel animate-fade-in lg:hidden absolute top-full left-0 w-full p-5 flex flex-col gap-3.5 border-b border-[var(--border-color)] z-40 shadow-2xl">
          <button
            onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-sm font-medium transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-sm font-medium transition-colors"
          >
            All Eyewear Collections
          </button>
          <button
            onClick={() => { setSelectedCategory('gents'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-xs font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Men's Atelier
          </button>
          <button
            onClick={() => { setSelectedCategory('ladies'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-xs font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Women's Atelier
          </button>
          <button
            onClick={() => { setSelectedCategory('blue-light'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-xs font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Screen &amp; Blue Light Optics
          </button>
          <button
            onClick={() => { setArProduct(filteredProducts[0] || null); setIsMobileMenuOpen(false); }}
            className="text-left bg-[#d4af37]/15 border border-[#d4af37]/30 text-[var(--accent-gold)] p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Virtual Fitting Mirror
          </button>
          <button
            onClick={() => { setIsOrderTrackerOpen(true); setIsMobileMenuOpen(false); }}
            className="text-left bg-white/5 border border-white/10 text-[var(--text-primary)] p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Truck className="w-4 h-4 text-[var(--accent-gold)]" /> Track Prescription Order
          </button>
          <button
            onClick={() => { navigateTo('about'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-sm font-medium transition-colors"
          >
            About Atelier
          </button>
        </div>
      )}
    </header>
  );
};
