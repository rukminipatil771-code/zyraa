import { CartItem, OrderRecord } from '../types';

const KEYS = {
  CART: 'zyraa_cart_v1',
  WISHLIST: 'zyraa_wishlist_v1',
  ORDERS: 'zyraa_orders_v1',
  NEWSLETTER: 'zyraa_newsletter_v1',
  MESSAGES: 'zyraa_contact_messages_v1',
};

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export const storageService = {
  getCart(): CartItem[] {
    return safeRead<CartItem[]>(KEYS.CART, []);
  },
  saveCart(items: CartItem[]): void {
    safeWrite(KEYS.CART, items);
  },

  getWishlist(): string[] {
    return safeRead<string[]>(KEYS.WISHLIST, []);
  },
  saveWishlist(productIds: string[]): void {
    safeWrite(KEYS.WISHLIST, productIds);
  },

  getOrders(): OrderRecord[] {
    return safeRead<OrderRecord[]>(KEYS.ORDERS, []);
  },
  saveOrder(order: OrderRecord): void {
    const existing = this.getOrders();
    safeWrite(KEYS.ORDERS, [order, ...existing]);
  },

  subscribeNewsletter(email: string): { alreadySubscribed: boolean } {
    const list = safeRead<string[]>(KEYS.NEWSLETTER, []);
    const normalized = email.trim().toLowerCase();
    if (list.includes(normalized)) {
      return { alreadySubscribed: true };
    }
    safeWrite(KEYS.NEWSLETTER, [...list, normalized]);
    return { alreadySubscribed: false };
  },

  saveContactMessage(entry: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): void {
    const existing = safeRead<Array<typeof entry & { id: string; sentAt: string }>>(
      KEYS.MESSAGES,
      []
    );
    safeWrite(KEYS.MESSAGES, [
      { ...entry, id: `msg-${Date.now()}`, sentAt: new Date().toISOString() },
      ...existing,
    ]);
  },
};
