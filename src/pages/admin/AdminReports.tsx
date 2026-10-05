import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BarChart3, Download, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, products, customers, formatPrice, showToast } = useStore();
  const [dateRange, setDateRange] = useState('30d');

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Order ID,Date,Customer,Total,Status,Payment\n' +
      orders
        .map(
          (o) =>
            `${o.orderNumber},${o.createdAt},"${o.customerName}",${o.total},${o.status},${o.paymentMethod}`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `velora_sales_report_${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sales report CSV generated and downloaded.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Business Intelligence & Reports
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Analyze gross margins, average order value, customer acquisition, and inventory turns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs py-2 px-3 font-mono cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="ytd">Year to Date (2026)</option>
          </select>

          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-neutral-950 border border-neutral-800">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Average Commission (AOV)</span>
          <div className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">
            $468.20
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.6% over previous period</span>
          </div>
        </div>

        <div className="p-6 bg-neutral-950 border border-neutral-800">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Gross Merchandise Margin</span>
          <div className="mt-2 font-mono text-3xl font-bold text-emerald-400 tabular-nums">
            64.8%
          </div>
          <div className="mt-2 text-xs text-neutral-400 font-mono">
            Biella/Tuscan production cost ratio
          </div>
        </div>

        <div className="p-6 bg-neutral-950 border border-neutral-800">
          <span className="text-xs text-neutral-400 uppercase tracking-wider">Patron Conversion Rate</span>
          <div className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">
            3.42%
          </div>
          <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+0.8% organic search uptick</span>
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-neutral-950 border border-neutral-800 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
          Category Performance Index
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500 uppercase">
                <th className="py-2.5">Category</th>
                <th className="py-2.5">Commissions</th>
                <th className="py-2.5">Gross Revenue</th>
                <th className="py-2.5">Return Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              <tr>
                <td className="py-3 font-sans text-white font-medium">Women's Atelier</td>
                <td className="py-3">68 orders</td>
                <td className="py-3 font-bold text-white">$28,450</td>
                <td className="py-3 text-emerald-400">1.8%</td>
              </tr>
              <tr>
                <td className="py-3 font-sans text-white font-medium">Men's Tailoring</td>
                <td className="py-3">42 orders</td>
                <td className="py-3 font-bold text-white">$21,800</td>
                <td className="py-3 text-emerald-400">2.1%</td>
              </tr>
              <tr>
                <td className="py-3 font-sans text-white font-medium">Leather Goods & Accessories</td>
                <td className="py-3">34 orders</td>
                <td className="py-3 font-bold text-white">$16,330</td>
                <td className="py-3 text-emerald-400">0.9%</td>
              </tr>
              <tr>
                <td className="py-3 font-sans text-white font-medium">Footwear</td>
                <td className="py-3">18 orders</td>
                <td className="py-3 font-bold text-white">$7,110</td>
                <td className="py-3 text-amber-400">3.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
