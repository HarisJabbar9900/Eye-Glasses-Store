import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ARTryOnModal } from './components/ARTryOnModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { AboutUs } from './pages/AboutUs';
import { PrescriptionGuide } from './pages/PrescriptionGuide';
import { SizeGuide } from './pages/SizeGuide';
import { FAQPage } from './pages/FAQPage';
import { ContactUs } from './pages/ContactUs';
import { ShippingReturns } from './pages/ShippingReturns';
import { LegalPage } from './pages/LegalPage';

const AppContent = () => {
  const { activePage } = useStore();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product-detail':
        return <ProductDetail />;
      case 'about':
        return <AboutUs />;
      case 'prescription-guide':
        return <PrescriptionGuide />;
      case 'size-guide':
        return <SizeGuide />;
      case 'faq':
        return <FAQPage />;
      case 'contact':
        return <ContactUs />;
      case 'shipping':
        return <ShippingReturns />;
      case 'legal':
        return <LegalPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-[var(--bg-primary)] overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full relative z-0">
        {renderPage()}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <ARTryOnModal />
      <PrescriptionModal />
      <QuickViewModal />
      <SizeGuideModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ThemeProvider>
  );
}
