import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Calendar, Plus, Check, X } from 'lucide-react';

export const AdminPromotions: React.FC = () => {
  const { promotions, updatePromotion, showToast } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Seasonal Campaigns & Flash Sales
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Schedule temporal privilege events, limited archival releases, and seasonal looks.
          </p>
        </div>

        <button
          onClick={() => showToast('Campaign creator opened in demo mode.')}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase bg-neutral-900 text-amber-300 px-2 py-0.5 border border-neutral-800">
                  {promo.type.replace('_', ' ')}
                </span>
                <span
                  className={`text-[10px] uppercase font-mono px-2 py-0.5 ${
                    promo.isActive
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                      : 'text-neutral-500 bg-neutral-900'
                  }`}
                >
                  {promo.isActive ? 'Active Campaign' : 'Paused'}
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl text-white font-medium mt-3">
                {promo.title}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light">
                {promo.tagline}
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs font-mono text-neutral-400 border-t border-neutral-800/80 pt-4">
                <div>
                  Privilege Value: <strong className="text-rose-400">{promo.discountPercent}% OFF</strong>
                </div>
                <div>
                  Duration: {promo.startDate} → {promo.endDate}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={promo.isActive}
                  onChange={(e) => updatePromotion(promo.id, { isActive: e.target.checked })}
                  className="accent-amber-400"
                />
                <span>Broadcast to Storefront Banner</span>
              </label>

              <button
                onClick={() => showToast('Campaign configuration saved.')}
                className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs uppercase"
              >
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
