import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { SafeImage } from '../common/SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const openDetails = () => {
    navigate('product', { productId: product.id });
  };

  return (
    <article className="group flex flex-col bg-white border border-[#E6DDD0]/80 rounded-lg overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(20,20,20,0.06)]">
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full bg-[#F3ECE2] overflow-hidden">
        <button
          type="button"
          onClick={openDetails}
          className="block w-full h-full text-left cursor-pointer"
          aria-label={`View details for ${product.name}`}
        >
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fallbackLabel={product.category}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {/* Subtle single text discount indicator */}
        {product.discountPercent > 0 && (
          <span className="absolute top-3 left-3 bg-[#141414] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
            -{product.discountPercent}%
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer ${
            wishlisted
              ? 'bg-[#F5E1DA] text-[#141414]'
              : 'bg-white/90 text-[#141414] hover:bg-[#F5E1DA]'
          }`}
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={1.6}
            fill={wishlisted ? '#141414' : 'none'}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-[#6E6862] mb-1.5">
          <span className="uppercase tracking-[0.08em] truncate">{product.category}</span>
          <span className="inline-flex items-center gap-1 tabular-nums shrink-0 text-[#141414]">
            <Star className="w-3.5 h-3.5 fill-[#141414] text-[#141414]" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-[#6E6862]">({product.reviewCount})</span>
          </span>
        </div>

        <button
          type="button"
          onClick={openDetails}
          className="text-left cursor-pointer mb-3"
        >
          <h3 className="font-sans text-base font-semibold text-[#141414] leading-snug group-hover:underline underline-offset-4 decoration-[#C89D8E]">
            {product.name}
          </h3>
        </button>

        {/* Price + Action Baseline */}
        <div className="mt-auto pt-3 border-t border-[#F3ECE2] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-[15px] font-semibold text-[#141414]">
              ${product.discountedPrice.toFixed(2)}
            </span>
            {product.originalPrice > product.discountedPrice && (
              <span className="text-xs text-[#6E6862] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#141414] text-[#FAF8F5] text-xs font-medium hover:bg-[#2E2B29] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
