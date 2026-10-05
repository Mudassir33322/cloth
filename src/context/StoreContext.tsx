import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  Customer,
  Coupon,
  Promotion,
  HomepageCMS,
  StoreSettings,
  AdminNotification,
  Review,
  InventoryMovement,
  OrderStatus,
  AdminUser
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_PROMOTIONS,
  INITIAL_CMS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Navigation & View
  currentPath: string;
  navigate: (path: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  updateOrderTracking: (orderId: string, trackingNumber: string) => void;
  lastCreatedOrder: Order | null;

  // Inventory
  adjustStock: (productId: string, quantityChange: number, reason: string) => void;
  inventoryMovements: InventoryMovement[];

  // Customers
  customers: Customer[];
  updateCustomer: (id: string, updates: Partial<Customer>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Promotions
  promotions: Promotion[];
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;
  updateReviewStatus: (id: string, status: 'approved' | 'rejected') => void;
  deleteReview: (id: string) => void;

  // CMS
  cms: HomepageCMS;
  updateCMS: (updates: Partial<HomepageCMS>) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  formatPrice: (amount: number) => string;

  // Notifications
  notifications: AdminNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Authentication & Users
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  currentAdmin: AdminUser | null;
  setCurrentAdmin: (admin: AdminUser | null) => void;
  switchAdminRole: (role: AdminUser['role']) => void;

  // UI Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Demo helper
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'velora_ecommerce_state_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.replace('#', '') || '/';
    }
    return '/';
  });

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // State initialization
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_categories`);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cart`);
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_wishlist`);
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_coupons`);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_promotions`);
    return saved ? JSON.parse(saved) : INITIAL_PROMOTIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_reviews`);
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cms, setCms] = useState<HomepageCMS>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_cms`);
    return saved ? JSON.parse(saved) : INITIAL_CMS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>([
    {
      id: 'inv-1',
      productId: 'prod-5',
      productName: 'Minimalist Relaxed Merino Wool Knit',
      sku: 'VEL-KNT-005',
      type: 'stock_out',
      quantityChange: -2,
      previousStock: 5,
      newStock: 3,
      reason: 'Order fulfillment #VEL-98420',
      timestamp: '2026-10-04T08:30:00Z',
      operator: 'System Automation',
    },
    {
      id: 'inv-2',
      productId: 'prod-1',
      productName: 'Tailored Linen-Blend Atelier Blazer',
      sku: 'VEL-BLZ-001',
      type: 'stock_in',
      quantityChange: 15,
      previousStock: 9,
      newStock: 24,
      reason: 'Biella Mill Restock Batch #49',
      timestamp: '2026-10-02T11:00:00Z',
      operator: 'Store Manager',
    }
  ]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Auth
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(INITIAL_CUSTOMERS[0]);
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>({
    id: 'adm-1',
    name: 'Julian Alexander',
    email: 'admin@velora.demo',
    role: 'super_admin',
    lastLogin: 'Today, 2:15 PM',
  });

  // UI Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_categories`, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_cart`, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_wishlist`, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_customers`, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_coupons`, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_promotions`, JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_cms`, JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_settings`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  // Toast Helpers
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency Formatter
  const formatPrice = (amount: number) => {
    return `${settings.currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const productWithMeta: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [productWithMeta, ...prev]);
    showToast(`Product "${productWithMeta.name}" published successfully.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  // Category CRUD
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [...prev, { ...cat, id }]);
    showToast(`Category "${cat.name}" created.`);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated.');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category removed.', 'info');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      );

      const effectivePrice = product.salePrice ?? product.price;

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          price: effectivePrice,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added ${product.name} to shopping bag.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedCoupon.discountValue) / 100;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
    if (appliedCoupon.maxDiscount && cartDiscount > appliedCoupon.maxDiscount) {
      cartDiscount = appliedCoupon.maxDiscount;
    }
  }

  const cartShipping =
    cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0
      ? 0
      : settings.standardShippingRate;

  const cartTax = Math.round((cartSubtotal - cartDiscount) * settings.taxRate * 100) / 100;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === formatted && c.isActive
    );

    if (!coupon) {
      return { success: false, message: 'Invalid or expired promotion code.' };
    }

    if (cartSubtotal < coupon.minimumOrder) {
      return {
        success: false,
        message: `Order must be at least ${formatPrice(coupon.minimumOrder)} to apply this code.`,
      };
    }

    setAppliedCoupon(coupon);
    showToast(`Code "${coupon.code}" applied successfully!`);
    return { success: true, message: 'Privilege discount applied.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Privilege code removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = getProductById(productId);
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed from curated wishlist.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${product ? product.name : 'item'} to wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>
  ) => {
    const orderNumber = `VEL-${Math.floor(10000 + Math.random() * 90000)}`;
    const id = `ord-${Date.now()}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: orderData.status,
          timestamp: new Date().toISOString(),
          note: `Order ${orderNumber} created via ${orderData.paymentMethod.toUpperCase()}`,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    // Deduct stock
    orderData.items.forEach((item) => {
      adjustStock(
        item.productId,
        -item.quantity,
        `Order fulfillment #${orderNumber}`
      );
    });

    // Add admin notification
    const newNotif: AdminNotification = {
      id: `notif-${Date.now()}`,
      title: `New Order #${orderNumber}`,
      message: `${orderData.customerName} placed an order for ${formatPrice(orderData.total)}`,
      type: 'order',
      timestamp: 'Just now',
      isRead: false,
      link: '/admin/orders',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newTimelineItem = {
            status,
            timestamp: new Date().toISOString(),
            note: note || `Status updated to ${status}`,
          };
          return {
            ...order,
            status,
            timeline: [...order.timeline, newTimelineItem],
          };
        }
        return order;
      })
    );
    showToast(`Order status updated to "${status.toUpperCase()}".`);
  };

  const updateOrderTracking = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, trackingNumber } : order
      )
    );
    showToast('Tracking number updated.');
  };

  // Inventory
  const adjustStock = (
    productId: string,
    quantityChange: number,
    reason: string
  ) => {
    const product = getProductById(productId);
    if (!product) return;

    const previousStock = product.stock;
    const newStock = Math.max(0, previousStock + quantityChange);

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );

    const movement: InventoryMovement = {
      id: `inv-${Date.now()}`,
      productId,
      productName: product.name,
      sku: product.sku,
      type: quantityChange >= 0 ? 'stock_in' : 'stock_out',
      quantityChange,
      previousStock,
      newStock,
      reason,
      timestamp: new Date().toISOString(),
      operator: currentAdmin ? currentAdmin.name : 'System',
    };

    setInventoryMovements((prev) => [movement, ...prev]);

    // Alert if below threshold
    if (newStock <= product.lowStockThreshold) {
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: `Low Stock Alert: ${product.name}`,
          message: `Stock level dropped to ${newStock} units (Threshold: ${product.lowStockThreshold})`,
          type: 'stock',
          timestamp: 'Just now',
          isRead: false,
          link: '/admin/inventory',
        },
        ...prev,
      ]);
    }
  };

  // Customers
  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Customer record updated.');
  };

  // Coupons
  const addCoupon = (coup: Omit<Coupon, 'id' | 'usageCount'>) => {
    const id = `coup-${Date.now()}`;
    setCoupons((prev) => [...prev, { ...coup, id, usageCount: 0 }]);
    showToast(`Promotion code "${coup.code}" created.`);
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Coupon details updated.');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon removed.', 'info');
  };

  // Promotions
  const updatePromotion = (id: string, updates: Partial<Promotion>) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Campaign promotion updated.');
  };

  // Reviews
  const addReview = (rev: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending', // Pending admin approval
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for your review. It has been submitted for moderation.');

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Customer Review Pending',
        message: `${rev.customerName} submitted a ${rev.rating}-star review.`,
        type: 'review',
        timestamp: 'Just now',
        isRead: false,
        link: '/admin/reviews',
      },
      ...prev,
    ]);
  };

  const updateReviewStatus = (id: string, status: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToast(`Review marked as ${status}.`);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted.', 'info');
  };

  // CMS
  const updateCMS = (updates: Partial<HomepageCMS>) => {
    setCms((prev) => ({ ...prev, ...updates }));
    showToast('Homepage CMS updated live!');
  };

  // Settings
  const updateSettings = (updates: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showToast('Store settings saved.');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const switchAdminRole = (role: AdminUser['role']) => {
    if (currentAdmin) {
      setCurrentAdmin({ ...currentAdmin, role });
      showToast(`Switched active role to ${role.replace('_', ' ').toUpperCase()}`);
    }
  };

  // Reset helper
  const resetToDefaults = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCoupons(INITIAL_COUPONS);
    setPromotions(INITIAL_PROMOTIONS);
    setReviews(INITIAL_REVIEWS);
    setCms(INITIAL_CMS);
    setSettings(INITIAL_SETTINGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
    setWishlist(['prod-1', 'prod-2']);
    showToast('Demo store & administrative data reset to defaults.');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPath,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        updateOrderTracking,
        lastCreatedOrder,
        adjustStock,
        inventoryMovements,
        customers,
        updateCustomer,
        coupons,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        promotions,
        updatePromotion,
        reviews,
        addReview,
        updateReviewStatus,
        deleteReview,
        cms,
        updateCMS,
        settings,
        updateSettings,
        formatPrice,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        currentCustomer,
        setCurrentCustomer,
        currentAdmin,
        setCurrentAdmin,
        switchAdminRole,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
