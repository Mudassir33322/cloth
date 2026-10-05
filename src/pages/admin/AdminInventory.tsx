import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Archive,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RotateCcw,
  Check,
  X,
  History
} from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const {
    products,
    adjustStock,
    inventoryMovements,
    formatPrice,
    showToast,
  } = useStore();

  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [qtyChange, setQtyChange] = useState<number>(5);
  const [reason, setReason] = useState('Stock-in from Biella mill batch');

  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const lowStockItems = products.filter((p) => p.stock <= p.lowStockThreshold && p.stock > 0);
  const outOfStockItems = products.filter((p) => p.stock === 0);

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;

    adjustStock(selectedProductId, Number(qtyChange), reason);
    setAdjustModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Inventory & Atelier Stock Logistics
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Audit raw stock levels, log inventory intake, and prevent garment depletion.
          </p>
        </div>

        <button
          onClick={() => setAdjustModalOpen(true)}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Stock Adjustment</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">
            Total In Stock
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-white tabular-nums">
            {totalStockUnits} <span className="text-xs font-sans font-normal text-neutral-400">units</span>
          </div>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">
            Catalog Valuation
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-emerald-400 tabular-nums">
            {formatPrice(totalValuation)}
          </div>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">
            Low Stock Alerts
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-amber-400 tabular-nums">
            {lowStockItems.length} <span className="text-xs font-sans font-normal text-neutral-400">garments</span>
          </div>
        </div>

        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="text-xs text-neutral-400 uppercase tracking-wider">
            Depleted / Out
          </div>
          <div className="mt-2 font-mono text-2xl font-bold text-rose-400 tabular-nums">
            {outOfStockItems.length} <span className="text-xs font-sans font-normal text-neutral-400">garments</span>
          </div>
        </div>
      </div>

      {/* Low Stock Active Warning */}
      {lowStockItems.length > 0 && (
        <div className="p-5 bg-neutral-950 border border-amber-800/80">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs uppercase tracking-wider mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Garments Requiring Restock Allocation ({lowStockItems.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {lowStockItems.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-medium text-white line-clamp-1">{p.name}</div>
                  <span className="font-mono text-[11px] text-amber-400">
                    Remaining: {p.stock} (Threshold: {p.lowStockThreshold})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProductId(p.id);
                    setQtyChange(10);
                    setReason('Low stock alert replenishment');
                    setAdjustModalOpen(true);
                  }}
                  className="px-2.5 py-1 bg-amber-400 text-neutral-950 font-bold uppercase text-[10px] hover:bg-amber-300"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Overview Table */}
      <div className="bg-neutral-950 border border-neutral-800">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="font-semibold text-xs text-neutral-200 uppercase tracking-wider">
            Current Garment Stock Levels
          </h3>
          <span className="text-xs text-neutral-500 font-mono">
            {products.length} catalog items
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Unit Retail</th>
                <th className="py-3 px-3">Stock Count</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-900/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-8 h-10 object-cover bg-neutral-800 shrink-0"
                      />
                      <span className="font-sans font-medium text-white line-clamp-1 max-w-[200px]">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-neutral-400">{p.sku}</td>
                  <td className="py-3 px-3 uppercase text-[11px] text-neutral-300">
                    {p.category}
                  </td>
                  <td className="py-3 px-3 tabular-nums font-semibold text-white">
                    {formatPrice(p.price)}
                  </td>
                  <td className="py-3 px-3 tabular-nums font-bold text-white">
                    {p.stock}
                  </td>
                  <td className="py-3 px-3">
                    {p.stock === 0 ? (
                      <span className="text-[10px] text-rose-400 font-sans">Out of Stock</span>
                    ) : p.stock <= p.lowStockThreshold ? (
                      <span className="text-[10px] text-amber-400 font-sans">Low Allocation</span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-sans">Optimal</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setQtyChange(10);
                        setReason('Stock increase');
                        setAdjustModalOpen(true);
                      }}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs uppercase font-sans font-medium transition-colors"
                    >
                      + Adjust
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventory Movements Log */}
      <div className="bg-neutral-950 border border-neutral-800">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-200">
            <History className="w-4 h-4 text-neutral-400" />
            <span>Inventory Movement & Audit Ledger</span>
          </div>
        </div>

        <div className="divide-y divide-neutral-800 font-mono text-xs">
          {inventoryMovements.map((move) => (
            <div key={move.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${
                      move.quantityChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {move.quantityChange >= 0 ? `+${move.quantityChange}` : move.quantityChange} units
                  </span>
                  <span className="text-white font-sans font-medium">{move.productName}</span>
                  <span className="text-neutral-500 font-mono">({move.sku})</span>
                </div>
                <div className="text-[11px] text-neutral-400 font-sans mt-0.5">
                  Reason: {move.reason} · Recorded by: {move.operator}
                </div>
              </div>

              <div className="text-right text-[11px] text-neutral-500">
                {new Date(move.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjust Modal */}
      {adjustModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setAdjustModalOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-serif-luxury text-xl font-normal text-white">
                  Manual Stock Adjustment
                </h3>
                <button
                  onClick={() => setAdjustModalOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAdjustSubmit} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Select Garment *
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-sans"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.stock} units currently)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Quantity Adjustment (+ or -) *
                  </label>
                  <input
                    type="number"
                    required
                    value={qtyChange}
                    onChange={(e) => setQtyChange(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono text-base"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">
                    Use positive numbers for restocks (+10), negative for shrinkage/defects (-2).
                  </span>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Adjustment Reason *
                  </label>
                  <input
                    type="text"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Factory restock, damaged during transit..."
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustModalOpen(false)}
                    className="px-4 py-2 border border-neutral-700 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300"
                  >
                    Commit Adjustment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
