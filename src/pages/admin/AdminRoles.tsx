import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, UserCheck, Check, X } from 'lucide-react';
import { AdminUser } from '../../types';

export const AdminRoles: React.FC = () => {
  const { currentAdmin, switchAdminRole, showToast } = useStore();

  const roles = [
    {
      id: 'super_admin' as AdminUser['role'],
      title: 'Super Admin (Maison Executive)',
      desc: 'Unrestricted full access across financial records, CMS, user roles, catalog, and inventory allocation.',
      permissions: {
        catalog: true,
        orders: true,
        inventory: true,
        cms: true,
        finance: true,
        settings: true,
      },
    },
    {
      id: 'store_manager' as AdminUser['role'],
      title: 'Store & Inventory Manager',
      desc: 'Full control over products, categories, suppliers, stock adjustments, and customer dispatch.',
      permissions: {
        catalog: true,
        orders: true,
        inventory: true,
        cms: false,
        finance: true,
        settings: false,
      },
    },
    {
      id: 'order_manager' as AdminUser['role'],
      title: 'Fulfillment & Courier Coordinator',
      desc: 'Process orders, print invoices, update courier tracking numbers, and handle customer return workflows.',
      permissions: {
        catalog: false,
        orders: true,
        inventory: true,
        cms: false,
        finance: false,
        settings: false,
      },
    },
    {
      id: 'content_manager' as AdminUser['role'],
      title: 'Atelier Creative & CMS Director',
      desc: 'Curate lookbook campaigns, update homepage hero banners, promotional countdowns, and media vault.',
      permissions: {
        catalog: true,
        orders: false,
        inventory: false,
        cms: true,
        finance: false,
        settings: false,
      },
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal">
            Roles & Access Governance (RBAC)
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Enterprise role-based security controlling module permissions for staff and ateliers.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-4 py-2 border border-neutral-800">
          Active Role: <strong className="text-amber-300 uppercase">{currentAdmin?.role.replace('_', ' ')}</strong>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-neutral-800 text-neutral-400 uppercase">
              <th className="py-3 px-4">Role Title</th>
              <th className="py-3 px-3 text-center">Catalog</th>
              <th className="py-3 px-3 text-center">Orders</th>
              <th className="py-3 px-3 text-center">Inventory</th>
              <th className="py-3 px-3 text-center">CMS Editor</th>
              <th className="py-3 px-3 text-center">Financials</th>
              <th className="py-3 px-3 text-center">System Settings</th>
              <th className="py-3 px-4 text-right">Switch Active Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 text-neutral-300">
            {roles.map((r) => {
              const isCurrent = currentAdmin?.role === r.id;
              return (
                <tr key={r.id} className={isCurrent ? 'bg-neutral-900/80' : 'hover:bg-neutral-900/40'}>
                  <td className="py-4 px-4 font-sans font-medium text-white">
                    <div>{r.title}</div>
                    <div className="text-[11px] text-neutral-500 font-sans font-light mt-0.5">
                      {r.desc}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.catalog ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.orders ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.inventory ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.cms ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.finance ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-3 text-center">
                    {r.permissions.settings ? <Check className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-neutral-600 mx-auto" />}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {isCurrent ? (
                      <span className="px-3 py-1 bg-amber-400 text-neutral-950 font-bold uppercase text-[10px] inline-block font-sans">
                        Active Role
                      </span>
                    ) : (
                      <button
                        onClick={() => switchAdminRole(r.id)}
                        className="px-3 py-1 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-[10px] uppercase font-sans hover:text-white"
                      >
                        Simulate Role
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
