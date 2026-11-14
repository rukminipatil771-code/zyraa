import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, User as UserIcon, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ViewRoute } from '../../types';
import { ZyraaLogo } from '../common/ZyraaLogo';

export const Navbar: React.FC = () => {
  const {
    activeView,
    navigate,
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    wishlistIds,
    user,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const handleNav = (view: ViewRoute, scrollTarget?: string) => {
    setMobileMenuOpen(false);
    if (view === 'home' && scrollTarget) {
      navigate('home');
      window.setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    if (view === 'shop') {
      navigate('shop', { category: 'All' });
      return;
    }
    navigate(view);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('shop');
    setMobileMenuOpen(false);
  };

  const navItems: Array<{ label: string; view: ViewRoute; id?: string }> = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'Categories', view: 'home', id: 'categories-section' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6DDD0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -ml-2 text-[#141414] hover:bg-[#F3ECE2] rounded-md transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => handleNav('home')}
            className="cursor-pointer py-1"
            aria-label="ZYRAA Home"
          >
            <ZyraaLogo />
          </button>
        </div>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#6E6862]"
        >
          {navItems.map((item) => {
            const isActive =
              (item.view === activeView && !item.id) ||
              (item.label === 'Shop' && activeView === 'shop');
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.view, item.id)}
                className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#141414] border-[#141414]'
                    : 'border-transparent hover:text-[#141414] hover:border-[#C89D8E]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search, Wishlist, Cart, Account */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Inline Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative"
          >
            <Search
              className="w-4 h-4 text-[#6E6862] absolute left-3 pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'shop' && e.target.value.trim().length > 0) {
                  navigate('shop');
                }
              }}
              placeholder="Search pieces..."
              aria-label="Search products"
              className="w-44 xl:w-56 pl-9 pr-3 py-1.5 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] placeholder:text-[#6E6862] focus:border-[#141414] transition-colors"
            />
          </form>

          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setSearchExpanded((prev) => !prev)}
            className="md:hidden p-2 text-[#141414] hover:bg-[#F3ECE2] rounded-md transition-colors cursor-pointer"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" strokeWidth={1.6} />
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() => handleNav('wishlist')}
            className="relative p-2 text-[#141414] hover:bg-[#F3ECE2] rounded-md transition-colors cursor-pointer"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
          >
            <Heart
              className="w-5 h-5"
              strokeWidth={1.6}
              fill={activeView === 'wishlist' ? '#141414' : 'none'}
            />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#F5E1DA] text-[#141414] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Cart */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#141414] hover:bg-[#F3ECE2] rounded-md transition-colors cursor-pointer"
            aria-label={`Shopping bag (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#141414] text-[#FAF8F5] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login / Account */}
          <button
            type="button"
            onClick={() => handleNav('auth')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-[#141414] text-[#FAF8F5] text-xs font-medium hover:bg-[#2E2B29] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchExpanded && (
        <div className="md:hidden px-4 pb-3 border-t border-[#E6DDD0] bg-[#FAF8F5]">
          <form onSubmit={handleSearchSubmit} className="pt-3 flex items-center gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fashion, bags, skincare..."
              aria-label="Search products"
              className="flex-1 px-3 py-2 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] placeholder:text-[#6E6862]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#141414] text-[#FAF8F5] text-xs font-medium rounded-md whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6DDD0] bg-[#FAF8F5] px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item.view, item.id)}
              className="block w-full text-left px-3 py-2.5 text-sm font-medium text-[#141414] hover:bg-[#F3ECE2] rounded-md transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
