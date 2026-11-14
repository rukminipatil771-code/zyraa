import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import {
  AuthCredentials,
  CartItem,
  CategoryName,
  OrderRecord,
  Product,
  RegisterPayload,
  SortOption,
  User,
  ViewRoute,
} from '../types';

interface StoreContextValue {
  // Navigation
  activeView: ViewRoute;
  navigate: (view: ViewRoute, options?: { productId?: string; category?: CategoryName | 'All' }) => void;
  selectedProduct: Product | null;

  // Catalog filtering
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryName | 'All';
  setSelectedCategory: (cat: CategoryName | 'All') => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (cartKey: string) => void;
  updateCartQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  originalSubtotal: number;
  totalSavings: number;
  shippingFee: number;
  orderTotal: number;
  freeShippingThreshold: number;

  // Wishlist
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: OrderRecord[];
  placeDemoOrder: (details: {
    customerName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  }) => OrderRecord;

  // Auth
  user: User | null;
  login: (credentials: AuthCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => Promise<void>;

  // Toast feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const FREE_SHIPPING_THRESHOLD = 150;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [minRating, setMinRating] = useState<number>(0);

  const [cart, setCart] = useState<CartItem[]>(() => storageService.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => storageService.getWishlist());
  const [orders, setOrders] = useState<OrderRecord[]>(() => storageService.getOrders());
  const [user, setUser] = useState<User | null>(() => authService.getCurrentSession());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  useEffect(() => {
    storageService.saveWishlist(wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const navigate = (
    view: ViewRoute,
    options?: { productId?: string; category?: CategoryName | 'All' }
  ) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return PRODUCTS[0] ?? null;
    return PRODUCTS.find((p) => p.id === selectedProductId) ?? null;
  }, [selectedProductId]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setMinRating(0);
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    const resolvedSize = size ?? product.sizes?.[0];
    const resolvedColor = color ?? product.colors?.[0]?.name;
    const cartKey = `${product.id}__${resolvedSize ?? 'std'}__${resolvedColor ?? 'default'}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartKey,
          product,
          quantity,
          selectedSize: resolvedSize,
          selectedColor: resolvedColor,
        },
      ];
    });

    showToast(`Added "${product.name}" to your bag`);
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const updateCartQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.discountedPrice * item.quantity,
        0
      ),
    [cart]
  );

  const originalSubtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.product.originalPrice * item.quantity,
        0
      ),
    [cart]
  );

  const totalSavings = Math.max(0, originalSubtotal - subtotal);
  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
  const orderTotal = subtotal + shippingFee;

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [productId, ...prev];
      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        showToast(
          exists
            ? `Removed "${product.name}" from wishlist`
            : `Saved "${product.name}" to wishlist`
        );
      }
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const placeDemoOrder = (details: {
    customerName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  }): OrderRecord => {
    const newOrder: OrderRecord = {
      id: `ZYR-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customerName: details.customerName,
      email: details.email,
      address: details.address,
      city: details.city,
      postalCode: details.postalCode,
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      total: orderTotal,
    };
    storageService.saveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const login = async (credentials: AuthCredentials) => {
    const loggedIn = await authService.login(credentials);
    setUser(loggedIn);
    showToast(`Welcome back, ${loggedIn.name}`);
    return loggedIn;
  };

  const register = async (payload: RegisterPayload) => {
    const created = await authService.register(payload);
    setUser(created);
    showToast(`Welcome to ZYRAA, ${created.name}`);
    return created;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    showToast('Signed out of your ZYRAA account');
  };

  const value: StoreContextValue = {
    activeView,
    navigate,
    selectedProduct,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    minRating,
    setMinRating,
    resetFilters,
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    subtotal,
    originalSubtotal,
    totalSavings,
    shippingFee,
    orderTotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    wishlistIds,
    wishlistProducts,
    toggleWishlist,
    isInWishlist,
    orders,
    placeDemoOrder,
    user,
    login,
    register,
    logout,
    toastMessage,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside a StoreProvider');
  }
  return ctx;
}
