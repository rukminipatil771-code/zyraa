import React, { useEffect, useMemo, useState } from 'react';
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/common/SafeImage';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedSize(selectedProduct.sizes?.[0]);
      setSelectedColor(selectedProduct.colors?.[0]?.name);
      setQuantity(1);
    }
  }, [selectedProduct]);

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    const sameCategory = PRODUCTS.filter(
      (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
    );
    const others = PRODUCTS.filter(
      (p) => p.category !== selectedProduct.category && p.id !== selectedProduct.id
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-semibold">Piece not found</h1>
        <button
          type="button"
          onClick={() => navigate('shop', { category: 'All' })}
          className="px-6 py-3 bg-[#141414] text-[#FAF8F5] rounded text-sm font-medium cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(selectedProduct.id);
  const activeImage = selectedProduct.images[activeImageIndex] ?? selectedProduct.images[0];

  const handleAddToCart = (openBag = false) => {
    addToCart(selectedProduct, quantity, selectedSize, selectedColor);
    if (openBag) {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-14">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-[#6E6862] mb-8 overflow-x-auto whitespace-nowrap"
      >
        <button
          type="button"
          onClick={() => navigate('home')}
          className="hover:text-[#141414] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <button
          type="button"
          onClick={() => navigate('shop', { category: selectedProduct.category })}
          className="hover:text-[#141414] transition-colors cursor-pointer"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#141414] font-medium truncate">
          {selectedProduct.name}
        </span>
      </nav>

      {/* Main PDP Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          <div className="aspect-[4/3] w-full bg-[#F3ECE2] border border-[#E6DDD0] rounded-lg overflow-hidden">
            <SafeImage
              src={activeImage}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {selectedProduct.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {selectedProduct.images.map((img, index) => (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-[4/3] rounded-md overflow-hidden bg-[#F3ECE2] border transition-all cursor-pointer ${
                    activeImageIndex === index
                      ? 'border-[#141414] ring-1 ring-[#141414]'
                      : 'border-[#E6DDD0] opacity-75 hover:opacity-100'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <SafeImage
                    src={img}
                    alt={`${selectedProduct.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white border border-[#E6DDD0] rounded-lg p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-2 border-b border-[#F3ECE2] pb-5">
            <div className="flex items-center justify-between gap-2 text-xs text-[#6E6862]">
              <span className="uppercase tracking-[0.14em]">
                {selectedProduct.category}
              </span>
              {selectedProduct.tag && (
                <span className="text-[#141414] font-medium">
                  {selectedProduct.tag}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141414] leading-tight">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1 text-sm text-[#141414] tabular-nums">
                <Star className="w-4 h-4 fill-[#141414] text-[#141414]" />
                <span className="font-semibold">{selectedProduct.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[#6E6862] tabular-nums">
                {selectedProduct.reviewCount} verified reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-3 tabular-nums">
              <span className="text-2xl font-semibold text-[#141414]">
                ${selectedProduct.discountedPrice.toFixed(2)}
              </span>
              {selectedProduct.originalPrice > selectedProduct.discountedPrice && (
                <>
                  <span className="text-base text-[#6E6862] line-through">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5E1DA] text-[#141414]">
                    Save {selectedProduct.discountPercent}%
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-sm text-[#6E6862] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Colors */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wider text-[#6E6862]">
                  Color
                </span>
                <span className="font-medium text-[#141414]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {selectedProduct.colors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select color ${color.name}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border transition-transform cursor-pointer ${
                        active
                          ? 'border-[#141414] ring-2 ring-[#141414]/20 scale-105'
                          : 'border-[#E6DDD0] hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {active && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.hex.toLowerCase().startsWith('#1') ||
                            color.hex.toLowerCase().startsWith('#2') ||
                            color.hex.toLowerCase().startsWith('#4')
                              ? 'text-white'
                              : 'text-[#141414]'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium uppercase tracking-wider text-[#6E6862]">
                  Size / Edition
                </span>
                <span className="text-[#141414] font-medium">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#141414] text-[#FAF8F5] border-[#141414]'
                          : 'bg-[#FAF8F5] text-[#141414] border-[#E6DDD0] hover:border-[#141414]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-[#E6DDD0] rounded bg-[#FAF8F5]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 h-11 px-5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(selectedProduct.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`w-11 h-11 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-[#F5E1DA] border-[#D9B6AA] text-[#141414]'
                    : 'bg-white border-[#E6DDD0] text-[#141414] hover:bg-[#F3ECE2]'
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={wishlisted ? '#141414' : 'none'}
                />
              </button>
            </div>
          </div>

          {/* Craftsmanship & Highlights */}
          <div className="pt-5 border-t border-[#F3ECE2] space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#141414]">
              Materials &amp; Craftsmanship
            </h2>
            <ul className="space-y-1.5 text-xs text-[#6E6862]">
              {selectedProduct.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#141414] shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#F3ECE2] grid grid-cols-3 gap-2 text-[11px] text-[#6E6862]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#141414] shrink-0" />
              <span>Free $150+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#141414] shrink-0" />
              <span>30d Returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#141414] shrink-0" />
              <span>Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20 pt-14 border-t border-[#E6DDD0]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-1.5">
              Curated Pairings
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#141414]">
              Related Pieces
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('shop', { category: selectedProduct.category })}
            className="text-sm font-medium text-[#141414] hover:underline underline-offset-4 cursor-pointer"
          >
            View {selectedProduct.category}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
