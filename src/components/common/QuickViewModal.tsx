import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigate,
  } = useStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const activeSize = selectedSize || product.sizes[0] || 'One Size';

  const handleAddToCart = () => {
    addToCart(product, activeSize, activeColor, quantity);
    setQuickViewProduct(null);
  };

  const handleFullDetail = () => {
    setQuickViewProduct(null);
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
        <div className="bg-[#faf9f6] w-full max-w-4xl shadow-2xl border border-neutral-200 overflow-hidden relative">
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-neutral-900 bg-white/80 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="bg-[#f2efe9] relative aspect-[3/4] md:aspect-auto">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-12 h-16 border overflow-hidden ${
                        activeImageIndex === i ? 'border-neutral-950 ring-1 ring-neutral-950' : 'border-white/80 opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                  {product.brand} · {product.category}
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-serif-luxury font-medium text-neutral-900">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono text-xl font-semibold tabular-nums text-neutral-950">
                    {formatPrice(product.salePrice ?? product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="font-mono text-sm text-neutral-400 line-through tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {product.shortDescription || product.description}
                </p>

                {/* Color Selector */}
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-neutral-700 font-medium">
                    Color: <span className="text-neutral-900">{activeColor.name}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIndex(i)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColorIndex === i ? 'border-neutral-950 scale-110' : 'border-transparent'
                        }`}
                        style={{ padding: '2px' }}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="text-xs uppercase tracking-wider text-neutral-700 font-medium">
                    Select Size
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-1.5 text-xs font-mono border transition-colors ${
                          activeSize === s
                            ? 'border-neutral-950 bg-neutral-950 text-white'
                            : 'border-neutral-300 text-neutral-800 hover:border-neutral-900'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-5 flex items-center gap-3">
                  <div className="text-xs uppercase tracking-wider text-neutral-700 font-medium">
                    Quantity:
                  </div>
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-mono font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-2.5 py-1 text-xs text-neutral-600 hover:text-neutral-900"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-2.5 pt-4 border-t border-neutral-200">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 border border-neutral-300 hover:border-neutral-900 text-neutral-700 transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorited ? 'fill-current text-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleFullDetail}
                  className="w-full text-center text-xs text-neutral-600 hover:text-neutral-950 underline underline-offset-4 py-1"
                >
                  View Full Product Details & Sizing Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
