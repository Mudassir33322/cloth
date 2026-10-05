import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Filter,
  Eye,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  X,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    updateOrderTracking,
    formatPrice,
    showToast,
  } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  const statuses: { label: string; value: string }[] = [
    { label: 'All Orders', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setTrackingInput(order.trackingNumber || '');
  };

  const handleSaveTracking = () => {
    if (!selectedOrder) return;
    updateOrderTracking(selectedOrder.id, trackingInput);
    setSelectedOrder({ ...selectedOrder, trackingNumber: trackingInput });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Orders & Courier Fulfillment
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Dispatch garments, manage courier tracking, and update status timelines.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-4 py-2 border border-neutral-800">
          Total Booked: <strong className="text-white">{orders.length} orders</strong>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`px-3 py-1.5 uppercase font-mono text-xs whitespace-nowrap transition-colors ${
                  statusFilter === s.value
                    ? 'bg-amber-400 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64 bg-neutral-900 border border-neutral-700 px-3 py-1.5 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order #, patron..."
              className="w-full bg-transparent text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Patron</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Fulfillment</th>
              <th className="py-3 px-3">Total Amount</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-900/60 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white">
                  #{order.orderNumber}
                </td>
                <td className="py-3.5 px-3 text-neutral-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3.5 px-3 font-sans font-medium text-neutral-200">
                  {order.customerName}
                </td>
                <td className="py-3.5 px-3 text-neutral-400">
                  {order.items.length} pcs
                </td>
                <td className="py-3.5 px-3 capitalize font-sans text-neutral-300">
                  {order.shippingMethod}
                </td>
                <td className="py-3.5 px-3 font-bold tabular-nums text-white">
                  {formatPrice(order.total)}
                </td>
                <td className="py-3.5 px-3 uppercase text-[10px]">
                  <span
                    className={
                      order.paymentStatus === 'paid'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }
                  >
                    {order.paymentMethod} ({order.paymentStatus})
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value as OrderStatus)
                    }
                    className="bg-neutral-900 border border-neutral-700 text-neutral-200 py-1 px-2 text-xs uppercase font-mono cursor-pointer focus:outline-none focus:border-amber-400"
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
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => handleOpenDetails(order)}
                    className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs uppercase font-sans font-medium transition-colors"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-3xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-normal text-white">
                    Order Commission #{selectedOrder.orderNumber}
                  </h2>
                  <span className="text-xs text-neutral-400">
                    Booked on {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Update Control */}
              <div className="mt-6 p-4 bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block mb-1 uppercase tracking-wider">
                    Current Fulfillment Status:
                  </span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as OrderStatus;
                      updateOrderStatus(selectedOrder.id, nextStatus);
                      setSelectedOrder({ ...selectedOrder, status: nextStatus });
                    }}
                    className="bg-neutral-800 border border-neutral-700 text-white py-1.5 px-3 uppercase font-mono font-semibold"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="packed">Packed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex-1 max-w-sm">
                  <span className="text-neutral-400 block mb-1 uppercase tracking-wider">
                    Courier Tracking #
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="e.g. TRK-98124029"
                      className="flex-1 bg-neutral-800 border border-neutral-700 px-3 py-1 text-white font-mono"
                    />
                    <button
                      onClick={handleSaveTracking}
                      className="px-3 py-1 bg-amber-400 text-neutral-950 font-semibold uppercase hover:bg-amber-300"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Patron & Destination */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-y border-neutral-800 py-6">
                <div>
                  <h4 className="uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Patron Credentials
                  </h4>
                  <div className="text-neutral-400 space-y-1">
                    <p className="text-white font-medium">{selectedOrder.customerName}</p>
                    <p>{selectedOrder.customerEmail}</p>
                    <p>{selectedOrder.customerPhone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Shipping Destination
                  </h4>
                  <div className="text-neutral-400 leading-relaxed">
                    {selectedOrder.shippingAddress.street}
                    {selectedOrder.shippingAddress.apartment && `, ${selectedOrder.shippingAddress.apartment}`}
                    <br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}
                    <br />
                    {selectedOrder.shippingAddress.country}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-6 space-y-3">
                <h4 className="uppercase tracking-wider font-semibold text-neutral-300 text-xs">
                  Garments Assigned
                </h4>
                <div className="divide-y divide-neutral-800">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage}
                          alt=""
                          className="w-10 h-12 object-cover bg-neutral-800"
                        />
                        <div>
                          <div className="text-white font-medium">{item.productName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            Qty: {item.quantity} · Size: {item.size} · Color: {item.color}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono tabular-nums text-white font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-800 space-y-1.5 text-xs text-neutral-400 max-w-xs ml-auto">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Privilege Code ({selectedOrder.couponApplied})</span>
                      <span className="font-mono">-{formatPrice(selectedOrder.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono text-white">{formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-mono text-white">{formatPrice(selectedOrder.tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-700 font-bold text-white text-sm">
                    <span>Total Amount</span>
                    <span className="font-mono text-amber-300">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-between items-center">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Formal Invoice</span>
                </button>

                <button
                  onClick={() => setSelectedOrder(null)}
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
