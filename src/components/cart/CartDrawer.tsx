import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderRecord } from '../../types';
import { SafeImage } from '../common/SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    shippingFee,
    orderTotal,
    freeShippingThreshold,
    navigate,
    user,
    placeDemoOrder,
  } = useStore();

  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const [customerName, setCustomerName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [formError, setFormError] = useState('');

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const closeDrawer = () => {
    setIsCartOpen(false);
    window.setTimeout(() => {
      if (step === 'confirmed') setStep('bag');
      setFormError('');
    }, 250);
  };

  const openCheckout = () => {
    setCustomerName(user?.name ?? customerName);
    setEmail(user?.email ?? email);
    setFormError('');
    setStep('checkout');
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      setFormError('Please complete all delivery fields before placing your demo order.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address for your order confirmation.');
      return;
    }
    const order = placeDemoOrder({
      customerName: customerName.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
    });
    setConfirmedOrder(order);
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#141414]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div className="fixed inset-0" onClick={closeDrawer} aria-hidden="true" />

      <aside className="relative z-10 w-full max-w-md bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#E6DDD0]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6DDD0] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">
              {step === 'bag'
                ? 'Your Shopping Bag'
                : step === 'checkout'
                  ? 'Express Demo Checkout'
                  : 'Order Confirmed'}
            </h2>
            {step === 'bag' && (
              <p className="text-xs text-[#6E6862] mt-0.5">
                {cart.reduce((s, i) => s + i.quantity, 0)} piece(s) selected
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 rounded-md text-[#6E6862] hover:text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="py-8 space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#F5E1DA] flex items-center justify-center text-[#141414]">
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#6E6862]">
                  Order #{confirmedOrder.id}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#141414]">
                  Thank you, {confirmedOrder.customerName}
                </h3>
                <p className="text-sm text-[#6E6862] max-w-xs leading-relaxed">
                  Your demo order has been recorded locally. A receipt summary is
                  available below and in your account history.
                </p>
              </div>

              <div className="bg-white border border-[#E6DDD0] rounded-lg p-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#6E6862]">
                  <span>Deliver to</span>
                  <span className="text-[#141414] font-medium text-right">
                    {confirmedOrder.address}, {confirmedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between text-[#6E6862]">
                  <span>Items</span>
                  <span className="text-[#141414] tabular-nums">
                    {confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#F3ECE2] font-semibold text-[#141414] tabular-nums">
                  <span>Total (Demo)</span>
                  <span>${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  navigate('shop', { category: 'All' });
                }}
                className="w-full py-3 px-5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#6E6862]">
                <ShoppingBag className="w-7 h-7" strokeWidth={1.35} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl font-medium text-[#141414]">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-[#6E6862] max-w-xs">
                  Explore our curated wardrobe essentials, leather carryalls, and
                  botanical skincare to begin.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  navigate('shop', { category: 'All' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : step === 'checkout' ? (
            <form id="demo-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="p-3.5 rounded-md bg-[#F5E1DA]/55 border border-[#D9B6AA]/50 text-xs text-[#141414]">
                Demo Checkout Mode — No real payment is processed or charged.
              </div>

              {formError && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-800">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#141414] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Aria Sharma"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141414] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aria@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#141414] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="24 Rue de Rivoli, Apt 4B"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#141414] mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#141414] mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="400001"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('bag')}
                className="text-xs font-medium text-[#6E6862] hover:text-[#141414] underline underline-offset-4 cursor-pointer"
              >
                ← Return to bag items
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              {/* Complimentary Shipping Progress */}
              <div className="p-3.5 rounded-md bg-[#F3ECE2] space-y-2">
                <p className="text-xs text-[#141414]">
                  {remainingForFreeShipping === 0
                    ? 'You have unlocked complimentary express shipping.'
                    : `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary express shipping.`}
                </p>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#141414] transition-all duration-300"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="divide-y divide-[#E6DDD0]">
                {cart.map((item) => (
                  <li key={item.cartKey} className="py-4 flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        closeDrawer();
                        navigate('product', { productId: item.product.id });
                      }}
                      className="w-20 h-20 rounded bg-[#F3ECE2] overflow-hidden shrink-0 cursor-pointer"
                    >
                      <SafeImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            closeDrawer();
                            navigate('product', { productId: item.product.id });
                          }}
                          className="text-sm font-semibold text-[#141414] text-left hover:underline truncate cursor-pointer"
                        >
                          {item.product.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartKey)}
                          aria-label={`Remove ${item.product.name}`}
                          className="p-1 text-[#6E6862] hover:text-[#141414] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#6E6862] mt-0.5">
                        {[item.selectedSize, item.selectedColor].filter(Boolean).join(' · ')}
                      </p>

                      <div className="mt-auto pt-3 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center border border-[#E6DDD0] bg-white rounded">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartKey, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.cartKey, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#141414] tabular-nums">
                          ${(item.product.discountedPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Totals */}
        {cart.length > 0 && step !== 'confirmed' && (
          <div className="p-6 bg-white border-t border-[#E6DDD0] space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#6E6862]">
                <span>Subtotal</span>
                <span className="text-[#141414] tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[#6E6862]">
                  <span>Atelier Savings</span>
                  <span className="text-[#141414] tabular-nums">
                    -${totalSavings.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6862]">
                <span>Shipping</span>
                <span className="text-[#141414] tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#F3ECE2] text-base font-semibold text-[#141414] tabular-nums">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={openCheckout}
                className="w-full py-3.5 px-5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="demo-checkout-form"
                className="w-full py-3.5 px-5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
              >
                Confirm Demo Order (${orderTotal.toFixed(2)})
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
