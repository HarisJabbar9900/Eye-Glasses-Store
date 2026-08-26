import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';

export const Shop = () => {
  const { selectedCategory, filteredProducts } = useStore();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Banner Header */}
        <div className="mb-8 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-[var(--border-color)] shadow-xl">
          <span className="badge-gold text-xs">HAUTE OPTICS STORE</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mt-3 mb-3 font-serif">
            {currentCategoryObj.name}
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            {currentCategoryObj.description || 'Explore our complete collection of titanium, acetate, sunglasses, and blue light blocker frames.'}
          </p>
        </div>

        {/* Mobile Filter Toggle Button (< lg) */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="btn-gold py-2.5 px-5 text-xs font-semibold flex items-center gap-2 rounded-xl shadow-md"
          >
            <Filter className="w-4 h-4" /> Filter Catalog ({filteredProducts.length})
          </button>
        </div>

        {/* Mobile Filter Slide-over Drawer Overlay (< lg) */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-md flex justify-start lg:hidden animate-fade-in">
            <div className="w-full max-w-xs sm:max-w-sm h-full bg-[var(--bg-primary)] p-4 overflow-y-auto animate-slide-right shadow-2xl">
              <FilterSidebar onClose={() => setIsMobileFilterOpen(false)} />
            </div>
          </div>
        )}

        {/* Catalog Layout Grid (Desktop 300px sidebar + flex product grid) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-28">
            <FilterSidebar />
          </div>
          <div className="flex-1 w-full min-w-0">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

