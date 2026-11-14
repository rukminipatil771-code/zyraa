import React from 'react';
import { CATEGORIES } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { ZyraaLogo } from '../common/ZyraaLogo';

export const Footer: React.FC = () => {
  const { navigate } = useStore();

  return (
    <footer className="bg-[#141414] text-[#FAF8F5] border-t border-[#2A2725]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <ZyraaLogo variant="light" size="lg" />
            <p className="font-serif italic text-lg text-[#F5E1DA]">
              Discover Your Style. Shop Your World.
            </p>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Curated wardrobe staples, artisanal leather goods, clean botanical
              skincare, and tactile lifestyle objects crafted with quiet elegance.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9B6AA]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('shop', { category: 'All' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('wishlist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About ZYRAA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9B6AA]">
              Categories
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-white/75">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <button
                    type="button"
                    onClick={() => navigate('shop', { category: cat.name })}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D9B6AA]">
              Client Care
            </h4>
            <div className="space-y-2 text-sm text-white/75">
              <p>Complimentary shipping on orders over $150</p>
              <p>30-day seamless returns & exchanges</p>
              <p className="pt-2 text-white/90">concierge@zyraa.com</p>
              <p className="text-white/60">Mon – Sat · 09:00 – 19:00 IST</p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>© {new Date().getFullYear()} ZYRAA Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Craftsmanship Charter
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Customer Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
