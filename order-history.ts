const KEY = "gaon-delivery-orders";

export interface SavedOrder {
  id: string;
  date: string;
  shopName: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export function saveOrder(order: Omit<SavedOrder, "id" | "date">) {
  const existing = getOrders();
  const newOrder: SavedOrder = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    ...order,
  };
  localStorage.setItem(KEY, JSON.stringify([newOrder, ...existing]));
  return newOrder;
}

export function getOrders(): SavedOrder[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
