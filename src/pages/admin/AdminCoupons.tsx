import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types';
import { Plus, Tag, Trash2, Edit2, Check, X } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const {
    coupons,
    addCoupon,
    updateCoupon,
    deleteCoupon,
    formatPrice,
    showToast,
  } = useStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(20);
  const [minimumOrder, setMinimumOrder] = useState<number>(150);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(undefined);
  const [usageLimit, setUsageLimit] = useState<number>(500);
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [description, setDescription] = useState('');

  const openAdd = () => {
    setEditingCoupon(null);
    setCode('');
    setDiscountType('percentage');
    setDiscountValue(20);
    setMinimumOrder(150);
    setMaxDiscount(undefined);
    setUsageLimit(200);
    setStartDate('2026-10-01');
    setEndDate('2026-12-31');
    setDescription('Privilege promotional discount for atelier patrons.');
    setModalOpen(true);
  };

  const openEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setDiscountType(c.discountType);
    setDiscountValue(c.discountValue);
    setMinimumOrder(c.minimumOrder);
    setMaxDiscount(c.maxDiscount);
    setUsageLimit(c.usageLimit);
    setStartDate(c.startDate);
    setEndDate(c.endDate);
    setDescription(c.description);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      showToast('Please provide a coupon code.', 'error');
      return;
    }

    const payload = {
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minimumOrder: Number(minimumOrder),
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      startDate,
      endDate,
      usageLimit: Number(usageLimit),
      isActive: true,
      description,
    };

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, payload);
    } else {
      addCoupon(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Privilege Codes & Coupons
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configure percentage and fixed price incentives for seasonal campaigns.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Privilege Code</span>
        </button>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-3">Type & Value</th>
              <th className="py-3 px-3">Min Order</th>
              <th className="py-3 px-3">Redemption Limit</th>
              <th className="py-3 px-3">Valid Until</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-900/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-amber-300">
                  {c.code}
                </td>
                <td className="py-3.5 px-3">
                  {c.discountType === 'percentage'
                    ? `${c.discountValue}% OFF`
                    : `${formatPrice(c.discountValue)} OFF`}
                </td>
                <td className="py-3.5 px-3 tabular-nums">
                  {formatPrice(c.minimumOrder)}
                </td>
                <td className="py-3.5 px-3 tabular-nums text-neutral-400">
                  {c.usageCount} / {c.usageLimit}
                </td>
                <td className="py-3.5 px-3 text-neutral-400">
                  {c.endDate}
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-sans ${
                      c.isActive
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                        : 'text-neutral-500 bg-neutral-900'
                    }`}
                  >
                    {c.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-neutral-400">
                    <button
                      onClick={() => openEdit(c)}
                      className="p-1 hover:text-white"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1 hover:text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-lg shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-serif-luxury text-xl font-normal text-white">
                  {editingCoupon ? 'Edit Privilege Code' : 'Create Privilege Code'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Coupon Code (Uppercase) *
                  </label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. LUXURY25"
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono uppercase font-bold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Currency Amount ($)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Discount Value *
                    </label>
                    <input
                      type="number"
                      required
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Minimum Order Spend ($)
                    </label>
                    <input
                      type="number"
                      required
                      value={minimumOrder}
                      onChange={(e) => setMinimumOrder(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Max Redemptions
                    </label>
                    <input
                      type="number"
                      value={usageLimit}
                      onChange={(e) => setUsageLimit(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Internal Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-sans"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-neutral-700 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300"
                  >
                    Commit Coupon
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
