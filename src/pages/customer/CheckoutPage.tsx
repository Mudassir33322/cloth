import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Lock, CreditCard, Banknote, Building2, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    appliedCoupon,
    createOrder,
    formatPrice,
    settings,
    navigate,
    showToast,
    currentCustomer,
  } = useStore();

  // Form states
  const [email, setEmail] = useState(currentCustomer?.email || 'patron@velora-couture.com');
  const [firstName, setFirstName] = useState(currentCustomer?.firstName || 'Claire');
  const [lastName, setLastName] = useState(currentCustomer?.lastName || 'Beauchamp');
  const [phone, setPhone] = useState(currentCustomer?.phone || '+1 (555) 234-8901');
  const [street, setStreet] = useState('742 Evergreen Terrace');
  const [apartment, setApartment] = useState('Suite 4B');
  const [city, setCity] = useState('Seattle');
  const [state, setState] = useState('WA');
  const [postalCode, setPostalCode] = useState('98101');
  const [country, setCountry] = useState('United States');

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'bank_transfer'>('card');

  // Demo Card fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');

  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="font-serif-luxury text-2xl text-neutral-800">
          Your shopping bag is empty
        </h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  // Adjust total based on shipping method chosen
  const actualShippingRate =
    shippingMethod === 'express'
      ? settings.expressShippingRate
      : cartSubtotal >= settings.freeShippingThreshold
      ? 0
      : settings.standardShippingRate;

  const actualTotal = Math.max(0, cartSubtotal - cartDiscount + actualShippingRate + cartTax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !street || !city || !postalCode) {
      showToast('Please fill out all mandatory shipping fields.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderItems = cart.map((item) => ({
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0] || '',
        sku: item.product.sku,
        price: item.price,
        quantity: item.quantity,
        color: item.selectedColor.name,
        size: item.selectedSize,
      }));

      const newOrder = createOrder({
        customerId: currentCustomer ? currentCustomer.id : 'guest-cust',
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        customerPhone: phone,
        items: orderItems,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: actualShippingRate,
        tax: cartTax,
        total: actualTotal,
        status: paymentMethod === 'cod' ? 'pending' : 'confirmed',
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        shippingMethod,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          firstName,
          lastName,
          street,
          apartment,
          city,
          state,
          postalCode,
          country,
          phone,
        },
        couponApplied: appliedCoupon ? appliedCoupon.code : undefined,
      });

      setIsProcessing(false);
      showToast(`Order #${newOrder.orderNumber} successfully booked!`);
      navigate(`/order-success?id=${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
            Bespoke Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium bg-neutral-100 px-3 py-1.5 border border-neutral-200">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Left */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Customer Contact */}
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span className="font-mono text-xs font-semibold text-neutral-950">01.</span>
                <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wide">
                  Patron Information
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Order confirmation & white-glove courier tracking details will be transmitted here.
                  </span>
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Phone Number (for Courier Delivery) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Destination */}
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span className="font-mono text-xs font-semibold text-neutral-950">02.</span>
                <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wide">
                  Shipping Destination
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Apartment, Suite, Unit (Optional)
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="e.g. Penthouse 4B"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Postal / ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  />
                </div>
                <div>
                  <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-950"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Shipping Protocol */}
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span className="font-mono text-xs font-semibold text-neutral-950">03.</span>
                <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wide">
                  Fulfillment Method
                </h2>
              </div>
              <div className="space-y-3 mt-4">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'standard'
                      ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">
                        Standard White-Glove Courier (3–5 Business Days)
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Acid-free archival tissue wrapping and tracked delivery.
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-neutral-900 tabular-nums">
                    {cartSubtotal >= settings.freeShippingThreshold
                      ? 'Complimentary'
                      : formatPrice(settings.standardShippingRate)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express'
                      ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900">
                        Priority Atelier Express (1–2 Business Days)
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Direct air-courier dispatch with signature verification.
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-neutral-900 tabular-nums">
                    {formatPrice(settings.expressShippingRate)}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-200">
                <span className="font-mono text-xs font-semibold text-neutral-950">04.</span>
                <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wide">
                  Payment Protocol
                </h2>
              </div>
              <div className="space-y-3 mt-4">
                {/* Credit Card */}
                {settings.enableCard && (
                  <div
                    className={`border transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-neutral-950 bg-white ring-1 ring-neutral-950'
                        : 'border-neutral-200 bg-white'
                    }`}
                  >
                    <label
                      onClick={() => setPaymentMethod('card')}
                      className="p-4 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="accent-neutral-900"
                        />
                        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                          <CreditCard className="w-4 h-4 text-neutral-700" />
                          <span>Credit / Debit Card (Instant Settlement)</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono uppercase">
                        Visa · MC · Amex
                      </span>
                    </label>

                    {paymentMethod === 'card' && (
                      <div className="p-4 pt-0 border-t border-neutral-100 bg-neutral-50/50 space-y-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-600 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="w-full bg-white border border-neutral-300 px-3 py-2 font-mono text-neutral-900"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-600 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardExp}
                              onChange={(e) => setCardExp(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full bg-white border border-neutral-300 px-3 py-2 font-mono text-neutral-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium uppercase tracking-wider text-neutral-600 mb-1">
                              Security Code (CVV)
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              className="w-full bg-white border border-neutral-300 px-3 py-2 font-mono text-neutral-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cash on Delivery */}
                {settings.enableCod && (
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-neutral-900"
                      />
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                        <Banknote className="w-4 h-4 text-neutral-700" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      Settle upon arrival
                    </span>
                  </label>
                )}

                {/* Direct Bank Wire */}
                {settings.enableBankTransfer && (
                  <label
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="accent-neutral-900"
                      />
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                        <Building2 className="w-4 h-4 text-neutral-700" />
                        <span>Direct Atelier Bank Wire Transfer</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-500">
                      SWIFT / IBAN
                    </span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#f7f5f0] p-6 sm:p-8 border border-neutral-200 sticky top-28 space-y-6">
              <h2 className="font-serif-luxury text-xl font-medium text-neutral-900 uppercase tracking-wider">
                Order Review ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
              </h2>

              {/* Items Compact List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-neutral-200 border-b border-neutral-200 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          Qty: {item.quantity} · Size: {item.selectedSize} · {item.selectedColor.name}
                        </div>
                      </div>
                      <div className="font-mono font-semibold tabular-nums text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Privilege Code Applied */}
              {appliedCoupon && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex justify-between">
                  <span>Privilege Code ({appliedCoupon.code})</span>
                  <span className="font-mono font-semibold">-{formatPrice(cartDiscount)}</span>
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-900 tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Fulfillment ({shippingMethod === 'express' ? 'Priority Express' : 'Standard'})</span>
                  <span className="font-mono text-neutral-900 tabular-nums">
                    {actualShippingRate === 0 ? 'Complimentary' : formatPrice(actualShippingRate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono text-neutral-900 tabular-nums">
                    {formatPrice(cartTax)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-300 text-base font-semibold text-neutral-950">
                  <span className="uppercase tracking-wider">Total Amount</span>
                  <span className="font-mono text-xl font-bold tabular-nums">
                    {formatPrice(actualTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-500 text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                {isProcessing ? (
                  <span>Securing Order Allocation...</span>
                ) : (
                  <>
                    <span>Place Order · {formatPrice(actualTotal)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-neutral-500 text-center space-y-1">
                <p>By placing this order, you accept the VELORA Atelier terms of sale.</p>
                <p>Complimentary returns accepted within 30 days of receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
