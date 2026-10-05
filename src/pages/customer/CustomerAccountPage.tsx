import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/common/ProductCard';
import {
  Package,
  Heart,
  MapPin,
  User,
  Shield,
  Clock,
  Printer,
  ChevronRight,
  Plus,
  Trash2,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const CustomerAccountPage: React.FC = () => {
  const {
    currentCustomer,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    formatPrice,
    navigate,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'profile'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders for the current customer (or all mock demo orders if guest/current)
  const customerOrders = orders.filter(
    (o) =>
      o.customerId === currentCustomer?.id ||
      o.customerEmail === currentCustomer?.email ||
      true
  );

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const pendingCount = customerOrders.filter((o) =>
    ['pending', 'confirmed', 'processing', 'packed'].includes(o.status)
  ).length;

  const deliveredCount = customerOrders.filter((o) => o.status === 'delivered').length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Delivered</span>;
      case 'shipped':
        return <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Shipped</span>;
      case 'processing':
      case 'packed':
        return <span className="text-amber-800 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Fulfilling</span>;
      case 'confirmed':
        return <span className="text-neutral-800 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Confirmed</span>;
      case 'cancelled':
        return <span className="text-rose-700 bg-rose-50 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Cancelled</span>;
      default:
        return <span className="text-neutral-600 bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider">Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Account Header */}
      <div className="border-b border-neutral-200 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            Patron Concierge
          </span>
          <h1 className="mt-1 font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
            Welcome, {currentCustomer?.firstName || 'Claire'}
          </h1>
          <p className="mt-1 text-xs text-neutral-500">
            Member of VELORA Private Client Salon since November 2025 · VIP Tier
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin')}
            className="px-4 py-2 border border-neutral-900 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>Admin Management</span>
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar Left */}
        <aside className="lg:col-span-3">
          <nav className="space-y-1 bg-white border border-neutral-200 p-2">
            {[
              { id: 'dashboard', label: 'Patron Dashboard', icon: User },
              { id: 'orders', label: 'My Atelier Orders', icon: Package, badge: customerOrders.length },
              { id: 'wishlist', label: 'Curated Wishlist', icon: Heart, badge: wishlist.length },
              { id: 'addresses', label: 'Delivery Residences', icon: MapPin },
              { id: 'profile', label: 'Profile & Security', icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSelectedOrder(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs tracking-wider uppercase font-medium transition-colors ${
                    isActive
                      ? 'bg-neutral-950 text-white'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 p-5 bg-[#f5f3ef] border border-neutral-200 text-xs">
            <h4 className="font-serif-luxury text-base text-neutral-900 font-medium">
              Private Concierge Desk
            </h4>
            <p className="mt-1 text-neutral-600 leading-relaxed">
              Need alterations or custom sizing consultation? Connect directly with our Manhattan salon.
            </p>
            <div className="mt-3 font-mono font-medium text-neutral-900">
              +1 (800) 845-8890
            </div>
          </div>
        </aside>

        {/* Content Panel Right */}
        <main className="lg:col-span-9">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-5 bg-white border border-neutral-200">
                  <div className="text-xs uppercase tracking-wider text-neutral-500">
                    Total Orders
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-neutral-900 tabular-nums">
                    {customerOrders.length}
                  </div>
                </div>
                <div className="p-5 bg-white border border-neutral-200">
                  <div className="text-xs uppercase tracking-wider text-neutral-500">
                    In Transit
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-blue-700 tabular-nums">
                    {pendingCount}
                  </div>
                </div>
                <div className="p-5 bg-white border border-neutral-200">
                  <div className="text-xs uppercase tracking-wider text-neutral-500">
                    Delivered
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-emerald-700 tabular-nums">
                    {deliveredCount}
                  </div>
                </div>
                <div className="p-5 bg-white border border-neutral-200">
                  <div className="text-xs uppercase tracking-wider text-neutral-500">
                    Wishlist Pieces
                  </div>
                  <div className="mt-2 font-mono text-2xl font-bold text-neutral-900 tabular-nums">
                    {wishlist.length}
                  </div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white border border-neutral-200 p-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <h3 className="font-serif-luxury text-xl font-medium text-neutral-900">
                    Recent Atelier Commissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs uppercase tracking-wider text-neutral-900 font-semibold hover:text-neutral-600 transition-colors"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="divide-y divide-neutral-100 mt-2">
                  {customerOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab('orders');
                      }}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 px-2 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-semibold text-neutral-950">
                            #{order.orderNumber}
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="mt-1 text-xs text-neutral-500">
                          {order.items.length} {order.items.length === 1 ? 'garment' : 'garments'} · Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-semibold tabular-nums text-neutral-900">
                          {formatPrice(order.total)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-neutral-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS & ORDER DETAILS */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-neutral-200 p-6 sm:p-8">
              {selectedOrder ? (
                /* Detailed View */
                <div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 mb-6 flex items-center gap-1 font-medium"
                  >
                    ← Back to All Orders
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-serif-luxury text-2xl font-normal text-neutral-950">
                          Order #{selectedOrder.orderNumber}
                        </h2>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Placed on {new Date(selectedOrder.createdAt).toLocaleString()} · {selectedOrder.paymentMethod.toUpperCase()} ({selectedOrder.paymentStatus})
                      </p>
                    </div>

                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-neutral-300 text-xs uppercase font-medium tracking-wider flex items-center gap-2 hover:bg-neutral-50"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Invoice</span>
                    </button>
                  </div>

                  {/* Courier Timeline */}
                  <div className="py-8 border-b border-neutral-200">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-neutral-900 mb-6">
                      Atelier & Courier Timeline
                    </h3>
                    <div className="relative border-l-2 border-neutral-300 ml-4 space-y-6 pl-6 text-xs">
                      {selectedOrder.timeline.map((step, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-neutral-950 border-2 border-white ring-2 ring-neutral-300" />
                          <div className="font-semibold text-neutral-950 uppercase tracking-wider">
                            {step.status.toUpperCase()}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                            {new Date(step.timestamp).toLocaleString()}
                          </div>
                          <p className="mt-1 text-neutral-600 font-light">
                            {step.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="py-6">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-neutral-900 mb-4">
                      Committed Pieces
                    </h3>
                    <div className="divide-y divide-neutral-100">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.productImage || '/src/assets/images/product_linen_blazer_1791148253001.jpg'}
                              alt=""
                              className="w-12 h-16 object-cover bg-neutral-100"
                            />
                            <div>
                              <div className="font-medium text-neutral-900">{item.productName}</div>
                              <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                                Qty: {item.quantity} · Size: {item.size} · Color: {item.color}
                              </div>
                            </div>
                          </div>
                          <div className="font-mono text-sm font-semibold tabular-nums text-neutral-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-200 max-w-xs ml-auto space-y-1.5 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono tabular-nums text-neutral-900">{formatPrice(selectedOrder.subtotal)}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="flex justify-between text-emerald-700">
                          <span>Discount</span>
                          <span className="font-mono tabular-nums">-{formatPrice(selectedOrder.discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Fulfillment</span>
                        <span className="font-mono tabular-nums text-neutral-900">{formatPrice(selectedOrder.shipping)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span className="font-mono tabular-nums text-neutral-900">{formatPrice(selectedOrder.tax)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-neutral-300 font-semibold text-sm text-neutral-950">
                        <span>Total</span>
                        <span className="font-mono tabular-nums text-base">{formatPrice(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Orders List */
                <div>
                  <h2 className="font-serif-luxury text-2xl font-normal text-neutral-950 mb-6">
                    All Commissions & Orders
                  </h2>

                  <div className="space-y-4">
                    {customerOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-5 border border-neutral-200 hover:border-neutral-950 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-neutral-950">
                              #{order.orderNumber}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>
                          <div className="mt-1.5 text-xs text-neutral-500">
                            Date: {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} items
                          </div>
                          {order.trackingNumber && (
                            <div className="mt-1 text-xs text-neutral-700 font-mono flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-neutral-500" />
                              <span>Courier: {order.trackingNumber}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 sm:border-l sm:border-neutral-200 sm:pl-6">
                          <div className="text-right">
                            <div className="font-mono text-base font-semibold text-neutral-950 tabular-nums">
                              {formatPrice(order.total)}
                            </div>
                            <div className="text-[11px] text-neutral-400 capitalize">
                              {order.paymentMethod}
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="bg-white border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
                <div>
                  <h2 className="font-serif-luxury text-2xl font-normal text-neutral-950">
                    Curated Wishlist ({wishlistProducts.length})
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1">
                    Garments reserved for your seasonal wardrobe curation.
                  </p>
                </div>
                {wishlistProducts.length > 0 && (
                  <button
                    onClick={() => {
                      wishlistProducts.forEach((p) =>
                        addToCart(p, p.sizes[0] || 'M', p.colors[0] || { name: 'Standard', hex: '#000' })
                      );
                    }}
                    className="px-4 py-2 border border-neutral-900 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Move All to Bag
                  </button>
                )}
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-serif-luxury text-xl text-neutral-800">
                    Your wishlist is presently empty
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Select the heart emblem on any piece across our collection to preserve it here.
                  </p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider"
                  >
                    Explore Garments
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-white border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
                <h2 className="font-serif-luxury text-2xl font-normal text-neutral-950">
                  Delivery Residences
                </h2>
                <button
                  onClick={() => showToast('Address creation form opened in demo mode.')}
                  className="px-4 py-2 border border-neutral-900 text-xs uppercase font-medium tracking-wider flex items-center gap-1.5 hover:bg-neutral-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Residence</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border-2 border-neutral-900 relative text-xs">
                  <span className="text-[10px] font-mono uppercase bg-neutral-900 text-white px-2 py-0.5 absolute top-3 right-3">
                    Default
                  </span>
                  <div className="font-semibold text-neutral-950 text-sm mb-1">
                    Claire Beauchamp
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    742 Evergreen Terrace, Suite 4B
                    <br />
                    Seattle, WA 98101
                    <br />
                    United States
                    <br />
                    +1 (555) 234-8901
                  </p>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex gap-4 text-neutral-900">
                    <button className="underline hover:text-neutral-600">Edit</button>
                    <button className="underline hover:text-rose-600">Delete</button>
                  </div>
                </div>

                <div className="p-5 border border-neutral-200 text-xs bg-neutral-50/50">
                  <div className="font-semibold text-neutral-950 text-sm mb-1">
                    Claire Beauchamp (Manhattan Salon)
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    450 West 14th Street, Meatpacking District
                    <br />
                    New York, NY 10014
                    <br />
                    United States
                    <br />
                    +1 (555) 234-8901
                  </p>
                  <div className="mt-4 pt-3 border-t border-neutral-200 flex gap-4 text-neutral-900">
                    <button className="underline hover:text-neutral-600">Edit</button>
                    <button className="underline hover:text-neutral-600">Make Default</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & SECURITY */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-neutral-200 p-6 sm:p-8 max-w-xl">
              <h2 className="font-serif-luxury text-2xl font-normal text-neutral-950 mb-6">
                Patron Profile & Security
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Patron profile details updated.');
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Claire Beauchamp"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="claire.b@example.com"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 234-8901"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <h3 className="uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                    Security Credentials
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-neutral-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-neutral-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-950 text-white uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
