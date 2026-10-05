import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, CategoryType } from '../../types';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  X,
  Check,
  Image as ImageIcon
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    formatPrice,
    navigate,
    showToast,
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('VELORA Studio');
  const [category, setCategory] = useState<CategoryType>('women');
  const [subcategory, setSubcategory] = useState('Tailoring');
  const [price, setPrice] = useState(250);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [costPrice, setCostPrice] = useState<number | undefined>(90);
  const [stock, setStock] = useState(20);
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [materials, setMaterials] = useState('100% Virgin Wool');
  const [careInstructions, setCareInstructions] = useState('Specialist Dry Clean Only');
  const [fit, setFit] = useState('Relaxed architectural drape');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [onSale, setOnSale] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`VEL-${Math.floor(100 + Math.random() * 900)}`);
    setBrand('VELORA Studio');
    setCategory('women');
    setSubcategory('Atelier Capsule');
    setPrice(285);
    setSalePrice(undefined);
    setCostPrice(95);
    setStock(18);
    setLowStockThreshold(4);
    setDescription('Crafted from organic Italian fibers with structured tailoring.');
    setShortDescription('Italian tailored garment with bespoke natural finishing.');
    setMaterials('100% Italian Fresco Wool. Lining: Cupro Silk.');
    setCareInstructions('Specialist Dry Clean Only.');
    setFit('Tailored contemporary silhouette.');
    setImageUrl('/assets/images/product_linen_blazer_1791148253001.jpg');
    setIsFeatured(false);
    setIsNewArrival(true);
    setOnSale(false);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSku(product.sku);
    setBrand(product.brand);
    setCategory(product.category);
    setSubcategory(product.subcategory);
    setPrice(product.price);
    setSalePrice(product.salePrice);
    setCostPrice(product.costPrice || 90);
    setStock(product.stock);
    setLowStockThreshold(product.lowStockThreshold);
    setDescription(product.description);
    setShortDescription(product.shortDescription);
    setMaterials(product.materials);
    setCareInstructions(product.careInstructions);
    setFit(product.fit);
    setImageUrl(product.images[0] || '');
    setIsFeatured(!!product.isFeatured);
    setIsNewArrival(!!product.isNewArrival);
    setOnSale(!!product.onSale);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku) {
      showToast('Please provide garment title and SKU.', 'error');
      return;
    }

    const payload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku,
      brand,
      category,
      subcategory,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      costPrice: costPrice ? Number(costPrice) : undefined,
      stock: Number(stock),
      lowStockThreshold: Number(lowStockThreshold),
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      description,
      shortDescription,
      materials,
      careInstructions,
      fit,
      images: [imageUrl || '/assets/images/product_linen_blazer_1791148253001.jpg'],
      colors: editingProduct ? editingProduct.colors : [{ name: 'Classic Noir', hex: '#141416' }],
      sizes: editingProduct ? editingProduct.sizes : ['S', 'M', 'L'],
      isFeatured,
      isNewArrival,
      isTrending: editingProduct ? editingProduct.isTrending : false,
      onSale,
      status: 'published' as const,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setModalOpen(false);
  };

  const handleDuplicate = (product: Product) => {
    const { id, createdAt, ...rest } = product;
    addProduct({
      ...rest,
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-CPY`,
      slug: `${product.slug}-copy-${Date.now()}`,
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'all' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [products, search, selectedCat]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Garments & Product Management
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Maintain the atelier catalog, manage pricing variants, and monitor allocations.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Garment</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs">
        <div className="flex items-center gap-3 w-full sm:w-80 bg-neutral-900 border border-neutral-700 px-3 py-2">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, or brand..."
            className="w-full bg-transparent text-neutral-200 placeholder-neutral-500 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-neutral-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-neutral-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 text-neutral-200 py-1.5 px-3 uppercase text-xs font-mono cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="font-mono text-neutral-400 ml-2">
            ({filteredProducts.length} items)
          </span>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
              <th className="py-3 px-4">Garment</th>
              <th className="py-3 px-3">SKU</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Price</th>
              <th className="py-3 px-3">Stock Allocation</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-neutral-900/60 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-10 h-12 object-cover bg-neutral-800 shrink-0"
                    />
                    <div>
                      <div className="font-sans font-medium text-neutral-100 text-xs line-clamp-1 max-w-[220px]">
                        {product.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-sans">
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 text-neutral-400">{product.sku}</td>
                <td className="py-3 px-3 uppercase text-[11px] text-neutral-300">
                  {product.category}
                </td>
                <td className="py-3 px-3 font-bold tabular-nums text-white">
                  {formatPrice(product.salePrice ?? product.price)}
                  {product.salePrice && (
                    <span className="text-[10px] text-rose-400 block line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-3 tabular-nums">
                  <span
                    className={`font-semibold ${
                      product.stock <= product.lowStockThreshold
                        ? 'text-amber-400'
                        : 'text-neutral-200'
                    }`}
                  >
                    {product.stock} units
                  </span>
                  {product.stock <= product.lowStockThreshold && (
                    <span className="text-[10px] text-amber-500 block">Low stock</span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5">
                    {product.onSale && (
                      <span className="text-[10px] uppercase font-sans text-rose-400 bg-rose-950/60 px-1.5 py-0.5 border border-rose-800">
                        Sale
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="text-[10px] uppercase font-sans text-amber-300 bg-amber-950/60 px-1.5 py-0.5 border border-amber-800">
                        New
                      </span>
                    )}
                    <span className="text-[10px] text-emerald-400">Published</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-neutral-400">
                    <button
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="p-1 hover:text-white"
                      title="View on Storefront"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1 hover:text-amber-300"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(product)}
                      className="p-1 hover:text-white"
                      title="Duplicate Product"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1 hover:text-rose-400"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-3xl shadow-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <h2 className="font-serif-luxury text-xl font-normal text-white">
                  {editingProduct ? 'Edit Atelier Garment' : 'Publish New Atelier Garment'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-6 space-y-5 text-xs">
                {/* Basic Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Garment Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tailored Linen-Blend Atelier Blazer"
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Brand / Line
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="accessories">Accessories</option>
                      <option value="shoes">Shoes</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-800">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Retail Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Sale Price ($)
                    </label>
                    <input
                      type="number"
                      value={salePrice || ''}
                      onChange={(e) =>
                        setSalePrice(e.target.value ? Number(e.target.value) : undefined)
                      }
                      placeholder="Optional"
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Stock Count *
                    </label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Low Stock Alert
                    </label>
                    <input
                      type="number"
                      value={lowStockThreshold}
                      onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Media URL */}
                <div className="pt-4 border-t border-neutral-800">
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Primary Image URL
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image asset path or URL..."
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                  />
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Short Overview
                    </label>
                    <textarea
                      rows={2}
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-neutral-800 text-neutral-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Featured on Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNewArrival}
                      onChange={(e) => setIsNewArrival(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>New Arrival Badge</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onSale}
                      onChange={(e) => setOnSale(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Archival Privilege (Sale)</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-neutral-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-400 text-neutral-950 font-semibold uppercase tracking-wider hover:bg-amber-300"
                  >
                    {editingProduct ? 'Save Product Updates' : 'Publish to Storefront'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
