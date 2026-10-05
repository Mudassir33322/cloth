import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigate,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCart,
    formatPrice,
  } = useStore();

  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorited = isInWishlist(product.id);
  const displayImage =
    !imageError && product.images && product.images.length > 0
      ? product.images[currentImageIndex] || product.images[0]
      : '/assets/images/product_linen_blazer_1791148253001.jpg';

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', product.colors[0] || { name: 'Standard', hex: '#000000' });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Image Showcase Container */}
      <div
        className="relative w-full aspect-[3/4] bg-[#f4f2ee] overflow-hidden"
        onMouseEnter={() => {
          if (product.images && product.images.length > 1) {
            setCurrentImageIndex(1);
          }
        }}
        onMouseLeave={() => {
          setCurrentImageIndex(0);
        }}
      >
        <img
          src={displayImage}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Quiet Editorial Tag (NO PILLS) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.onSale && (
            <span className="text-[11px] font-medium tracking-widest uppercase text-rose-700 bg-white/90 backdrop-blur-xs px-2 py-0.5">
              Sale
            </span>
          )}
          {product.isNewArrival && !product.onSale && (
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-900 bg-white/90 backdrop-blur-xs px-2 py-0.5">
              New
            </span>
          )}
          {product.stock <= product.lowStockThreshold && product.stock > 0 && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-amber-800 bg-amber-50/90 px-1.5 py-0.5">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFavorited
              ? 'bg-neutral-900 text-white'
              : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-neutral-950'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-400' : ''}`} />
        </button>

        {/* Quick Action Overlay (Bottom Reveal) */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-neutral-950/70 via-neutral-950/30 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-between gap-2 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
          <button
            onClick={handleQuickView}
            className="p-2 bg-neutral-900/80 hover:bg-neutral-900 text-white transition-colors"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-3.5 flex flex-col flex-1">
        {/* Unboxed Metadata (Rule: No pill enclosures, use · separator) */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-500 font-medium">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1 text-sm font-medium text-neutral-900 leading-snug line-clamp-1 group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>

        {/* Price & Rating */}
        <div className="mt-1.5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2 font-mono tabular-nums text-sm">
            {product.salePrice ? (
              <>
                <span className="font-semibold text-rose-700">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-neutral-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Clean rating display */}
          <div className="flex items-center gap-1 text-xs text-neutral-500 font-mono tabular-nums">
            <span className="text-amber-500">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-neutral-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Subtle Color Swatches Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-neutral-300 shadow-2xs"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-neutral-400 font-normal ml-1">
              {product.colors.length} shades
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
