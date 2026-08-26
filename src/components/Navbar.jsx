import React, { useState, useRef, useEffect } from 'react';
import {
  Glasses, Search, ShoppingBag, Heart, Camera, Menu, X,
  ChevronDown, Sparkles, Sun, Moon
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
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
    setArProduct
  } = useStore();

  const { theme, toggleTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const categoryDropdownRef = useRef(null);

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
            <span className="text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[var(--text-muted)] block truncate">
              Haute Optometry
            </span>
          </div>
        </div>

        {/* Desktop Clean Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => navigateTo('home')}
            className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'home' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
              }`}
          >
            Home
          </button>

          {/* Categories Dropdown */}
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className={`text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer py-2 ${activePage === 'shop' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
                }`}
            >
              Categories <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180 text-[var(--accent-gold)]' : 'opacity-70'}`} />
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl p-2.5 z-50 shadow-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] animate-fade-in backdrop-blur-md">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-3 rounded-xl cursor-pointer flex items-center justify-between text-sm text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[var(--accent-gold)] text-xs">✦</span>
                      {cat.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">&rarr;</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AR Fitting Trigger Button */}
          <button
            onClick={() => setArProduct(filteredProducts[0] || null)}
            className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" /> Virtual AR Mirror
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`text-sm font-medium transition-colors cursor-pointer ${activePage === 'about' ? 'text-[var(--accent-gold)] font-semibold' : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
              }`}
          >
            About Us
          </button>
        </nav>

        {/* Right Actions Header (Theme Switcher, Search, Wishlist, Cart, Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-icon w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            )}
          </button>

          {/* Quick Search Button / Input */}
          <div className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="btn-icon w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
              title="Search store"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {isSearchOpen && (
              <div className="glass-panel animate-fade-in absolute right-0 top-[120%] w-72 sm:w-80 rounded-xl p-3 z-50 shadow-2xl">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search aviators, cat-eye, blue light..."
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
                      FOUND {filteredProducts.length} RESULTS
                    </p>
                    {filteredProducts.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          navigateTo('product-detail', p.id);
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-2.5 p-1.5 rounded-lg cursor-pointer mb-1 hover:bg-[var(--bg-card-hover)] transition-colors"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <div className="text-xs font-semibold text-[var(--text-primary)] line-clamp-1">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-[var(--accent-gold)] font-medium">
                            Rs. {p.price.toLocaleString()}
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
            className="btn-icon w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center relative"
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-gold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 h-8 sm:h-10"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#090d16] text-[#d4af37] px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Menu Button (3 parallel lines icon / Hamburger menu) */}
          <div className="block lg:hidden shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-amber-500/40 text-[var(--accent-gold)]"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-primary)]" /> : <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[var(--accent-gold)]" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="glass-panel animate-fade-in lg:hidden absolute top-full left-0 w-full p-5 flex flex-col gap-4 border-b border-[var(--border-color)] z-40 shadow-2xl">
          <button
            onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium transition-colors"
          >
            All Eyewear Store
          </button>
          <button
            onClick={() => { setSelectedCategory('gents'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Gents Collection
          </button>
          <button
            onClick={() => { setSelectedCategory('ladies'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Ladies Collection
          </button>
          <button
            onClick={() => { setSelectedCategory('kids'); navigateTo('shop'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium pl-3 border-l-2 border-[var(--accent-gold)]"
          >
            Kids Collection
          </button>
          <button
            onClick={() => { setArProduct(filteredProducts[0] || null); setIsMobileMenuOpen(false); }}
            className="text-left bg-cyan-500/10 border border-cyan-500/30 text-[var(--accent-cyan)] p-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Virtual AR Fitting Mirror
          </button>
          <button
            onClick={() => { navigateTo('about'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => { navigateTo('contact'); setIsMobileMenuOpen(false); }}
            className="text-left bg-none border-none text-[var(--text-primary)] hover:text-[var(--accent-gold)] text-base font-medium transition-colors"
          >
            Contact &amp; Support
          </button>
        </div>
      )}
    </header>
  );
};
