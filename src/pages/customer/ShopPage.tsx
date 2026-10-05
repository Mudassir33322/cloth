import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/common/ProductCard';
import { SlidersHorizontal, ChevronDown, X, RotateCcw } from 'lucide-react';
import { CategoryType } from '../../types';

export const ShopPage: React.FC = () => {
  const { products, categories, navigate } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(800);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique sizes & colors
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
    return Array.from(map.entries());
  }, [products]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'sale') {
            if (!p.onSale) return false;
          } else if (selectedCategory === 'new-arrivals') {
            if (!p.isNewArrival) return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }
        if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) {
          return false;
        }
        if (
          selectedColor !== 'all' &&
          !p.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())
        ) {
          return false;
        }
        const effectivePrice = p.salePrice ?? p.price;
        if (effectivePrice > priceMax) {
          return false;
        }
        if (onlySale && !p.onSale) {
          return false;
        }
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
        }
        if (sortBy === 'price-high') {
          return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0; // featured
      });
  }, [
    products,
    selectedCategory,
    selectedSize,
    selectedColor,
    priceMax,
    onlySale,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceMax(800);
    setOnlySale(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    priceMax < 800 ||
    onlySale ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb & Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-2">
          <button onClick={() => navigate('/')} className="hover:text-neutral-900 transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-medium">Atelier Collection</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal">
              The Collection
            </h1>
            <p className="mt-1 text-xs text-neutral-500 max-w-lg">
              Architectural cuts, Italian fresco wools, and full-grain leather goods designed for timeless composure.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 tabular-nums">
              Showing {filteredProducts.length} results
            </span>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 border border-neutral-300 bg-white text-xs font-medium uppercase tracking-wider flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 py-2 pl-3 pr-8 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Left, Grid Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-8 pr-6 border-r border-neutral-200">
          {hasActiveFilters && (
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">
                Filters Active
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-neutral-900 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-3">
              Categories
            </h3>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left py-1 transition-colors ${
                  selectedCategory === 'all'
                    ? 'font-semibold text-neutral-950 underline underline-offset-4'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`w-full text-left py-1 transition-colors ${
                    selectedCategory === c.slug
                      ? 'font-semibold text-neutral-950 underline underline-offset-4'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold">
                Maximum Price
              </h3>
              <span className="font-mono text-xs font-semibold tabular-nums text-neutral-900">
                ${priceMax}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="800"
              step="25"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-neutral-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
              <span>$50</span>
              <span>$800+</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="pt-6 border-t border-neutral-200">
            <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-xs font-mono border transition-colors ${
                  selectedSize === 'all'
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                }`}
              >
                All
              </button>
              {allSizes.slice(0, 10).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 text-xs font-mono border transition-colors ${
                    selectedSize === s
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="pt-6 border-t border-neutral-200">
            <h3 className="text-xs uppercase tracking-widest text-neutral-900 font-semibold mb-3">
              Shade / Color
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor('all')}
                className={`text-xs px-2 py-0.5 border ${
                  selectedColor === 'all'
                    ? 'border-neutral-950 font-semibold text-neutral-950'
                    : 'border-neutral-300 text-neutral-600'
                }`}
              >
                All
              </button>
              {allColors.map(([name, hex]) => (
                <button
                  key={name}
                  onClick={() => setSelectedColor(name)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor.toLowerCase() === name.toLowerCase()
                      ? 'border-neutral-950 scale-110 ring-1 ring-neutral-950'
                      : 'border-transparent'
                  }`}
                  style={{ padding: '1px' }}
                  title={name}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/10"
                    style={{ backgroundColor: hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-6 border-t border-neutral-200 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-800">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span>Archival Privilege (Sale) Only</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-800">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-neutral-900"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-neutral-300 bg-neutral-50/50 p-8">
              <p className="font-serif-luxury text-2xl text-neutral-800">
                No garments match your active filters
              </p>
              <p className="mt-2 text-xs text-neutral-500 max-w-sm mx-auto">
                Try widening your price range, clearing size restrictions, or switching categories.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#faf9f6] shadow-2xl z-50 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <span className="font-serif-luxury text-xl font-medium">Filters</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                    Category
                  </h4>
                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`block py-1 ${selectedCategory === 'all' ? 'font-bold' : ''}`}
                    >
                      All
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.slug)}
                        className={`block py-1 ${selectedCategory === c.slug ? 'font-bold' : ''}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                    Max Price (${priceMax})
                  </h4>
                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="25"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-neutral-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-950 text-white text-xs uppercase font-medium"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs text-neutral-600 hover:text-neutral-950"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
