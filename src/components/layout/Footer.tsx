import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the VELORA Gazette. You will receive private previews.');
    setEmail('');
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-sm border-t border-neutral-900 mt-20">
      {/* Newsletter VIP Banner */}
      <div className="border-b border-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif-luxury text-2xl text-white tracking-wide font-normal">
              Private Previews & Atelier Chronicles
            </h3>
            <p className="text-neutral-400 text-sm mt-1">
              Receive private invitations to archival capsules, seasonal lookbooks, and atelier journal releases.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 px-4 py-2.5 text-sm focus:outline-none focus:border-neutral-500 w-full sm:w-80 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-100 text-neutral-950 hover:bg-white text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Link Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <span className="font-serif-luxury text-2xl tracking-[0.25em] text-white font-medium uppercase">
              VELORA
            </span>
            <p className="mt-4 text-xs leading-relaxed text-neutral-400 max-w-sm">
              Contemporary architectural silhouettes crafted in northern Italy and Scotland with virgin wool, brushed cashmere, and supple full-grain calfskin. Designed for enduring presence.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs tracking-wider uppercase text-neutral-400">
              <span className="text-neutral-300">New York</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">Milan</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">Paris</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300">London</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-200 font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/category/women')} className="hover:text-white transition-colors">
                  Women's Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/men')} className="hover:text-white transition-colors">
                  Men's Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/accessories')} className="hover:text-white transition-colors">
                  Leather Goods & Bags
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/shoes')} className="hover:text-white transition-colors">
                  Italian Footwear
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/kids')} className="hover:text-white transition-colors">
                  Petite Organic
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/new-arrivals')} className="hover:text-white transition-colors text-amber-200">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/sale')} className="hover:text-white transition-colors text-rose-400">
                  Archival Privilege
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-200 font-semibold mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact & Atelier Visit
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping')} className="hover:text-white transition-colors">
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/returns')} className="hover:text-white transition-colors">
                  Complimentary Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/size-guide')} className="hover:text-white transition-colors">
                  Bespoke Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-white transition-colors">
                  Order Status & Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-200 font-semibold mb-4">
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  Our Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  Artisanal Provenance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">
                  Privacy & Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-amber-300 hover:text-amber-200 transition-colors font-medium">
                  Administrative Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} VELORA Atelier Inc. All rights reserved. Crafted for portfolio showcase.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-neutral-400 transition-colors">
              Privacy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-neutral-400 transition-colors">
              Terms
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-neutral-400 transition-colors">
              Concierge
            </button>
            <span>USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
