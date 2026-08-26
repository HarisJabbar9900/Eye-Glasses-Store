import React from 'react';
import { 
  User, UserCheck, Smile, Eye, Sun, Laptop, Disc, Package, ArrowUpRight 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';

const getCategoryIcon = (iconName) => {
  const iconProps = { className: "w-6 h-6 text-[var(--accent-gold)]" };
  switch (iconName) {
    case 'User': return <User {...iconProps} />;
    case 'UserCheck': return <UserCheck {...iconProps} />;
    case 'Smile': return <Smile {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    case 'Sun': return <Sun {...iconProps} />;
    case 'Laptop': return <Laptop {...iconProps} />;
    case 'Disc': return <Disc {...iconProps} />;
    case 'Package': return <Package {...iconProps} />;
    default: return <Eye {...iconProps} />;
  }
};

export const CategoryGrid = () => {
  const { setSelectedCategory, navigateTo } = useStore();

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    navigateTo('shop');
  };

  const showcaseCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <section className="w-full relative block py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 gap-4">
          <div>
            <span className="badge-gold text-xs inline-block mb-2.5">DISCOVER BY CATEGORY</span>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] font-serif leading-tight">
              Curated Eyewear Collections
            </h3>
          </div>
          <p className="text-[var(--text-secondary)] max-w-md text-sm sm:text-base leading-relaxed md:text-right">
            From precision prescription lenses to UV-shielding sunglasses and digital blue light blockers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {showcaseCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="glass-panel p-6 sm:p-8 rounded-3xl cursor-pointer hover:-translate-y-1.5 border border-[var(--border-color)] hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/5 border border-[#d4af37]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  {getCategoryIcon(cat.icon)}
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2.5 group-hover:text-[var(--accent-gold)] transition-colors font-serif">
                  {cat.name}
                </h4>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs sm:text-sm font-semibold text-[var(--accent-gold)] group-hover:translate-x-1 transition-transform">
                <span>Explore Collection</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

