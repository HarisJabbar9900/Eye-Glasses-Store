import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, FRAME_SHAPES, FRAME_MATERIALS, COLOR_OPTIONS } from '../data/products';

export const FilterSidebar = ({ onClose }) => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedShape,
    setSelectedShape,
    selectedMaterial,
    setSelectedMaterial,
    selectedColor,
    setSelectedColor,
    priceMax,
    setPriceMax,
    resetFilters,
    filteredProducts,
    formatPrice
  } = useStore();

  return (
    <aside className="glass-panel p-6 rounded-3xl flex flex-col gap-6 w-full shadow-lg border border-[var(--border-color)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5 font-bold text-lg text-[var(--text-primary)] font-serif">
          <Filter className="w-4 h-4 text-[var(--accent-gold)]" /> Filter Catalog
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors flex items-center gap-1.5 cursor-pointer bg-none border-none font-medium"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Audience / Gender
        </h5>
        <div className="flex flex-wrap gap-2">
          {['All', 'Gents', 'Ladies', 'Kids', 'Unisex'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                selectedGender === g
                  ? 'border border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold'
                  : 'border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/40'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Category
        </h5>
        <div className="flex flex-col gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border-none transition-colors flex items-center justify-between cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--bg-card-hover)] text-[var(--accent-gold)] font-bold shadow-sm'
                  : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <span>{cat.name}</span>
              {selectedCategory === cat.id && <span className="text-xs text-[var(--accent-gold)] font-bold">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2.5 text-xs sm:text-sm">
          <span className="font-bold text-[var(--text-muted)] uppercase tracking-wider text-xs">Max Price</span>
          <span className="text-[var(--accent-gold)] font-mono font-bold text-sm">{formatPrice(priceMax)}</span>
        </div>
        <input
          type="range"
          min="3000"
          max="40000"
          step="1000"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-[var(--accent-gold)] cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1.5 font-mono">
          <span>{formatPrice(3000)}</span>
          <span>{formatPrice(40000)}</span>
        </div>
      </div>

      {/* Frame Shape */}
      <div>
        <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Frame Shape
        </h5>
        <div className="flex flex-wrap gap-2">
          {['All', ...FRAME_SHAPES].map((shape) => (
            <button
              key={shape}
              onClick={() => setSelectedShape(shape)}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer transition-all ${
                selectedShape === shape
                  ? 'border border-[#d4af37] bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold'
                  : 'border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:border-[#d4af37]/40'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Material */}
      <div>
        <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Material
        </h5>
        <div className="flex flex-col gap-1.5">
          {['All', ...FRAME_MATERIALS].map((mat) => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`text-left px-3 py-2 rounded-xl text-xs cursor-pointer border-none transition-colors ${
                selectedMaterial === mat
                  ? 'bg-[#d4af37]/20 text-[var(--accent-gold)] font-bold'
                  : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              {mat}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h5 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Color Finish
        </h5>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setSelectedColor('All')}
            className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-all ${
              selectedColor === 'All'
                ? 'bg-[var(--accent-gold)] text-slate-950 font-bold'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-gold)]'
            }`}
          >
            All
          </button>

          {COLOR_OPTIONS.map((col) => (
            <button
              key={col.name}
              onClick={() => setSelectedColor(col.name)}
              className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                selectedColor === col.name ? 'ring-2 ring-[var(--accent-gold)] ring-offset-2' : 'opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
        </div>
      </div>

      {/* Results Summary Box */}
      <div className="mt-2 p-3.5 bg-[var(--bg-input)] rounded-2xl text-xs text-[var(--text-muted)] text-center border border-[var(--border-color)]">
        Showing <strong className="text-[var(--accent-gold)] font-bold">{filteredProducts.length}</strong> matching frames
      </div>
    </aside>
  );
};
