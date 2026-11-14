import React, { useState } from 'react';
import { LogOut, Package, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ZyraaLogo } from '../components/common/ZyraaLogo';

export const AuthPage: React.FC = () => {
  const { user, login, register, logout, orders, navigate } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fillDemoCredentials = () => {
    setMode('login');
    setEmail('demo@zyraa.com');
    setPassword('zyraa2026');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'register' && name.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (mode === 'login') {
        await login({ email: trimmedEmail, password });
      } else {
        await register({ name: name.trim(), email: trimmedEmail, password });
      }
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-10">
        <div className="bg-white border border-[#E6DDD0] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#F5E1DA] flex items-center justify-center text-[#141414]">
              <UserIcon className="w-6 h-6" strokeWidth={1.6} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#6E6862]">
                ZYRAA Member
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141414]">
                {user.name}
              </h1>
              <p className="text-sm text-[#6E6862]">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#E6DDD0] text-sm font-medium text-[#141414] hover:bg-[#F3ECE2] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Order History */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-[#141414]">
              Recent Demo Orders
            </h2>
            <button
              type="button"
              onClick={() => navigate('shop', { category: 'All' })}
              className="text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white border border-[#E6DDD0] rounded-lg p-8 text-center space-y-3">
              <Package className="w-7 h-7 mx-auto text-[#6E6862]" strokeWidth={1.5} />
              <p className="text-sm text-[#6E6862]">
                You have not placed any demo orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-[#E6DDD0] rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6862]">
                      Order #{order.id}
                    </p>
                    <p className="text-sm font-medium text-[#141414]">
                      {order.items.map((i) => `${i.quantity}× ${i.product.name}`).join(', ')}
                    </p>
                    <p className="text-xs text-[#6E6862]">
                      Deliver to {order.address}, {order.city} ·{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right tabular-nums shrink-0">
                    <p className="text-base font-semibold text-[#141414]">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#6E6862]">Confirmed (Demo)</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
      <div className="max-w-md mx-auto bg-white border border-[#E6DDD0] rounded-lg p-7 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-1">
            <ZyraaLogo size="md" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#141414]">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-sm text-[#6E6862]">
            {mode === 'login'
              ? 'Sign in to access your saved wishlist and order history.'
              : 'Join ZYRAA for tailored recommendations and express checkout.'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#F3ECE2] rounded-md">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#141414] shadow-xs'
                : 'text-[#6E6862] hover:text-[#141414]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`py-2 text-xs font-semibold rounded transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#141414] shadow-xs'
                : 'text-[#6E6862] hover:text-[#141414]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="p-3.5 rounded-md bg-red-50 border border-red-200 text-xs text-red-800"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-medium text-[#141414] mb-1.5">
                Full Name
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aria Sharma"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-[#141414] mb-1.5">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-xs font-medium text-[#141414] mb-1.5">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label
                htmlFor="auth-confirm-password"
                className="block text-xs font-medium text-[#141414] mb-1.5"
              >
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#E6DDD0] rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting
              ? 'Please wait...'
              : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>

        {/* Demo Account Helper */}
        <div className="pt-4 border-t border-[#F3ECE2] space-y-2.5 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#6E6862]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#141414]" />
            <span>Demo credentials ready for instant exploration</span>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2.5 px-4 rounded border border-[#E6DDD0] bg-[#FAF8F5] text-xs font-medium text-[#141414] hover:bg-[#F5E1DA]/50 transition-colors cursor-pointer"
          >
            Use Demo Account (demo@zyraa.com)
          </button>
        </div>
      </div>
    </div>
  );
};
