import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    categories,
    navigate,
    formatPrice,
  } = useStore();

  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [products, query]);

  if (!isSearchModalOpen) return null;

  const handleSelectProduct = (slug: string) => {
    setIsSearchModalOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    setIsSearchModalOpen(false);
    navigate(`/category/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative max-w-3xl mx-auto my-12 px-4 z-50">
        <div className="bg-[#faf9f6] shadow-2xl border border-neutral-200 overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-5 border-b border-neutral-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, tailoring, leather accessories, fabrics..."
              className="w-full bg-transparent text-base sm:text-lg text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-neutral-400 hover:text-neutral-900 p-1"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-900 ml-2"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestion Pills when empty */}
          {!query.trim() && (
            <div className="p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                Suggested Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Linen Blazer', 'Cashmere Coat', 'Leather Tote', 'Silk Dress', 'Derby Shoes', 'Kurashiki Denim'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors font-medium"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>

              <div className="mt-8">
                <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                  Explore by Category
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCategory(c.slug)}
                      className="p-3 text-left border border-neutral-200 bg-white hover:border-neutral-900 transition-colors flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-neutral-900">
                        {c.name}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() && (
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="text-xs uppercase tracking-wider text-neutral-400 mb-4 font-mono">
                Matching items ({filteredProducts.length})
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="font-serif-luxury text-lg text-neutral-700">
                    No results found for "{query}"
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Try checking for spelling or searching by category, material, or color.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="p-3 bg-white border border-neutral-200 hover:border-neutral-900 cursor-pointer flex gap-3 transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover bg-neutral-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                            {product.brand} · {product.category}
                          </div>
                          <h4 className="text-xs font-medium text-neutral-900 line-clamp-1 mt-0.5">
                            {product.name}
                          </h4>
                        </div>
                        <div className="font-mono text-xs font-semibold tabular-nums text-neutral-900">
                          {formatPrice(product.salePrice ?? product.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
