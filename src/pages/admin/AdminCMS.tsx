import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sliders, Save, Check, RefreshCw, Eye } from 'lucide-react';

export const AdminCMS: React.FC = () => {
  const { cms, updateCMS, showToast, navigate } = useStore();

  // Local editable copy of CMS state
  const [heroHeadline, setHeroHeadline] = useState(cms.hero.headline);
  const [heroSubheadline, setHeroSubheadline] = useState(cms.hero.subheadline);
  const [heroBadge, setHeroBadge] = useState(cms.hero.badge);
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState(cms.hero.primaryCtaText);
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState(cms.hero.secondaryCtaText);
  const [heroImage, setHeroImage] = useState(cms.hero.image);
  const [showHero, setShowHero] = useState(cms.hero.showSection);

  // Announcement
  const [announcementText, setAnnouncementText] = useState(cms.announcement.text);
  const [announcementLinkText, setAnnouncementLinkText] = useState(cms.announcement.linkText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(cms.announcement.isEnabled);

  // Featured Collection
  const [featTitle, setFeatTitle] = useState(cms.featuredCollection.title);
  const [featSubtitle, setFeatSubtitle] = useState(cms.featuredCollection.subtitle);
  const [featDesc, setFeatDesc] = useState(cms.featuredCollection.description);
  const [featImage, setFeatImage] = useState(cms.featuredCollection.image);
  const [showFeat, setShowFeat] = useState(cms.featuredCollection.showSection);

  // Promo Banner
  const [promoHeadline, setPromoHeadline] = useState(cms.promotionalBanner.headline);
  const [promoDiscount, setPromoDiscount] = useState(cms.promotionalBanner.discountHighlight);
  const [promoDesc, setPromoDesc] = useState(cms.promotionalBanner.description);
  const [showPromo, setShowPromo] = useState(cms.promotionalBanner.showSection);

  // Brand Story
  const [storyTitle, setStoryTitle] = useState(cms.brandStory.title);
  const [storyQuote, setStoryQuote] = useState(cms.brandStory.quote);
  const [stat1, setStat1] = useState(cms.brandStory.stat1Number);
  const [stat1Label, setStat1Label] = useState(cms.brandStory.stat1Label);
  const [stat2, setStat2] = useState(cms.brandStory.stat2Number);
  const [stat2Label, setStat2Label] = useState(cms.brandStory.stat2Label);

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateCMS({
      hero: {
        ...cms.hero,
        badge: heroBadge,
        headline: heroHeadline,
        subheadline: heroSubheadline,
        primaryCtaText: heroPrimaryCtaText,
        secondaryCtaText: heroSecondaryCtaText,
        image: heroImage,
        showSection: showHero,
      },
      announcement: {
        ...cms.announcement,
        text: announcementText,
        linkText: announcementLinkText,
        isEnabled: announcementEnabled,
      },
      featuredCollection: {
        ...cms.featuredCollection,
        title: featTitle,
        subtitle: featSubtitle,
        description: featDesc,
        image: featImage,
        showSection: showFeat,
      },
      promotionalBanner: {
        ...cms.promotionalBanner,
        headline: promoHeadline,
        discountHighlight: promoDiscount,
        description: promoDesc,
        showSection: showPromo,
      },
      brandStory: {
        ...cms.brandStory,
        title: storyTitle,
        quote: storyQuote,
        stat1Number: stat1,
        stat1Label: stat1Label,
        stat2Number: stat2,
        stat2Label: stat2Label,
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Storefront CMS & Layout Architecture
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Empower marketing teams to update copy, campaign hero banners, and promotional countdowns without developers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Storefront Live</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveCMS} className="space-y-8 text-xs">
        {/* Module 1: Top Announcement Bar */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                1. Top Announcement Strip
              </h3>
              <p className="text-neutral-500 text-[11px]">
                Prominently displayed above the main navigation bar.
              </p>
            </div>
            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Enable Announcement</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Announcement Copy
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Call-to-Action Link Text
              </label>
              <input
                type="text"
                value={announcementLinkText}
                onChange={(e) => setAnnouncementLinkText(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Module 2: Editorial Hero Section */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                2. Primary Editorial Hero Section
              </h3>
              <p className="text-neutral-500 text-[11px]">
                Full viewport campaign imagery and brand positioning.
              </p>
            </div>
            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showHero}
                onChange={(e) => setShowHero(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Display Section</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Season Badge / Kicker
              </label>
              <input
                type="text"
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white uppercase font-mono"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Hero Image Asset Path
              </label>
              <input
                type="text"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-serif-luxury text-base"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Subheadline
              </label>
              <textarea
                rows={2}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-sans"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Primary Button Label
              </label>
              <input
                type="text"
                value={heroPrimaryCtaText}
                onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={heroSecondaryCtaText}
                onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Module 3: Featured Capsule Spotlight */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                3. Curated Capsule Spotlight
              </h3>
              <p className="text-neutral-500 text-[11px]">
                Split-screen editorial feature for autumn/winter or spring collections.
              </p>
            </div>
            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeat}
                onChange={(e) => setShowFeat(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Display Section</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Capsule Title
              </label>
              <input
                type="text"
                value={featTitle}
                onChange={(e) => setFeatTitle(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Editorial Image
              </label>
              <input
                type="text"
                value={featImage}
                onChange={(e) => setFeatImage(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Capsule Story Prose
              </label>
              <textarea
                rows={2}
                value={featDesc}
                onChange={(e) => setFeatDesc(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Module 4: Promotional Countdown Banner */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                4. Archival Sale Countdown Banner
              </h3>
              <p className="text-neutral-500 text-[11px]">
                High-converting dark banner with live countdown clock.
              </p>
            </div>
            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showPromo}
                onChange={(e) => setShowPromo(e.target.checked)}
                className="accent-amber-400 w-4 h-4"
              />
              <span>Display Section</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Campaign Headline
              </label>
              <input
                type="text"
                value={promoHeadline}
                onChange={(e) => setPromoHeadline(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                Discount Highlight Badge
              </label>
              <input
                type="text"
                value={promoDiscount}
                onChange={(e) => setPromoDiscount(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono text-rose-400"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-30 p-4 bg-neutral-950/95 backdrop-blur-md border border-amber-400/40 flex items-center justify-between">
          <div className="text-xs text-neutral-300">
            All modifications will propagate to the storefront immediately upon commit.
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Publish CMS Changes Live</span>
          </button>
        </div>
      </form>
    </div>
  );
};
