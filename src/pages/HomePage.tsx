import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import {
  CATEGORIES,
  CUSTOMER_REVIEWS,
  HERO_IMAGE,
  PRODUCTS,
  SPECIAL_OFFER_IMAGE,
} from '../data/products';
import { useStore } from '../context/StoreContext';
import { storageService } from '../services/storageService';
import { SafeImage } from '../components/common/SafeImage';
import { ProductCard } from '../components/product/ProductCard';

export const HomePage: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const newArrivals = PRODUCTS.filter((p) => p.collections.includes('new-arrival')).slice(0, 4);
  const bestSellers = PRODUCTS.filter((p) => p.collections.includes('best-seller')).slice(0, 4);
  const trendingProducts = PRODUCTS.filter((p) => p.collections.includes('trending')).slice(0, 4);
  const specialOfferProducts = PRODUCTS.filter((p) =>
    p.collections.includes('special-offer')
  ).slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    const result = storageService.subscribeNewsletter(trimmed);
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    showToast(
      result.alreadySubscribed
        ? 'You are already subscribed to ZYRAA Atelier updates.'
        : 'Welcome to ZYRAA Private List.'
    );
  };

  return (
    <div>
      {/* 1. Hero Banner */}
      <section className="relative bg-[#F3ECE2] border-b border-[#E6DDD0] overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5 px-6 sm:px-10 lg:px-14 py-14 lg:py-20 flex flex-col justify-center bg-[#FAF8F5]">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6E6862] mb-4">
              Autumn · Winter Atelier
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-[56px] font-semibold text-[#141414] leading-[1.08] tracking-tight mb-5">
              Discover Your Style. Shop Your World.
            </h1>
            <p className="text-base text-[#6E6862] leading-relaxed max-w-md mb-8">
              Refined tailoring, sculptural Italian leather goods, botanical
              skincare, and tactile objects curated for enduring everyday living.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('shop', { category: 'All' })}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('special-offers-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3.5 rounded border border-[#141414]/25 text-sm font-medium text-[#141414] hover:bg-[#F5E1DA]/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Seasonal Offers
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-[#E6DDD0] grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-semibold text-[#141414] tabular-nums">8 Curated</p>
                <p className="text-[#6E6862] mt-0.5">Lifestyle Departments</p>
              </div>
              <div>
                <p className="font-semibold text-[#141414] tabular-nums">Free Over $150</p>
                <p className="text-[#6E6862] mt-0.5">Express Delivery</p>
              </div>
              <div>
                <p className="font-semibold text-[#141414] tabular-nums">30-Day</p>
                <p className="text-[#6E6862] mt-0.5">Seamless Returns</p>
              </div>
            </div>
          </div>

          {/* Right Editorial Photography */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[440px] lg:min-h-[600px] bg-[#E6DDD0]">
            <SafeImage
              src={HERO_IMAGE}
              alt="ZYRAA Autumn Winter editorial campaign in beige cashmere coat and black structured bag"
              className="w-full h-full lg:absolute lg:inset-0 object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section
        id="categories-section"
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
              Departments
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('shop', { category: 'All' })}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() => navigate('shop', { category: category.name })}
              className="group text-left bg-white border border-[#E6DDD0] rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(20,20,20,0.06)] cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-[#F3ECE2] overflow-hidden">
                <SafeImage
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans text-sm sm:text-base font-semibold text-[#141414] group-hover:underline underline-offset-4 decoration-[#C89D8E]">
                  {category.name}
                </h3>
                <p className="text-xs text-[#6E6862] mt-1 truncate">{category.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals */}
      <section className="bg-white border-y border-[#E6DDD0] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
                Just Landed
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
                New Arrivals
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('shop', { category: 'All' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              <span>View All Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
              Client Favorites
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
              Best Sellers
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('shop', { category: 'All' })}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            <span>Shop Icons</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Special Offers Editorial Banner & Curated Pieces */}
      <section
        id="special-offers-section"
        className="bg-[#F3ECE2] border-y border-[#E6DDD0] py-16 lg:py-20"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-[#E6DDD0] rounded-lg overflow-hidden items-stretch">
            <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px]">
              <SafeImage
                src={SPECIAL_OFFER_IMAGE}
                alt="ZYRAA Atelier seasonal offer collection featuring cashmere, silk scarf, leather wallet, and fragrance"
                className="w-full h-full lg:absolute lg:inset-0 object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-[#FAF8F5]">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-[#6E6862] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Seasonal Privilege</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414] leading-tight mb-4">
                Up to 25% Off the Atelier Edit
              </h2>
              <p className="text-sm sm:text-base text-[#6E6862] leading-relaxed mb-7">
                Enjoy curated seasonal savings across satin evening wear,
                vegetable-tanned leather crossbody bags, and collector travel sets.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => navigate('shop', { category: 'All' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
                >
                  <span>Claim Seasonal Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOfferProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trending Products */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
              In High Demand
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
              Trending Products
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('shop', { category: 'All' })}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            <span>Browse Trending</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Customer Reviews */}
      <section className="bg-white border-t border-[#E6DDD0] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-xl mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
              Verified Patrons
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
              Notes from Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-lg p-6 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-[#141414] text-[#141414]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#141414] leading-relaxed">
                    “{review.comment}”
                  </p>
                </div>

                <footer className="pt-4 border-t border-[#E6DDD0] text-xs space-y-1">
                  <p className="font-semibold text-[#141414]">
                    {review.author} · <span className="font-normal text-[#6E6862]">{review.location}</span>
                  </p>
                  <p className="text-[#6E6862]">
                    {review.productName} · {review.date}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Subscription */}
      <section className="bg-[#F5E1DA]/55 border-t border-[#E6DDD0] py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862]">
            The Private List
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414]">
            Receive First Access to Seasonal Editions
          </h2>
          <p className="text-sm sm:text-base text-[#6E6862] max-w-xl mx-auto">
            Join ZYRAA patrons for quiet previews of new capsule drops, styling
            journals, and private invitations.
          </p>

          {newsletterSubscribed ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white border border-[#E6DDD0] text-sm font-medium text-[#141414]">
              <CheckCircle2 className="w-4 h-4" />
              <span>You are subscribed to the ZYRAA Private List.</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto pt-2 space-y-2"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  className="flex-1 px-4 py-3 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] placeholder:text-[#6E6862]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && (
                <p className="text-xs text-red-700 text-left">{newsletterError}</p>
              )}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
