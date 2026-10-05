import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  if (!isCartDrawerOpen) return null;

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

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const freeShippingLeft = Math.max(0, settings.freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(
    100,
    (cartSubtotal / settings.freeShippingThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#faf9f6] shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h2 className="font-serif-luxury text-xl font-medium tracking-wide uppercase">
              Shopping Bag
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              ({cartCount})
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-neutral-100 px-6 py-3 border-b border-neutral-200">
          <div className="text-xs text-neutral-700 font-medium">
            {freeShippingLeft > 0 ? (
              <span>
                Add <span className="font-semibold text-neutral-950 font-mono">{formatPrice(freeShippingLeft)}</span> more for complimentary white-glove shipping
              </span>
            ) : (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Complimentary White-Glove Shipping Unlocked
              </span>
            )}
          </div>
          <div className="w-full bg-neutral-200 h-1 mt-2 overflow-hidden">
            <div
              className="bg-neutral-900 h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-200">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-12 h-12 text-neutral-300 stroke-[1.2]" />
              <p className="mt-4 font-serif-luxury text-xl text-neutral-800">
                Your shopping bag is empty
              </p>
              <p className="mt-1 text-xs text-neutral-500 max-w-xs">
                Explore our tailoring, leather goods, and autumn capsules to begin.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 flex gap-4">
                <img
                  src={
                    item.product.images[0] ||
                    '/src/assets/images/product_linen_blazer_1791148253001.jpg'
                  }
                  alt={item.product.name}
                  className="w-20 h-24 object-cover bg-neutral-100 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute('src', '/src/assets/images/product_linen_blazer_1791148253001.jpg');
                  }}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-neutral-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variant specs */}
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500 font-medium">
                      <span>Size: {item.selectedSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block border border-neutral-300"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-mono font-medium text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-sm font-mono font-semibold tabular-nums text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Code <strong>{appliedCoupon.code}</strong> applied (-{formatPrice(cartDiscount)})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-emerald-900 underline hover:text-rose-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Privilege code (e.g. VELORA20)"
                    className="flex-1 bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-neutral-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="mt-1 text-[11px] text-rose-600">{couponError}</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900 tabular-nums">
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
                <span>Estimated Shipping</span>
                <span className="font-mono text-neutral-900 tabular-nums">
                  {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span className="font-mono text-neutral-900 tabular-nums">
                  {formatPrice(cartTax)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-medium text-neutral-950">
                <span className="uppercase tracking-wider">Estimated Total</span>
                <span className="font-mono text-base font-semibold tabular-nums">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Checkout & View Full Cart Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="w-full py-2.5 border border-neutral-300 text-neutral-700 hover:text-neutral-950 hover:border-neutral-900 text-xs font-medium tracking-wider uppercase transition-colors"
              >
                View Full Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
