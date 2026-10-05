import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/common/ProductCard';
import { SizeGuideModal } from '../../components/common/SizeGuideModal';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  Ruler,
  ChevronDown,
  Star,
  Check,
  ArrowRight,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const {
    products,
    getProductBySlug,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigate,
    reviews,
    addReview,
    showToast,
  } = useStore();

  const product = getProductBySlug(slug) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>('description');
  const [zoomModalOpen, setZoomModalOpen] = useState(false);

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="font-serif-luxury text-2xl text-neutral-800">
          Garment Not Found
        </h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-wider"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const activeColor = product.colors[selectedColorIndex] || product.colors[0];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');

  const handleAddToCart = () => {
    addToCart(product, selectedSize, activeColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, activeColor, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review remarks.', 'error');
      return;
    }
    addReview({
      productId: product.id,
      customerName: reviewerName,
      rating: reviewRating,
      comment: reviewComment,
      verified: true,
    });
    setReviewerName('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-neutral-900 transition-colors">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-neutral-900 transition-colors">
          Shop
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(`/category/${product.category}`)}
          className="hover:text-neutral-900 transition-colors"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column: Gallery & Thumbnails */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 bg-neutral-100 overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-neutral-950 opacity-100 ring-1 ring-neutral-950'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Large Main Showcase Image */}
          <div className="relative flex-1 aspect-[3/4] bg-[#f4f2ee] overflow-hidden group">
            <img
              src={
                product.images[activeImageIndex] ||
                '/assets/images/product_linen_blazer_1791148253001.jpg'
              }
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out cursor-zoom-in group-hover:scale-105"
              onClick={() => setZoomModalOpen(true)}
            />

            <button
              onClick={() => setZoomModalOpen(true)}
              className="absolute bottom-4 right-4 p-2 bg-white/80 hover:bg-white text-neutral-900 backdrop-blur-xs transition-colors"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {product.onSale && (
              <span className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase text-rose-700 bg-white/95 px-2.5 py-1">
                Archival Privilege
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          {/* Brand & Category Unboxed Header */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-medium">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>SKU: {product.sku}</span>
          </div>

          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl text-neutral-950 font-normal leading-tight">
            {product.name}
          </h1>

          {/* Rating summary */}
          <div className="mt-2.5 flex items-center gap-3 text-xs">
            <div className="flex items-center text-amber-500 font-mono">
              {'★'.repeat(Math.round(product.rating))}
              <span className="text-neutral-400 font-mono ml-1 text-neutral-900 font-semibold">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-neutral-300">|</span>
            <a
              href="#reviews-section"
              className="text-neutral-500 underline underline-offset-4 hover:text-neutral-900"
            >
              {product.reviewCount} Patron Reviews
            </a>
          </div>

          {/* Price Block */}
          <div className="mt-5 flex items-baseline gap-3 border-y border-neutral-200/80 py-4">
            <span className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-neutral-950">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <>
                <span className="font-mono text-sm text-neutral-400 line-through tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs uppercase tracking-wider text-rose-700 font-semibold bg-rose-50 px-2 py-0.5">
                  Save {formatPrice(product.price - product.salePrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock Indicator */}
          <div className="mt-4 flex items-center gap-2 text-xs font-medium">
            {product.stock <= 0 ? (
              <span className="text-rose-700 font-semibold">Out of Stock — Bespoke order upon request</span>
            ) : product.stock <= product.lowStockThreshold ? (
              <span className="text-amber-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Only {product.stock} units remaining in atelier allocation
              </span>
            ) : (
              <span className="text-emerald-700 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                In Stock & Ready for Dispatch
              </span>
            )}
          </div>

          {/* Color Selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-neutral-600 font-medium">
                Color Palette: <strong className="text-neutral-900">{activeColor.name}</strong>
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColorIndex(idx)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColorIndex === idx
                      ? 'border-neutral-950 scale-110 ring-1 ring-neutral-950'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ padding: '2px' }}
                  title={c.name}
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
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-neutral-600 font-medium">
                Select Size: <strong className="text-neutral-900">{selectedSize}</strong>
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-neutral-900 underline underline-offset-4 font-medium flex items-center gap-1 hover:text-neutral-600 transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 text-xs font-mono border transition-all ${
                    selectedSize === s
                      ? 'border-neutral-950 bg-neutral-950 text-white font-semibold'
                      : 'border-neutral-300 text-neutral-800 hover:border-neutral-950 bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Primary Buy CTAs */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-300 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2.5 text-xs text-neutral-600 hover:text-neutral-950"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-2.5 text-xs font-mono font-medium text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2.5 text-xs text-neutral-600 hover:text-neutral-950"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-3 px-6 bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-300 text-white text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border transition-colors ${
                  isFavorited
                    ? 'border-neutral-950 bg-neutral-950 text-white'
                    : 'border-neutral-300 hover:border-neutral-950 text-neutral-700 bg-white'
                }`}
                aria-label="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-400' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-neutral-950 border border-amber-200 text-xs font-semibold tracking-widest uppercase transition-colors"
            >
              Instant Checkout — Buy Now
            </button>
          </div>

          {/* Confidence Markers */}
          <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-2 gap-4 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Complimentary shipping over $200</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>30-day complimentary returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Guaranteed authentic atelier craft</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Signature luxury gift packaging</span>
            </div>
          </div>

          {/* Accordion Modules */}
          <div className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200 text-xs">
            {/* Description */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full flex items-center justify-between text-left font-medium uppercase tracking-wider text-neutral-900 py-1"
              >
                <span>Editorial Description</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === 'description' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'description' && (
                <div className="mt-2 text-neutral-600 leading-relaxed font-light">
                  {product.description}
                </div>
              )}
            </div>

            {/* Materials & Care */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('materials')}
                className="w-full flex items-center justify-between text-left font-medium uppercase tracking-wider text-neutral-900 py-1"
              >
                <span>Artisanal Composition & Care</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === 'materials' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'materials' && (
                <div className="mt-2 space-y-2 text-neutral-600 leading-relaxed font-light">
                  <p>
                    <strong className="text-neutral-900 font-medium">Composition:</strong>{' '}
                    {product.materials}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">Care Protocol:</strong>{' '}
                    {product.careInstructions}
                  </p>
                  <p>
                    <strong className="text-neutral-900 font-medium">Fit Note:</strong>{' '}
                    {product.fit}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between text-left font-medium uppercase tracking-wider text-neutral-900 py-1"
              >
                <span>Shipping & Atelier Fulfillment</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeAccordion === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeAccordion === 'shipping' && (
                <div className="mt-2 text-neutral-600 leading-relaxed font-light space-y-1.5">
                  <p>• Standard Courier (3–5 business days): $15 or complimentary on orders over $200.</p>
                  <p>• White-Glove Express (1–2 business days): $35.</p>
                  <p>• Every piece is wrapped in archival acid-free tissue and encased in a VELORA rigid gift box.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="mt-24 pt-16 border-t border-neutral-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Verified Patron Testimonials
            </div>
            <h2 className="mt-1 font-serif-luxury text-3xl font-normal text-neutral-950">
              Reviews & Impressions
            </h2>
          </div>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2.5 border border-neutral-900 text-neutral-950 hover:bg-neutral-950 hover:text-white text-xs uppercase tracking-wider font-medium transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Patron Review'}
          </button>
        </div>

        {/* Review Submission Form Drawer / Panel */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="mb-12 p-6 sm:p-8 bg-neutral-100 border border-neutral-300 max-w-2xl"
          >
            <h3 className="font-serif-luxury text-xl font-medium text-neutral-900 mb-4">
              Share Your Thoughts on this Garment
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. Eleanor Sterling"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2 text-lg text-amber-500 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`text-2xl transition-transform hover:scale-110 ${
                        reviewRating >= star ? 'text-amber-500' : 'text-neutral-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-mono text-neutral-600 ml-2">
                    ({reviewRating} out of 5 stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium uppercase tracking-wider text-neutral-700 mb-1">
                  Review Commentary
                </label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe the fabric feel, drape, sizing accuracy, and tailoring quality..."
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-neutral-950 text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors"
              >
                Submit Review for Moderation
              </button>
            </div>
          </form>
        )}

        {/* Existing Reviews */}
        {productReviews.length === 0 ? (
          <div className="py-8 text-neutral-500 text-xs italic">
            Be the debut patron to review the {product.name}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-500 font-mono text-sm">
                      {'★'.repeat(rev.rating)}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {rev.date}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-light italic">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-900">
                    {rev.customerName}
                  </span>
                  {rev.verified && (
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <section className="mt-24 pt-16 border-t border-neutral-200">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Complete the Ensemble
              </div>
              <h2 className="mt-1 font-serif-luxury text-3xl font-normal text-neutral-950">
                Curated Companions
              </h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1.5"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Image Zoom Lightbox Modal */}
      {zoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomModalOpen(false)}
        >
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
