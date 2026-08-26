import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Cart & Wishlist State with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lumen_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('lumen_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [priceMax, setPriceMax] = useState(40000); // Max PKR price
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [arProduct, setArProduct] = useState(null);
  const [prescriptionProduct, setPrescriptionProduct] = useState(null);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper page navigation
  const navigateTo = (page, productId = null) => {
    setActivePage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product, color = null, prescriptionData = null) => {
    setCartItems((prev) => {
      const selectedColorObj = color || (product.colors && product.colors[0]) || { name: 'Default' };
      const itemKey = `${product.id}-${selectedColorObj.name}-${prescriptionData ? prescriptionData.lensType : 'standard'}`;

      const existingIndex = prev.findIndex((item) => item.key === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: selectedColorObj,
            prescription: prescriptionData,
            quantity: 1
          }
        ];
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const updateQuantity = (key, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast(`Added "${product.name}" to wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Coupon application
  const applyPromo = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'VISION20') {
      setAppliedCoupon({ code: 'VISION20', percent: 20 });
      addToast('Promo code VISION20 applied! 20% discount added.', 'success');
    } else if (trimmed === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', percent: 10 });
      addToast('Promo code FREESHIP applied!', 'success');
    } else {
      addToast('Invalid coupon code. Try "VISION20".', 'error');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setPromoCode('');
    addToast('Coupon removed', 'info');
  };

  // Computed Cart totals in PKR
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const prescriptionCost = item.prescription ? item.prescription.lensPrice || 0 : 0;
      return acc + (item.price + prescriptionCost) * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((subtotal * appliedCoupon.percent) / 100);
  }, [subtotal, appliedCoupon]);

  const shippingCost = subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const totalAmount = subtotal - discountAmount + shippingCost;

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesTag = p.tagline.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCat) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const primaryMatch = p.category === selectedCategory;
        const secondaryMatch = p.secondaryCategories && p.secondaryCategories.includes(selectedCategory);
        if (!primaryMatch && !secondaryMatch) return false;
      }

      // Gender filter
      if (selectedGender !== 'All') {
        if (selectedGender === 'Gents' && p.gender !== 'Gents' && p.gender !== 'Unisex') return false;
        if (selectedGender === 'Ladies' && p.gender !== 'Ladies' && p.gender !== 'Unisex') return false;
        if (selectedGender === 'Kids' && p.gender !== 'Kids') return false;
      }

      // Shape filter
      if (selectedShape !== 'All' && p.frameShape !== selectedShape) return false;

      // Material filter
      if (selectedMaterial !== 'All' && p.material !== selectedMaterial) return false;

      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = p.colors && p.colors.some((c) => c.name === selectedColor);
        if (!hasColor) return false;
      }

      // Price filter
      if (p.price > priceMax) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedGender, selectedShape, selectedMaterial, selectedColor, priceMax, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGender('All');
    setSelectedShape('All');
    setSelectedMaterial('All');
    setSelectedColor('All');
    setPriceMax(40000);
    setSortBy('featured');
    addToast('Filters reset to default', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        navigateTo,
        selectedProductId,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        searchQuery,
        setSearchQuery,
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
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        filteredProducts,
        resetFilters,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        arProduct,
        setArProduct,
        prescriptionProduct,
        setPrescriptionProduct,
        promoCode,
        setPromoCode,
        appliedCoupon,
        applyPromo,
        removeCoupon,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
