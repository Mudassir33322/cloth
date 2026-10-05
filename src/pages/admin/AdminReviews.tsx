import React from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageSquare, Check, X, Trash2, Star } from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview, products } = useStore();

  const getProductName = (productId: string) => {
    const p = products.find((prod) => prod.id === productId);
    return p ? p.name : 'Unknown Garment';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Patron Reviews Moderation
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Audit testimonials, approve verified comments, and moderate feedback before public display.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-4 py-2 border border-neutral-800">
          Total Reviews: <strong className="text-white">{reviews.length}</strong>
        </div>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-500 uppercase tracking-wider font-mono">
              <th className="py-3 px-4">Patron</th>
              <th className="py-3 px-3">Garment</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3">Commentary</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-neutral-900/60 transition-colors">
                <td className="py-3.5 px-4 font-sans font-medium text-white">
                  {rev.customerName}
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-400 block font-mono">Verified</span>
                  )}
                </td>
                <td className="py-3.5 px-3 font-sans text-neutral-200 max-w-[160px] truncate">
                  {getProductName(rev.productId)}
                </td>
                <td className="py-3.5 px-3 text-amber-400">
                  {'★'.repeat(rev.rating)}
                </td>
                <td className="py-3.5 px-3 font-sans text-neutral-300 max-w-xs line-clamp-2">
                  "{rev.comment}"
                </td>
                <td className="py-3.5 px-3 text-neutral-400">{rev.date}</td>
                <td className="py-3.5 px-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-sans ${
                      rev.status === 'approved'
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                        : rev.status === 'rejected'
                        ? 'text-rose-400 bg-rose-950/60 border border-rose-800'
                        : 'text-amber-400 bg-amber-950/60 border border-amber-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-neutral-400">
                    {rev.status !== 'approved' && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, 'approved')}
                        className="px-2 py-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-[11px] uppercase font-sans font-medium"
                        title="Approve"
                      >
                        Approve
                      </button>
                    )}
                    {rev.status !== 'rejected' && (
                      <button
                        onClick={() => updateReviewStatus(rev.id, 'rejected')}
                        className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] uppercase font-sans font-medium"
                        title="Reject"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(rev.id)}
                      className="p-1 hover:text-rose-400"
                      title="Delete"
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
    </div>
  );
};
