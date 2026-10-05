import React, { useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/common/ProductCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CategoryType } from '../../types';

interface CategoryPageProps {
  slug: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ slug }) => {
  const { categories, products, navigate } = useStore();

  const currentCategory = categories.find((c) => c.slug === slug);

  const categoryProducts = useMemo(() => {
    if (slug === 'new-arrivals') {
      return products.filter((p) => p.isNewArrival);
    }
    if (slug === 'sale') {
      return products.filter((p) => p.onSale);
    }
    return products.filter((p) => p.category === slug);
  }, [products, slug]);

  const title = currentCategory
    ? currentCategory.name
    : slug.replace('-', ' ').toUpperCase();

  const description = currentCategory
    ? currentCategory.description
    : `Explore our seasonal collection of ${title.toLowerCase()} tailored for enduring presence.`;

  return (
    <div className="min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative bg-[#f0ede6] border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <button
              onClick={() => navigate('/shop')}
              className="text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Collections</span>
            </button>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-neutral-950 font-normal">
              {title}
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {description}
            </p>
          </div>

          <div className="text-right font-mono text-xs text-neutral-500">
            <span className="font-semibold text-neutral-950 text-base tabular-nums">
              {categoryProducts.length}
            </span>{' '}
            Archival Pieces
          </div>
        </div>

        {/* Subtle background image accent if available */}
        {currentCategory?.image && (
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <img
              src={currentCategory.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif-luxury text-xl text-neutral-800">
              No garments currently available in {title}
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium"
            >
              Browse Full Atelier
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
