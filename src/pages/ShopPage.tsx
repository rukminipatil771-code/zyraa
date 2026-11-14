import React, { useMemo } from 'react';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SortOption } from '../types';
import { ProductCard } from '../components/product/ProductCard';

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    minRating,
    setMinRating,
    resetFilters,
  } = useStore();

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesRating = product.rating >= minRating;

      return matchesCategory && matchesQuery && matchesRating;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount-desc':
        sorted.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      default:
        break;
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, minRating]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    sortBy !== 'featured' ||
    minRating > 0;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
      {/* Header */}
      <div className="border-b border-[#E6DDD0] pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#6E6862] mb-2">
            ZYRAA Catalog
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#141414]">
            {selectedCategory === 'All' ? 'All Collections' : selectedCategory}
          </h1>
        </div>
        <p className="text-sm text-[#6E6862] tabular-nums">
          Showing {filteredProducts.length} of {PRODUCTS.length} pieces
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="space-y-5 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search
              className="w-4 h-4 text-[#6E6862] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by piece, material, or category..."
              aria-label="Filter products by keyword"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] placeholder:text-[#6E6862]"
            />
          </div>

          {/* Rating Filter */}
          <div className="md:col-span-3">
            <label htmlFor="rating-filter" className="sr-only">
              Filter by minimum rating
            </label>
            <select
              id="rating-filter"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] cursor-pointer"
            >
              <option value={0}>All Ratings</option>
              <option value={4.9}>4.9 ★ &amp; above</option>
              <option value={4.8}>4.8 ★ &amp; above</option>
              <option value={4.5}>4.5 ★ &amp; above</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="md:col-span-3">
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <div className="relative">
              <SlidersHorizontal
                className="w-4 h-4 text-[#6E6862] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
              />
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E6DDD0] rounded-md text-[#141414] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="discount-desc">Biggest Savings</option>
              </select>
            </div>
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex">
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              title="Reset all filters"
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-md border border-[#E6DDD0] bg-white text-[#141414] hover:bg-[#F3ECE2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="md:hidden">Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Interactive Category Tabs */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Filter by category"
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-[#141414] text-[#FAF8F5]'
                : 'bg-white border border-[#E6DDD0] text-[#6E6862] hover:text-[#141414] hover:border-[#141414]/40'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#141414] text-[#FAF8F5]'
                    : 'bg-white border border-[#E6DDD0] text-[#6E6862] hover:text-[#141414] hover:border-[#141414]/40'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#E6DDD0] rounded-lg py-16 px-6 text-center space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-[#141414]">
            No pieces matched your selection
          </h2>
          <p className="text-sm text-[#6E6862] max-w-md mx-auto">
            Try clearing your search keyword or adjusting the category and minimum
            rating filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#141414] text-[#FAF8F5] text-sm font-medium hover:bg-[#2E2B29] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
