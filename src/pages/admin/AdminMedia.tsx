import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Image as ImageIcon, Upload, Copy, Check, Trash2, Eye } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { showToast } = useStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const mediaAssets = [
    { name: 'hero_fashion_editorial.jpg', url: '/src/assets/images/hero_fashion_editorial_1791148216465.jpg', size: '1.4 MB', dim: '1920x1080', tag: 'Hero / Banner' },
    { name: 'collection_autumn_minimal.jpg', url: '/src/assets/images/collection_autumn_minimal_1791148236983.jpg', size: '920 KB', dim: '1440x1080', tag: 'Lookbook' },
    { name: 'product_linen_blazer.jpg', url: '/src/assets/images/product_linen_blazer_1791148253001.jpg', size: '780 KB', dim: '1080x1440', tag: 'Product Studio' },
    { name: 'product_leather_bag.jpg', url: '/src/assets/images/product_leather_bag_1791148267291.jpg', size: '840 KB', dim: '1440x1080', tag: 'Accessories' },
    { name: 'category_women_editorial.jpg', url: '/src/assets/images/category_women_editorial_1791148280765.jpg', size: '1.1 MB', dim: '1080x1440', tag: 'Category' },
  ];

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard?.writeText(url);
    setCopiedIndex(index);
    showToast('Asset URI copied to clipboard.');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Atelier Visual Assets & Media Vault
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Centrally manage high-resolution lookbook photography, studio product stills, and promotional graphics.
          </p>
        </div>

        <button
          onClick={() => showToast('Image upload simulator: select any local image to add to library.')}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Media Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaAssets.map((asset, i) => (
          <div
            key={i}
            className="bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between group"
          >
            <div className="aspect-[3/4] relative bg-neutral-900 overflow-hidden">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 text-[9px] font-mono uppercase bg-neutral-950/80 text-white px-1.5 py-0.5 border border-neutral-700">
                {asset.tag}
              </span>
            </div>

            <div className="p-3">
              <div className="font-mono text-xs text-white truncate" title={asset.name}>
                {asset.name}
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                <span>{asset.dim}</span>
                <span>{asset.size}</span>
              </div>

              <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleCopy(asset.url, i)}
                  className="text-xs text-amber-300 hover:text-white flex items-center gap-1 font-mono"
                >
                  {copiedIndex === i ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
