import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Package, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { orders, lastCreatedOrder, formatPrice, navigate } = useStore();

  // If redirected with order ID or fallback to last created or newest order
  const order = lastCreatedOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <h2 className="font-serif-luxury text-2xl text-neutral-800">No active order found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 shadow-sm">
        {/* Success Header */}
        <div className="text-center pb-8 border-b border-neutral-200">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            Order Confirmed
          </span>
          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
            Thank you, {order.customerName}
          </h1>
          <p className="mt-2 text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
            Your atelier allocation is reserved. A confirmation with itemized receipt has been dispatched to{' '}
            <strong className="text-neutral-900">{order.customerEmail}</strong>.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-neutral-50 px-4 py-2 border border-neutral-200">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
              Order Number:
            </span>
            <span className="font-mono text-sm font-semibold text-neutral-950">
              #{order.orderNumber}
            </span>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="py-8 border-b border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="uppercase tracking-wider font-semibold text-neutral-900 mb-2">
              Shipping Destination
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              <br />
              {order.shippingAddress.street} {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              <br />
              {order.shippingAddress.country}
            </p>
          </div>

          <div>
            <h3 className="uppercase tracking-wider font-semibold text-neutral-900 mb-2">
              Fulfillment & Payment
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900 font-medium">Method:</strong>{' '}
              {order.shippingMethod === 'express' ? 'Priority Atelier Express (1–2 Days)' : 'Standard White-Glove (3–5 Days)'}
              <br />
              <strong className="text-neutral-900 font-medium">Payment:</strong>{' '}
              {order.paymentMethod.toUpperCase()} ({order.paymentStatus === 'paid' ? 'Settled' : 'Pending Delivery'})
              <br />
              <strong className="text-neutral-900 font-medium">Tracking:</strong>{' '}
              {order.trackingNumber || 'Allocation being prepared for courier handover'}
            </p>
          </div>
        </div>

        {/* Itemized Order Breakdown */}
        <div className="py-8 border-b border-neutral-200">
          <h3 className="uppercase tracking-wider text-xs font-semibold text-neutral-900 mb-4">
            Reserved Garments
          </h3>
          <div className="divide-y divide-neutral-100">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.productImage || '/assets/images/product_linen_blazer_1791148253001.jpg'}
                    alt={item.productName}
                    className="w-12 h-16 object-cover bg-neutral-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-medium text-neutral-900">{item.productName}</h4>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      Qty: {item.quantity} · Size: {item.size} · Color: {item.color}
                    </span>
                  </div>
                </div>
                <div className="font-mono text-sm font-semibold tabular-nums text-neutral-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-neutral-900 tabular-nums">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Privilege Discount ({order.couponApplied || 'Coupon'})</span>
                <span className="font-mono tabular-nums">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Fulfillment</span>
              <span className="font-mono text-neutral-900 tabular-nums">
                {order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span className="font-mono text-neutral-900 tabular-nums">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-semibold text-neutral-950">
              <span className="uppercase tracking-wider">Total</span>
              <span className="font-mono text-lg font-bold tabular-nums">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-2.5 border border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-950 text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Receipt</span>
          </button>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <button
              onClick={() => navigate('/account')}
              className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-medium uppercase tracking-wider transition-colors text-center"
            >
              Track in Customer Account
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
