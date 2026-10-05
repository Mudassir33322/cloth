import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    settings,
    navigate,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCode('');
    }
  };

  const freeShippingLeft = Math.max(0, settings.freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif-luxury text-3xl text-neutral-900 font-normal">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-2 text-xs text-neutral-500 max-w-sm mx-auto">
          Explore our seasonal collection of tailoring, silk slip dresses, and Tuscan leather goods.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 px-8 py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
            Shopping Bag ({cartCount} {cartCount === 1 ? 'Garment' : 'Garments'})
          </h1>
        </div>
        {freeShippingLeft > 0 ? (
          <div className="text-xs text-neutral-600">
            Add <span className="font-semibold text-neutral-900 font-mono">{formatPrice(freeShippingLeft)}</span> more for complimentary white-glove shipping.
          </div>
        ) : (
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Complimentary White-Glove Shipping Unlocked
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Items Table Left */}
        <div className="lg:col-span-8">
          <div className="divide-y divide-neutral-200 border-b border-neutral-200">
            {cart.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                <img
                  src={
                    item.product.images[0] ||
                    '/src/assets/images/product_linen_blazer_1791148253001.jpg'
                  }
                  alt={item.product.name}
                  className="w-24 h-32 sm:w-28 sm:h-36 object-cover bg-neutral-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                          {item.product.brand} · {item.product.category}
                        </div>
                        <h3 className="text-base font-medium text-neutral-900 leading-snug mt-0.5">
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-neutral-500 font-mono mt-0.5">
                          SKU: {item.product.sku}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-neutral-600">
                      <div>
                        Size: <strong className="text-neutral-900 font-mono">{item.selectedSize}</strong>
                      </div>
                      <span className="text-neutral-300">·</span>
                      <div className="flex items-center gap-1.5">
                        Color:
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <strong className="text-neutral-900">{item.selectedColor.name}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center border border-neutral-300 bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3.5 py-1.5 text-xs font-mono font-medium text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-base font-semibold tabular-nums text-neutral-950">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-400">
                        {formatPrice(item.price)} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-xs">
            <button
              onClick={() => navigate('/shop')}
              className="text-neutral-700 underline underline-offset-4 hover:text-neutral-950"
            >
              ← Continue browsing garments
            </button>
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="lg:col-span-4">
          <div className="bg-[#f7f5f0] p-6 sm:p-8 border border-neutral-200 space-y-6">
            <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wider">
              Order Summary
            </h2>

            {/* Privilege Code Box */}
            <div>
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Privilege code <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(cartDiscount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-900 underline hover:text-rose-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Privilege Code (e.g. VELORA20)"
                      className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-neutral-950"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-950 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600">{couponError}</p>
                  )}
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs text-neutral-600 border-t border-neutral-200/80 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900 font-medium tabular-nums">
                  {formatPrice(cartSubtotal)}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Privilege Discount</span>
                  <span className="font-mono tabular-nums">-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-neutral-900 font-medium tabular-nums">
                  {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono text-neutral-900 font-medium tabular-nums">
                  {formatPrice(cartTax)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-300 text-sm font-semibold text-neutral-950">
                <span className="uppercase tracking-wider">Total</span>
                <span className="font-mono text-lg font-bold tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] text-neutral-500">
              Tax calculated at checkout · Secure 256-bit encrypted transactions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
