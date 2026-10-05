import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../../components/common/ProductCard';
import { ArrowRight, Sparkles, Shield, Clock, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { cms, products, categories, reviews, navigate } = useStore();

  // Simple countdown timer for Promotional Banner
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival || p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending || p.onSale).slice(0, 4);
  const approvedReviews = reviews.filter((r) => r.status === 'approved').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (Controlled via CMS) */}
      {cms.hero.showSection && (
        <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#f2efe9] overflow-hidden flex items-center">
          {/* Background Image with subtle gradient scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src={cms.hero.image || '/assets/images/hero_fashion_editorial_1791148216465.jpg'}
              alt="Editorial fashion campaign"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-white">
            <div className="max-w-2xl">
              {/* Quiet Kicker (No Pill) */}
              <div className="text-xs uppercase tracking-[0.3em] font-medium text-amber-200 mb-4 flex items-center gap-2">
                <span>{cms.hero.badge}</span>
                <span aria-hidden="true">·</span>
                <span>BESPOKE EDITIONS</span>
              </div>

              {/* Title */}
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-balance">
                {cms.hero.headline}
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-lg">
                {cms.hero.subheadline}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigate(cms.hero.primaryCtaLink)}
                  className="px-8 py-4 bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{cms.hero.primaryCtaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigate(cms.hero.secondaryCtaLink)}
                  className="px-8 py-4 bg-neutral-900/60 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-neutral-950 text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center"
                >
                  {cms.hero.secondaryCtaText}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Shop By Category Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Curated Worlds
            </div>
            <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-950">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1.5"
          >
            <span>View All Garments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.filter((c) => c.featured).slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.slug}`)}
              className="group relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute(
                    'src',
                    '/assets/images/category_women_editorial_1791148280765.jpg'
                  );
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-mono">
                  {cat.itemCount} Pieces
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium tracking-wide mt-0.5">
                  {cat.name}
                </h3>
                <span className="mt-2 text-[11px] uppercase tracking-wider text-amber-200 font-medium flex items-center gap-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Carousel / Grid */}
      <section className="bg-white py-20 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                Season Debut
              </div>
              <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-950">
                New Arrivals
              </h2>
            </div>
            <button
              onClick={() => navigate('/category/new-arrivals')}
              className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1.5"
            >
              <span>Explore All Debut Drops</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Collection Editorial Spotlight (CMS Controlled) */}
      {cms.featuredCollection.showSection && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f5f3ef] border border-neutral-200/90 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:h-[550px] relative overflow-hidden">
                <img
                  src={
                    cms.featuredCollection.image ||
                    '/assets/images/collection_autumn_minimal_1791148236983.jpg'
                  }
                  alt={cms.featuredCollection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold mb-2">
                  {cms.featuredCollection.subtitle}
                </div>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-neutral-950 font-normal leading-tight">
                  {cms.featuredCollection.title}
                </h3>
                <p className="mt-5 text-sm text-neutral-600 font-light leading-relaxed">
                  {cms.featuredCollection.description}
                </p>

                <div className="mt-8">
                  <button
                    onClick={() => navigate(cms.featuredCollection.ctaLink)}
                    className="px-8 py-3.5 bg-neutral-950 text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium transition-colors inline-flex items-center gap-2"
                  >
                    <span>{cms.featuredCollection.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Trending Pieces */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-neutral-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Wardrobe Signatures
            </div>
            <h2 className="mt-1 font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-950">
              Trending Tailoring
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 sm:mt-0 text-xs uppercase tracking-wider font-semibold text-neutral-900 hover:text-neutral-600 transition-colors flex items-center gap-1.5"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Promotional Countdown Banner (CMS Controlled) */}
      {cms.promotionalBanner.showSection && (
        <section className="bg-neutral-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-neutral-900">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-medium">
              {cms.promotionalBanner.tag}
            </span>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-5xl font-light">
              {cms.promotionalBanner.headline}
            </h2>
            <div className="mt-3 text-xl sm:text-2xl font-mono text-rose-400 font-medium tracking-wide">
              {cms.promotionalBanner.discountHighlight}
            </div>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              {cms.promotionalBanner.description}
            </p>

            {/* Countdown Matrix */}
            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6 font-mono">
              <div className="p-3 bg-neutral-900 border border-neutral-800 min-w-[70px]">
                <div className="text-2xl font-semibold tabular-nums text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase text-neutral-400 font-sans mt-0.5">
                  Days
                </div>
              </div>
              <span className="text-neutral-500 font-bold">:</span>
              <div className="p-3 bg-neutral-900 border border-neutral-800 min-w-[70px]">
                <div className="text-2xl font-semibold tabular-nums text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase text-neutral-400 font-sans mt-0.5">
                  Hours
                </div>
              </div>
              <span className="text-neutral-500 font-bold">:</span>
              <div className="p-3 bg-neutral-900 border border-neutral-800 min-w-[70px]">
                <div className="text-2xl font-semibold tabular-nums text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase text-neutral-400 font-sans mt-0.5">
                  Mins
                </div>
              </div>
              <span className="text-neutral-500 font-bold">:</span>
              <div className="p-3 bg-neutral-900 border border-neutral-800 min-w-[70px]">
                <div className="text-2xl font-semibold tabular-nums text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] uppercase text-neutral-400 font-sans mt-0.5">
                  Secs
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={() => navigate(cms.promotionalBanner.ctaLink)}
                className="px-8 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>{cms.promotionalBanner.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 7. Brand Story & Craftsmanship Stat Section (CMS Controlled) */}
      {cms.brandStory.showSection && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
              Atelier Philosophy
            </span>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-normal text-neutral-950 leading-tight">
              {cms.brandStory.title}
            </h2>
            <blockquote className="mt-6 font-serif-luxury italic text-lg sm:text-xl text-neutral-700 leading-relaxed">
              {cms.brandStory.quote}
            </blockquote>
            <p className="mt-6 text-sm text-neutral-600 leading-relaxed font-light">
              {cms.brandStory.body}
            </p>
          </div>

          {/* Precision Quantitative Rigor Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-neutral-200 py-10">
            <div className="text-center px-4">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-neutral-950 tabular-nums">
                {cms.brandStory.stat1Number}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {cms.brandStory.stat1Label}
              </div>
            </div>
            <div className="text-center px-4 md:border-x border-neutral-200">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-neutral-950 tabular-nums">
                {cms.brandStory.stat2Number}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {cms.brandStory.stat2Label}
              </div>
            </div>
            <div className="text-center px-4">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-neutral-950 tabular-nums">
                {cms.brandStory.stat3Number}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {cms.brandStory.stat3Label}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Customer Reviews & Social Proof */}
      <section className="bg-[#f7f5f0] py-20 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Client Testimonials
            </div>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-normal text-neutral-950">
              Voices of Distinction
            </h2>
            <p className="mt-2 text-xs text-neutral-500">
              Verified feedback from discerning patrons worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 border border-neutral-200 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light italic">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {rev.customerName}
                    </div>
                    {rev.verified && (
                      <span className="text-[11px] text-emerald-700 font-medium">
                        Verified Patron
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-neutral-400 text-[11px]">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Lookbook Editorial Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Visual Chronicles
          </div>
          <h2 className="mt-1 font-serif-luxury text-3xl text-neutral-950 font-normal">
            #VELORAAesthetics
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Tagged by our global collective across New York, Paris, Tokyo, and Milan.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            '/assets/images/hero_fashion_editorial_1791148216465.jpg',
            '/assets/images/category_women_editorial_1791148280765.jpg',
            '/assets/images/collection_autumn_minimal_1791148236983.jpg',
            '/assets/images/product_linen_blazer_1791148253001.jpg',
          ].map((src, i) => (
            <div key={i} className="aspect-square bg-neutral-200 overflow-hidden relative group">
              <img
                src={src}
                alt="Instagram lookbook"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                @velorastudio
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
