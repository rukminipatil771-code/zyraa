import React from 'react';
import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SafeImage } from '../components/common/SafeImage';

export const WishlistPage: React.FC = () => {
  const {
    wishlistProducts,
    toggleWishlist,
    addToCart,
    setIsCartOpen,
    navigate,
  } = useStore();

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
      <div className="border-b border-[#E6DDD0] pb-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
            Saved Selections
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141414]">
            Your Wishlist
          </h1>
        </div>
        <p className="text-sm text-[#6E6862] tabular-nums">
          {wishlistProducts.length} saved piece(s)
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white border border-[#E6DDD0] rounded-lg py-16 px-6 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#F5E1DA]/70 flex items-center justify-center text-[#141414]">
            <Heart className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#141414]">
            Your wishlist is empty
          </h2>
          <p className="text-sm text-[#6E6862] max-w-md mx-auto">
            Tap the heart icon on any piece while browsing to curate your personal
            collection here.
          </p>
          <button
            type="button"
            onClick={() => navigate('shop', { category: 'All' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <article
              key={product.id}
              className="bg-white border border-[#E6DDD0] rounded-lg overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => navigate('product', { productId: product.id })}
                className="aspect-[4/3] w-full bg-[#F3ECE2] overflow-hidden cursor-pointer"
              >
                <SafeImage
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </button>

              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs uppercase tracking-[0.08em] text-[#6E6862]">
                  {product.category}
                </span>
                <button
                  type="button"
                  onClick={() => navigate('product', { productId: product.id })}
                  className="text-left mt-1 mb-3 cursor-pointer"
                >
                  <h2 className="font-sans text-base font-semibold text-[#141414] hover:underline">
                    {product.name}
                  </h2>
                </button>

                <div className="mt-auto pt-3 border-t border-[#F3ECE2] space-y-3">
                  <div className="flex items-baseline gap-2 tabular-nums">
                    <span className="text-base font-semibold text-[#141414]">
                      ${product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#6E6862] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, 1);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded bg-[#141414] text-[#FAF8F5] text-xs font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="p-2.5 rounded border border-[#E6DDD0] text-[#6E6862] hover:text-[#141414] hover:bg-[#F3ECE2] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
