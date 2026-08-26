import React from 'react';
import { LayoutGrid, List, SearchX, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const {
    filteredProducts,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    resetFilters
  } = useStore();

  return (
    <div className="w-full">
      {/* Top Controls Header Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        {/* Active Filters Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
            Showing <strong className="text-[var(--accent-gold)] font-bold">{filteredProducts.length}</strong> items
          </span>

          {searchQuery && (
            <span className="badge-gold text-xs inline-flex items-center gap-1.5">
              Search: "{searchQuery}"
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
            </span>
          )}

          {selectedCategory !== 'all' && (
            <span className="badge-gold text-xs inline-flex items-center gap-1.5">
              Category: {selectedCategory}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('all')} />
            </span>
          )}

          {selectedGender !== 'All' && (
            <span className="badge-gold text-xs inline-flex items-center gap-1.5">
              Gender: {selectedGender}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => setSelectedGender('All')} />
            </span>
          )}
        </div>

        {/* Sorting Dropdown & View Mode Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-[var(--text-muted)] whitespace-nowrap font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field py-2 px-3 text-xs sm:text-sm w-auto rounded-xl"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`btn-icon w-9 h-9 ${
                viewMode === 'grid' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-icon w-9 h-9 ${
                viewMode === 'list' ? 'border-[var(--accent-gold)] text-[var(--accent-gold)]' : 'border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product List Render */}
      {filteredProducts.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel p-10 sm:p-16 text-center rounded-3xl shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] inline-flex items-center justify-center mb-5">
            <SearchX className="w-8 h-8" />
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 font-serif">
            No Eyewear Frames Found
          </h4>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mb-8 max-w-md mx-auto leading-relaxed">
            We couldn't find any frames matching your specific filter criteria. Try adjusting your gender, shape, or price filters.
          </p>
          <button onClick={resetFilters} className="btn-gold py-3 px-8 text-sm font-semibold">
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

