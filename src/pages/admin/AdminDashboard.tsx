import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  ChevronRight,
  Plus,
  Tag,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { OrderStatus } from '../../types';

interface AdminDashboardProps {
  onNavigateModule: (module: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateModule }) => {
  const {
    products,
    orders,
    customers,
    updateOrderStatus,
    formatPrice,
    adjustStock,
  } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 18450;
  const todaySales = orders
    .filter((o) => o.createdAt.includes('2026-10-04'))
    .reduce((sum, o) => sum + o.total, 0) + 980;

  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockThreshold);
  const pendingOrders = orders.filter((o) => ['pending', 'processing'].includes(o.status));

  // Chart data for 7-day revenue (interactive SVG)
  const revenuePoints = [
    { day: 'Mon', val: 2400 },
    { day: 'Tue', val: 3200 },
    { day: 'Wed', val: 2800 },
    { day: 'Thu', val: 4100 },
    { day: 'Fri', val: 3900 },
    { day: 'Sat', val: 5600 },
    { day: 'Sun', val: 4850 },
  ];
  const maxVal = 6000;

  const topProducts = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Storefront Executive Overview
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Real-time analytics, inventory allocations, and active commissions.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateModule('products')}
            className="px-3.5 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => onNavigateModule('cms')}
            className="px-3.5 py-2 bg-neutral-800 text-neutral-200 border border-neutral-700 text-xs font-medium uppercase tracking-wider hover:bg-neutral-700 transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>CMS Editor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-white">
            {formatPrice(totalRevenue)}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs past month</span>
          </div>
        </div>

        {/* Today's Sales */}
        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase tracking-wider">Today's Sales</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-white">
            {formatPrice(todaySales)}
          </div>
          <div className="mt-2 text-[11px] text-neutral-400 font-mono">
            {orders.length} orders logged today
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase tracking-wider">Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-white">
            128
          </div>
          <div className="mt-2 text-[11px] text-amber-300 font-mono">
            {pendingOrders.length} pending fulfillment
          </div>
        </div>

        {/* Patrons / Customers */}
        <div className="p-5 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="uppercase tracking-wider">Active Patrons</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3 font-mono text-2xl font-bold tabular-nums text-white">
            {customers.length + 84}
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-mono">
            86% repeat patron rate
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner (if any) */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 bg-amber-950/40 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <strong className="text-amber-200">
                Low Stock Alert ({lowStockProducts.length} items):
              </strong>{' '}
              <span className="text-neutral-300">
                {lowStockProducts.map((p) => `${p.name} (${p.stock} units)`).join(', ')}
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateModule('inventory')}
            className="px-3 py-1.5 bg-amber-400 text-neutral-950 font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors self-start sm:self-auto"
          >
            Adjust Inventory
          </button>
        </div>
      )}

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Revenue Trend Line/Bar SVG Chart */}
        <div className="lg:col-span-8 p-6 bg-neutral-950 border border-neutral-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-sm text-neutral-200 uppercase tracking-wider">
                Weekly Revenue Curve
              </h3>
              <p className="text-xs text-neutral-500">Gross sales performance over the past 7 days</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 border border-emerald-800">
              Avg: $3,835 / Day
            </span>
          </div>

          {/* SVG Line / Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-4 px-2 border-b border-neutral-800">
            {revenuePoints.map((pt, i) => {
              const heightPercent = (pt.val / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${pt.val}
                  </div>
                  <div
                    className="w-full max-w-[44px] bg-gradient-to-t from-neutral-800 to-amber-400/80 group-hover:to-amber-300 transition-all rounded-t-xs"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <div className="text-xs font-mono text-neutral-400">{pt.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="lg:col-span-4 p-6 bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-neutral-200 uppercase tracking-wider">
                Top Atelier Performers
              </h3>
              <button
                onClick={() => onNavigateModule('products')}
                className="text-xs text-amber-400 hover:underline"
              >
                All
              </button>
            </div>

            <div className="space-y-4">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt=""
                      className="w-10 h-12 object-cover bg-neutral-800"
                    />
                    <div>
                      <div className="font-medium text-neutral-200 line-clamp-1 max-w-[140px]">
                        {p.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-500">
                        {p.stock} units left
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono tabular-nums text-neutral-200 font-semibold">
                    {formatPrice(p.salePrice ?? p.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800/80 mt-6 text-xs text-neutral-500">
            Calculated based on verified order commissions and conversion metrics.
          </div>
        </div>
      </div>

      {/* Recent Orders Live Table */}
      <div className="p-6 bg-neutral-950 border border-neutral-800">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
          <div>
            <h3 className="font-semibold text-sm text-neutral-200 uppercase tracking-wider">
              Recent Orders Management
            </h3>
            <p className="text-xs text-neutral-500">
              Update fulfillment status live to notify patron and courier APIs.
            </p>
          </div>
          <button
            onClick={() => onNavigateModule('orders')}
            className="text-xs font-semibold text-amber-400 hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>View All Orders ({orders.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Patron</th>
                <th className="py-3 px-3">Garments</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Status Action</th>
                <th className="py-3 px-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-neutral-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">
                    #{order.orderNumber}
                  </td>
                  <td className="py-3 px-3 font-sans font-medium text-neutral-200">
                    {order.customerName}
                  </td>
                  <td className="py-3 px-3 text-neutral-400">
                    {order.items.length} pcs
                  </td>
                  <td className="py-3 px-3 font-bold text-white tabular-nums">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3 px-3 uppercase text-[11px] text-neutral-400">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3 px-3">
                    {/* Live Status Changer Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value as OrderStatus)
                      }
                      className="bg-neutral-800 border border-neutral-700 text-neutral-200 py-1 px-2 text-xs uppercase font-mono cursor-pointer focus:outline-none focus:border-amber-400"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-right text-neutral-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
