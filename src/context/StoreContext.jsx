import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext();

export const CURRENCIES = {
  PKR: { code: 'PKR', symbol: 'Rs. ', rate: 1, decimals: 0 },
  USD: { code: 'USD', symbol: '$', rate: 1 / 278, decimals: 2 },
  GBP: { code: 'GBP', symbol: '£', rate: 1 / 355, decimals: 2 },
  EUR: { code: 'EUR', symbol: '€', rate: 1 / 302, decimals: 2 }
};

export const StoreProvider = ({ children }) => {
  // Navigation State
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Currency State with LocalStorage
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_currency');
      return saved && CURRENCIES[saved] ? saved : 'PKR';
    } catch (_) {
      return 'PKR';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('lumen_currency', currency);
    } catch (_) {}
  }, [currency]);

  // Price Formatter Helper across the whole app
  const formatPrice = (pkrAmount) => {
    if (pkrAmount === null || pkrAmount === undefined) return '';
    const curr = CURRENCIES[currency] || CURRENCIES.PKR;
    const converted = pkrAmount * curr.rate;
    if (curr.decimals === 0) {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toFixed(curr.decimals)}`;
  };

  // Cart & Wishlist State with LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumen_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
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
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
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

    addToast(`Added "${product.name}" to your bag`, 'success');
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
    addToast('Item removed from shopping bag', 'info');
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
        addToast(`Saved "${product.name}" to wishlist`, 'success');
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
    if (trimmed === 'PORTFOLIO20') {
      setAppliedCoupon({ code: 'PORTFOLIO20', percent: 20 });
      addToast('Special Portfolio 20% discount applied!', 'success');
    } else if (trimmed === 'FIRST10') {
      setAppliedCoupon({ code: 'FIRST10', percent: 10 });
      addToast('Welcome 10% discount applied!', 'success');
    } else if (trimmed === 'LUXURY15') {
      setAppliedCoupon({ code: 'LUXURY15', percent: 15 });
      addToast('Atelier 15% VIP discount applied!', 'success');
    } else if (trimmed === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', percent: 5, freeShipping: true });
      addToast('Complimentary White-Glove Shipping applied!', 'success');
    } else {
      addToast('Invalid promo code. Try "PORTFOLIO20" or "FIRST10".', 'error');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setPromoCode('');
    addToast('Promo discount removed', 'info');
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

  const shippingCost = (appliedCoupon && appliedCoupon.freeShipping) || subtotal >= 5000 || subtotal === 0 ? 0 : 250;
  const totalAmount = subtotal - discountAmount + shippingCost;

  // Order Tracking State & Simulated Orders
  const [trackedOrder, setTrackedOrder] = useState({
    id: 'LMN-892144',
    customer: 'Harris J.',
    city: 'Lahore, PK',
    date: '17 September 2026',
    item: 'Apex Titanium Aviator (Gunmetal Gray)',
    prescription: 'Single Vision Progressive • Carl Zeiss AR',
    stage: 3, // 1: Order Confirmed, 2: Lens Surfacing, 3: Precision Glazing & QA, 4: Out for Courier
    carrier: 'TCS Express White-Glove',
    trackingNumber: 'TCS-90218841-PK',
    estimatedDelivery: 'Tomorrow by 4:00 PM'
  });

  const trackOrder = (orderId) => {
    const cleanId = orderId ? orderId.trim().toUpperCase() : 'LMN-892144';
    setTrackedOrder({
      id: cleanId,
      customer: 'Atelier Client',
      city: 'Boutique Dispatch',
      date: 'Recent Order',
      item: 'Bespoke Eyewear Frame',
      prescription: 'Anti-Reflective Hydrophobic Coated Lenses',
      stage: 3,
      carrier: 'DHL Express / TCS Courier',
      trackingNumber: `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: 'Within 2 business days'
    });
    setIsOrderTrackerOpen(true);
  };

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
    addToast('Filters reset to default catalog', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        navigateTo,
        selectedProductId,
        currency,
        setCurrency,
        formatPrice,
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
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        trackedOrder,
        setTrackedOrder,
        trackOrder,
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
