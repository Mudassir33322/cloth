import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Customer } from '../../types';
import { Search, Mail, Phone, ShoppingCart, UserCheck, Star, X } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers, orders, formatPrice, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Patron Accounts & CRM
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Maintain relationship histories, address portfolios, and VIP lifetime thresholds.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-4 py-2 border border-neutral-800">
          Registered Patrons: <strong className="text-white">{customers.length}</strong>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-neutral-950 border border-neutral-800">
        <div className="w-full sm:w-80 bg-neutral-900 border border-neutral-700 px-3 py-2 flex items-center gap-2 text-xs">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patrons by name or email..."
            className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
              <th className="py-3 px-4">Patron Name</th>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Commissions</th>
              <th className="py-3 px-3">Lifetime Spend</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
            {filtered.map((customer) => (
              <tr key={customer.id} className="hover:bg-neutral-900/60 transition-colors">
                <td className="py-3.5 px-4 font-sans font-medium text-white">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="py-3.5 px-3 text-neutral-400">{customer.email}</td>
                <td className="py-3.5 px-3 text-neutral-400">{customer.phone}</td>
                <td className="py-3.5 px-3">{customer.ordersCount} orders</td>
                <td className="py-3.5 px-3 font-bold tabular-nums text-white">
                  {formatPrice(customer.totalSpent)}
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-sans ${
                      customer.status === 'vip'
                        ? 'text-amber-300 bg-amber-950 border border-amber-800'
                        : 'text-neutral-300 bg-neutral-800'
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs uppercase font-sans font-medium"
                  >
                    Inspect Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setSelectedCustomer(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif-luxury text-2xl font-normal text-white">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h3>
                  <span className="text-xs text-neutral-400">
                    Patron ID: {selectedCustomer.id} · Registered {new Date(selectedCustomer.registeredAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-400 block mb-1 uppercase tracking-wider">
                      Lifetime Spend
                    </span>
                    <span className="font-mono text-lg font-bold text-amber-300">
                      {formatPrice(selectedCustomer.totalSpent)}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-400 block mb-1 uppercase tracking-wider">
                      Completed Orders
                    </span>
                    <span className="font-mono text-lg font-bold text-white">
                      {selectedCustomer.ordersCount}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-neutral-400 uppercase tracking-wider mb-1 font-semibold">
                    Saved Residences
                  </h4>
                  <div className="space-y-2">
                    {selectedCustomer.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-3 bg-neutral-900 border border-neutral-800 text-neutral-300"
                      >
                        <p>{addr.street} {addr.apartment && `, ${addr.apartment}`}</p>
                        <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p>{addr.country}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
