import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  Shield,
  ShoppingBag,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Users
} from 'lucide-react';

export const PortfolioToolbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    resetToDefaults,
    currentAdmin,
    currentCustomer,
    switchAdminRole,
    setCurrentCustomer,
    showToast,
  } = useStore();

  const [minimized, setMinimized] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const isAdminView = currentPath.startsWith('/admin');

  return (
    <>
      {/* Floating Bar */}
      <aside aria-label="Portfolio Showcase Toolbar" className="fixed bottom-4 right-4 z-40">
        {minimized ? (
          <button
            onClick={() => setMinimized(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-neutral-950 text-white border border-neutral-700 shadow-2xl hover:bg-neutral-900 transition-all text-xs font-mono"
            title="Open Agency Portfolio Showcase Helper"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-sans font-medium uppercase tracking-wider text-[11px]">
              Client Demo Showcase
            </span>
          </button>
        ) : (
          <div className="bg-neutral-950/95 backdrop-blur-md text-white border border-neutral-700 shadow-2xl p-3 sm:p-4 max-w-sm w-full flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-serif-luxury text-sm font-semibold tracking-wider text-white uppercase">
                  Agency Demo Suite
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setGuideOpen(true)}
                  className="text-[11px] font-mono text-amber-300 hover:underline px-1.5 py-0.5"
                  title="View Client Closing Walkthrough"
                >
                  Tour Guide
                </button>
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1 text-neutral-400 hover:text-white"
                  aria-label="Minimize showcase helper"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Switch Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => navigate(isAdminView ? '/' : '/admin')}
                className={`py-2 px-2.5 uppercase font-medium tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                  isAdminView
                    ? 'bg-amber-400 text-neutral-950 font-bold hover:bg-amber-300'
                    : 'bg-white text-neutral-950 font-bold hover:bg-neutral-100'
                }`}
              >
                {isAdminView ? (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>View Storefront</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-3.5 h-3.5" />
                    <span>Open Admin Portal</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setGuideOpen(true)}
                className="py-2 px-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 uppercase font-medium tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Feature Tour</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1 border-t border-neutral-800/80">
              <span className="font-mono truncate">
                Role: {isAdminView ? currentAdmin?.role.replace('_', ' ') : 'Customer'}
              </span>
              <button
                onClick={resetToDefaults}
                className="text-neutral-400 hover:text-rose-400 flex items-center gap-1 transition-colors font-mono"
                title="Reset local storage and demo data to pristine state"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Client Pitch Tour Guide Modal */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setGuideOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-700 w-full max-w-2xl shadow-2xl p-6 sm:p-8 text-neutral-100">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold font-serif-luxury text-lg">
                    V
                  </div>
                  <div>
                    <h2 className="font-serif-luxury text-2xl font-normal text-white">
                      VELORA Commercial E-Commerce Presentation Guide
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Demonstration script for presenting to potential fashion & retail clients.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setGuideOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6 text-xs text-neutral-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-2">
                <div className="p-4 bg-neutral-900 border border-neutral-800">
                  <div className="font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>1. The Pitch Statement</span>
                  </div>
                  <p className="text-neutral-400">
                    "This is not a static concept template. VELORA is a complete commercial fashion e-commerce ecosystem integrating a luxury customer storefront with a real-time administrative business management suite."
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="uppercase tracking-widest font-semibold text-amber-300">
                    Recommended 5-Minute Client Demonstration Flow:
                  </h3>

                  <div className="space-y-3">
                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 1: Luxury Customer Experience</div>
                      <p className="text-neutral-400 mt-1">
                        Show the sticky navigation, announcement strip, editorial hero banner, and new arrivals. Open a category (e.g. <strong>Women</strong>) and show dynamic filtering by price, size, and color.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 2: Contiguous Purchase PDP</div>
                      <p className="text-neutral-400 mt-1">
                        Open the <strong>Tailored Linen-Blend Atelier Blazer</strong>. Show the image zoom gallery, color swatches, size picker, interactive Bespoke Size Guide modal, and verified customer reviews.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 3: Shopping Bag & Privilege Codes</div>
                      <p className="text-neutral-400 mt-1">
                        Click 'Add to Bag'. Show the slide-out drawer with free shipping progress bar. Apply promo code <code className="text-amber-300 font-mono">VELORA20</code> to demonstrate instantaneous 20% discount calculation.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 4: Multi-Step Checkout & Order Confirmation</div>
                      <p className="text-neutral-400 mt-1">
                        Proceed to checkout. Demonstrate shipping selector, Credit Card / COD options, and place the demo order. View the generated Order Receipt with printable formal invoice.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 5: Switch to Admin Portal</div>
                      <p className="text-neutral-400 mt-1">
                        Click <strong>'Admin Portal'</strong>. View real-time revenue analytics and order graphs. Open <strong>Orders</strong> to see the newly placed order live! Update status to 'Shipped' and add a courier tracking number.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                      <div className="font-semibold text-white">Step 6: Live Homepage CMS & Inventory</div>
                      <p className="text-neutral-400 mt-1">
                        Open <strong>CMS Editor</strong> to change the homepage headline live. Open <strong>Inventory</strong> to demonstrate low-stock alerts and manual restock adjustments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setGuideOpen(false)}
                  className="px-6 py-2.5 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300"
                >
                  Got It — Continue Showcase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
