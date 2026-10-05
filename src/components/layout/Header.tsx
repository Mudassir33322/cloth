import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Heart, ShoppingBag, User, Menu, X, Shield, ArrowRight } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPath,
    navigate,
    cartCount,
    wishlist,
    setIsSearchModalOpen,
    setIsCartDrawerOpen,
    cms,
    currentCustomer,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Women', path: '/category/women' },
    { label: 'Men', path: '/category/men' },
    { label: 'Accessories', path: '/category/accessories' },
    { label: 'New Arrivals', path: '/category/new-arrivals' },
    { label: 'Archive Sale', path: '/category/sale' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar (CMS Controlled) */}
      {cms.announcement.isEnabled && !announcementDismissed && (
        <div className="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800 transition-all duration-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 text-center font-normal tracking-wide flex items-center justify-center gap-2">
              <span>{cms.announcement.text}</span>
              {cms.announcement.linkText && (
                <button
                  onClick={() => handleNav(cms.announcement.linkUrl)}
                  className="text-white underline underline-offset-4 hover:text-amber-200 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  {cms.announcement.linkText}
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="text-neutral-400 hover:text-white ml-2 text-xs"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#faf9f6]/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3.5'
            : 'bg-[#faf9f6] border-b border-neutral-200/60 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-neutral-800 hover:text-neutral-950 transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Zone 1: Single text wordmark brand */}
            <div className="flex items-center">
              <button
                onClick={() => handleNav('/')}
                className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.2em] font-medium text-neutral-950 hover:opacity-85 transition-opacity uppercase"
              >
                VELORA
              </button>
            </div>

            {/* Zone 2: Primary navigation links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                const isSale = link.label.includes('Sale');
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`text-sm tracking-wider uppercase transition-colors relative py-1 ${
                      isActive
                        ? 'text-neutral-950 font-semibold'
                        : isSale
                        ? 'text-rose-700 hover:text-rose-900 font-medium'
                        : 'text-neutral-600 hover:text-neutral-950 font-normal'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-950" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Interactive Affordances & Actions */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors"
                aria-label="Search collection"
                title="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNav('/account')}
                className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors relative"
                aria-label="View curated wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-neutral-900 text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-1.5 text-neutral-700 hover:text-neutral-950 transition-colors relative"
                aria-label="View shopping bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-neutral-950 text-white text-[10px] font-semibold flex items-center justify-center rounded-full animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Customer Account */}
              <button
                onClick={() => handleNav('/account')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-700 hover:text-neutral-950 transition-colors py-1 px-2"
                title="Customer Account"
              >
                <User className="w-4 h-4" />
                <span className="font-medium truncate max-w-[85px]">
                  {currentCustomer ? currentCustomer.firstName : 'Account'}
                </span>
              </button>

              {/* Quick Admin Portal Demo Entry Link */}
              <button
                onClick={() => handleNav('/admin')}
                className="hidden md:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors tracking-wide"
                title="Open Administration Management Portal"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#faf9f6] shadow-2xl z-50 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <span className="font-serif-luxury text-xl tracking-[0.2em] font-medium uppercase">
                  VELORA
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-neutral-500 hover:text-neutral-900"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className="text-left text-base tracking-wider uppercase py-2 font-medium text-neutral-800 hover:text-neutral-950 hover:translate-x-1 transition-all"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
                  <button
                    onClick={() => handleNav('/about')}
                    className="text-left text-sm text-neutral-600 hover:text-neutral-950"
                  >
                    Our Heritage & Philosophy
                  </button>
                  <button
                    onClick={() => handleNav('/contact')}
                    className="text-left text-sm text-neutral-600 hover:text-neutral-950"
                  >
                    Client Concierge & Contact
                  </button>
                  <button
                    onClick={() => handleNav('/faq')}
                    className="text-left text-sm text-neutral-600 hover:text-neutral-950"
                  >
                    Frequently Asked Questions
                  </button>
                  <button
                    onClick={() => handleNav('/shipping')}
                    className="text-left text-sm text-neutral-600 hover:text-neutral-950"
                  >
                    Shipping & Delivery
                  </button>
                  <button
                    onClick={() => handleNav('/returns')}
                    className="text-left text-sm text-neutral-600 hover:text-neutral-950"
                  >
                    Complimentary Returns
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex flex-col gap-3">
              <button
                onClick={() => handleNav('/account')}
                className="w-full py-2.5 px-4 text-center border border-neutral-900 text-neutral-900 font-medium text-xs tracking-wider uppercase hover:bg-neutral-100 transition-colors"
              >
                Customer Account
              </button>
              <button
                onClick={() => handleNav('/admin')}
                className="w-full py-2.5 px-4 text-center bg-neutral-900 text-white font-medium text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                Switch to Admin Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
