import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  Archive,
  ShoppingCart,
  Users,
  TicketPercent,
  Sparkles,
  MessageSquare,
  Sliders,
  Image as ImageIcon,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  Check,
  X,
  LogOut,
  UserCheck
} from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminLayoutProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeModule,
  setActiveModule,
  children,
}) => {
  const {
    navigate,
    currentAdmin,
    switchAdminRole,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotificationsCount,
    settings,
  } = useStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifPopoverOpen, setNotifPopoverOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Core' },
    { id: 'products', label: 'Products', icon: Package, category: 'Catalog' },
    { id: 'categories', label: 'Categories', icon: Layers, category: 'Catalog' },
    { id: 'inventory', label: 'Inventory & Stock', icon: Archive, category: 'Catalog' },
    { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingCart, category: 'Commerce' },
    { id: 'customers', label: 'Customers', icon: Users, category: 'Commerce' },
    { id: 'coupons', label: 'Coupons & Discounts', icon: TicketPercent, category: 'Marketing' },
    { id: 'promotions', label: 'Promotions & Sales', icon: Sparkles, category: 'Marketing' },
    { id: 'reviews', label: 'Patron Reviews', icon: MessageSquare, category: 'Marketing' },
    { id: 'cms', label: 'Homepage CMS', icon: Sliders, category: 'Content' },
    { id: 'media', label: 'Media Library', icon: ImageIcon, category: 'Content' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, category: 'Insights' },
    { id: 'notifications', label: 'Notifications', icon: Bell, category: 'System', badge: unreadNotificationsCount },
    { id: 'settings', label: 'Store Settings', icon: Settings, category: 'System' },
    { id: 'roles', label: 'Roles & Access (RBAC)', icon: ShieldCheck, category: 'System' },
  ];

  const rolesList: AdminUser['role'][] = [
    'super_admin',
    'store_manager',
    'order_manager',
    'content_manager',
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col antialiased">
      {/* Top Bar */}
      <header className="h-14 bg-neutral-950 border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-xl tracking-[0.2em] font-medium text-white uppercase">
              VELORA
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider bg-neutral-800 text-amber-300 px-2 py-0.5 border border-neutral-700">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Quick Return to Storefront */}
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 transition-colors"
          >
            <span>View Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-2 text-xs bg-neutral-800/80 hover:bg-neutral-700 px-3 py-1.5 border border-neutral-700 text-neutral-200"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono uppercase text-[11px]">
                {currentAdmin?.role.replace('_', ' ')}
              </span>
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-700 shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-neutral-500 font-mono">
                  Switch Admin Role (Demo)
                </div>
                {rolesList.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchAdminRole(r);
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-neutral-800 ${
                      currentAdmin?.role === r ? 'text-amber-300 font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    <span className="capitalize">{r.replace('_', ' ')}</span>
                    {currentAdmin?.role === r && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifPopoverOpen(!notifPopoverOpen)}
              className="p-1.5 text-neutral-300 hover:text-white relative rounded hover:bg-neutral-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Popover */}
            {notifPopoverOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-neutral-900 border border-neutral-700 shadow-2xl z-50 text-xs overflow-hidden">
                <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                  <div className="font-semibold text-neutral-200">
                    System Notifications ({unreadNotificationsCount} unread)
                  </div>
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-800">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 cursor-pointer hover:bg-neutral-800/80 transition-colors ${
                        !n.isRead ? 'bg-neutral-800/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-neutral-200">{n.title}</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{n.timestamp}</span>
                      </div>
                      <p className="mt-1 text-neutral-400 text-[11px] leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
            <div className="w-7 h-7 bg-amber-600 text-neutral-950 font-bold rounded-full flex items-center justify-center text-xs">
              JA
            </div>
            <span className="text-xs text-neutral-300 hidden md:block">
              {currentAdmin?.name}
            </span>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-neutral-950 border-r border-neutral-800 transition-all duration-300 flex flex-col justify-between shrink-0 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="py-4 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
            <div className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wide rounded-none transition-colors ${
                      isActive
                        ? 'bg-neutral-800 text-white border-l-2 border-amber-400'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono bg-rose-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom user status */}
          <div className="p-3 border-t border-neutral-800/80 bg-neutral-950">
            {!sidebarCollapsed ? (
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="truncate">Store: {settings.storeName}</span>
                <span className="text-[10px] font-mono text-emerald-400">ONLINE</span>
              </div>
            ) : (
              <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto" />
            )}
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 bg-neutral-900 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
