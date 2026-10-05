import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Settings, Save, Check } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, showToast } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [email, setEmail] = useState(settings.email);
  const [phone, setPhone] = useState(settings.phone);
  const [address, setAddress] = useState(settings.address);
  const [currency, setCurrency] = useState(settings.currency);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [taxRate, setTaxRate] = useState(settings.taxRate * 100);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [standardShippingRate, setStandardShippingRate] = useState(settings.standardShippingRate);
  const [expressShippingRate, setExpressShippingRate] = useState(settings.expressShippingRate);
  const [enableCod, setEnableCod] = useState(settings.enableCod);
  const [enableCard, setEnableCard] = useState(settings.enableCard);
  const [enableBankTransfer, setEnableBankTransfer] = useState(settings.enableBankTransfer);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      email,
      phone,
      address,
      currency,
      currencySymbol,
      taxRate: Number(taxRate) / 100,
      freeShippingThreshold: Number(freeShippingThreshold),
      standardShippingRate: Number(standardShippingRate),
      expressShippingRate: Number(expressShippingRate),
      enableCod,
      enableCard,
      enableBankTransfer,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Storefront Settings & Configuration
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configure taxation, global shipping rules, payment gateways, and contact metadata.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Store Profile */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
            Maison Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-serif-luxury text-base"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Concierge Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Concierge Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Flagship Atelier Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Currency & Tax */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
            Currency & Taxation Rules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Currency ISO Code
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono uppercase"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Sales Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Shipping Rates */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
            Fulfillment Rates & White-Glove Thresholds
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Complimentary Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Standard Shipping Fee ($)
              </label>
              <input
                type="number"
                value={standardShippingRate}
                onChange={(e) => setStandardShippingRate(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Priority Express Fee ($)
              </label>
              <input
                type="number"
                value={expressShippingRate}
                onChange={(e) => setExpressShippingRate(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white border-b border-neutral-800 pb-3">
            Active Payment Gateways
          </h3>
          <div className="space-y-3 text-neutral-300">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableCard}
                onChange={(e) => setEnableCard(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Credit & Debit Card Online Settlement (Level-1 PCI DSS)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableCod}
                onChange={(e) => setEnableCod(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Cash on Delivery (COD) for Designated Domestic Territories</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableBankTransfer}
                onChange={(e) => setEnableBankTransfer(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Direct Atelier Bank Wire Transfer (SWIFT / IBAN)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
