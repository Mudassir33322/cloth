import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';
import { Plus, Edit2, Trash2, Layers, Check, X } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, showToast } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(true);

  const openAdd = () => {
    setEditingCat(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('/src/assets/images/category_women_editorial_1791148280765.jpg');
    setFeatured(true);
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImage(cat.image);
    setFeatured(cat.featured);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      image: image || '/src/assets/images/category_women_editorial_1791148280765.jpg',
      itemCount: editingCat ? editingCat.itemCount : 0,
      featured,
      status: 'active' as const,
      sortOrder: editingCat ? editingCat.sortOrder : categories.length + 1,
    };

    if (editingCat) {
      updateCategory(editingCat.id, payload);
    } else {
      addCategory(payload);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Collection Taxonomy & Categories
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Organize catalog structures, landing banners, and featured homepage hubs.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] relative bg-neutral-900 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-neutral-950/80 text-white px-2 py-0.5 border border-neutral-700">
                  {cat.itemCount} items
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-xl text-white font-medium">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-xs text-neutral-400">
                    /{cat.slug}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed font-light line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-400 font-mono">
                {cat.featured ? 'Featured on Home' : 'Catalog Only'}
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <button
                  onClick={() => openEdit(cat)}
                  className="p-1 hover:text-white"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1 hover:text-rose-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-xs"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative min-h-screen flex items-center justify-center p-4 z-50">
            <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md shadow-2xl p-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-serif-luxury text-xl font-normal text-white">
                  {editingCat ? 'Edit Category' : 'Create Category'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Auto-generated if left empty"
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Banner Image Path
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-400 mb-1">
                    Editorial Description
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-white"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="accent-amber-400"
                  />
                  <span>Display on Storefront Categories Grid</span>
                </label>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-neutral-700 text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider hover:bg-amber-300"
                  >
                    Save Category
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
