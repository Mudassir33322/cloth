import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';
import { PortfolioToolbar } from './components/common/PortfolioToolbar';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { ShopPage } from './pages/customer/ShopPage';
import { CategoryPage } from './pages/customer/CategoryPage';
import { ProductDetailPage } from './pages/customer/ProductDetailPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderSuccessPage } from './pages/customer/OrderSuccessPage';
import { CustomerAccountPage } from './pages/customer/CustomerAccountPage';
import {
  AboutPage,
  ContactPage,
  FAQPage,
  ShippingPage,
  ReturnsPage,
  PolicyPage,
} from './pages/customer/StaticPages';

// Admin Portal Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminPromotions } from './pages/admin/AdminPromotions';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminCMS } from './pages/admin/AdminCMS';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminRoles } from './pages/admin/AdminRoles';

const MainRouter: React.FC = () => {
  const { currentPath, navigate } = useStore();
  const [adminModule, setAdminModule] = useState<string>('dashboard');

  // Synchronize admin route if path has e.g. /admin/products
  useEffect(() => {
    if (currentPath.startsWith('/admin')) {
      const parts = currentPath.split('/');
      if (parts[2]) {
        setAdminModule(parts[2]);
      } else {
        setAdminModule('dashboard');
      }
    }
  }, [currentPath]);

  // Route Dispatcher
  const renderContent = () => {
    // 1. ADMIN PORTAL ROUTE
    if (currentPath.startsWith('/admin')) {
      return (
        <AdminLayout
          activeModule={adminModule}
          setActiveModule={(mod) => {
            setAdminModule(mod);
            navigate(`/admin/${mod}`);
          }}
        >
          {adminModule === 'dashboard' && (
            <AdminDashboard onNavigateModule={(mod) => {
              setAdminModule(mod);
              navigate(`/admin/${mod}`);
            }} />
          )}
          {adminModule === 'products' && <AdminProducts />}
          {adminModule === 'categories' && <AdminCategories />}
          {adminModule === 'inventory' && <AdminInventory />}
          {adminModule === 'orders' && <AdminOrders />}
          {adminModule === 'customers' && <AdminCustomers />}
          {adminModule === 'coupons' && <AdminCoupons />}
          {adminModule === 'promotions' && <AdminPromotions />}
          {adminModule === 'reviews' && <AdminReviews />}
          {adminModule === 'cms' && <AdminCMS />}
          {adminModule === 'media' && <AdminMedia />}
          {adminModule === 'reports' && <AdminReports />}
          {adminModule === 'settings' && <AdminSettings />}
          {adminModule === 'roles' && <AdminRoles />}
          {adminModule === 'notifications' && (
            <div className="bg-neutral-950 p-6 border border-neutral-800 text-xs">
              <h2 className="font-serif-luxury text-xl text-white mb-2">Notification Center</h2>
              <p className="text-neutral-400">View real-time alerts for orders, stock drops, and customer reviews.</p>
            </div>
          )}
        </AdminLayout>
      );
    }

    // 2. CUSTOMER STOREFRONT ROUTES
    // Path normalization
    const cleanPath = currentPath.split('?')[0];

    if (cleanPath === '' || cleanPath === '/') {
      return <HomePage />;
    }

    if (cleanPath === '/shop') {
      return <ShopPage />;
    }

    if (cleanPath.startsWith('/category/')) {
      const slug = cleanPath.replace('/category/', '');
      return <CategoryPage slug={slug} />;
    }

    if (cleanPath.startsWith('/product/')) {
      const slug = cleanPath.replace('/product/', '');
      return <ProductDetailPage slug={slug} />;
    }

    if (cleanPath === '/cart') {
      return <CartPage />;
    }

    if (cleanPath === '/checkout') {
      return <CheckoutPage />;
    }

    if (cleanPath === '/order-success') {
      return <OrderSuccessPage />;
    }

    if (cleanPath === '/account' || cleanPath.startsWith('/account/')) {
      return <CustomerAccountPage />;
    }

    if (cleanPath === '/about') {
      return <AboutPage />;
    }

    if (cleanPath === '/contact') {
      return <ContactPage />;
    }

    if (cleanPath === '/faq') {
      return <FAQPage />;
    }

    if (cleanPath === '/shipping') {
      return <ShippingPage />;
    }

    if (cleanPath === '/returns') {
      return <ReturnsPage />;
    }

    if (cleanPath === '/privacy') {
      return <PolicyPage type="privacy" />;
    }

    if (cleanPath === '/terms') {
      return <PolicyPage type="terms" />;
    }

    // 404 Not Found Page (Section 51 requirement)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="font-mono text-sm tracking-widest text-neutral-400 uppercase">
          404 Error
        </span>
        <h1 className="mt-3 font-serif-luxury text-3xl sm:text-5xl text-neutral-900 font-normal">
          Looks like this page went out of style.
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-md">
          The garment or editorial chronicle you are attempting to view is unavailable or has transitioned to our archives.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-neutral-950 text-neutral-950 hover:bg-neutral-100 text-xs font-medium uppercase tracking-wider transition-colors"
          >
            Back Home
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-neutral-950 text-white hover:bg-neutral-800 text-xs font-medium uppercase tracking-wider transition-colors"
          >
            Shop Collection
          </button>
        </div>
      </div>
    );
  };

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Show Storefront Header & Footer only when on customer routes */}
      {!isAdmin && <Header />}

      <main className="flex-1">{renderContent()}</main>

      {!isAdmin && <Footer />}

      {/* Global Interactive Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <ToastContainer />

      {/* Floating Client Closing Showcase Toolbar */}
      <PortfolioToolbar />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
