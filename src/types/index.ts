export type CategoryType = 'women' | 'men' | 'kids' | 'shoes' | 'accessories' | 'new-arrivals' | 'sale';

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  sku: string;
  price: number;
  stock: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: CategoryType;
  subcategory: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  materials: string;
  careInstructions: string;
  fit: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  lowStockThreshold: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  onSale?: boolean;
  status: 'published' | 'draft' | 'archived';
  weightKg?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: CategoryType | string;
  description: string;
  image: string;
  itemCount: number;
  featured: boolean;
  status: 'active' | 'inactive';
  sortOrder: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface OrderTimelineItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'card' | 'cod' | 'bank_transfer';
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express';
  trackingNumber?: string;
  couponApplied?: string;
  notes?: string;
  createdAt: string;
  timeline: OrderTimelineItem[];
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalSpent: number;
  ordersCount: number;
  status: 'active' | 'inactive' | 'vip';
  registeredAt: string;
  addresses: Address[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumOrder: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  description: string;
}

export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  discountPercent: number;
  bannerImage: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  type: 'flash_sale' | 'seasonal' | 'clearance' | 'weekend';
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'stock_in' | 'stock_out' | 'adjustment' | 'order_fulfillment' | 'return';
  quantityChange: number;
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
  operator: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'store_manager' | 'order_manager' | 'content_manager';
  avatar?: string;
  lastLogin: string;
}

export interface HomepageCMS {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    image: string;
    showSection: boolean;
  };
  announcement: {
    text: string;
    linkText: string;
    linkUrl: string;
    isEnabled: boolean;
  };
  featuredCollection: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image: string;
    showSection: boolean;
  };
  promotionalBanner: {
    tag: string;
    headline: string;
    discountHighlight: string;
    description: string;
    endDate: string;
    ctaText: string;
    ctaLink: string;
    showSection: boolean;
  };
  brandStory: {
    title: string;
    quote: string;
    body: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    showSection: boolean;
  };
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'review' | 'customer';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  currencySymbol: string;
  taxRate: number; // e.g. 0.08 for 8%
  freeShippingThreshold: number;
  standardShippingRate: number;
  expressShippingRate: number;
  enableCod: boolean;
  enableCard: boolean;
  enableBankTransfer: boolean;
}
