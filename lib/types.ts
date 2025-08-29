// Core TypeScript interfaces for the application
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface CreateTodoRequest {
  todo: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoRequest {
  id: number;
  todo?: string;
  completed?: boolean;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface TodoState {
  todos: Todo[];
  filter: "all" | "completed" | "incomplete";
  searchQuery: string;
  draggedTodo: Todo | null;
}

// Product interfaces
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand?: string;
  sku: string;
  stock: number;
  minStock: number;
  status: "active" | "inactive" | "out_of_stock" | "draft";
  images: string[];
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastPriceUpdate?: string;
}

// Order interfaces
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "cash" | "card" | "bank_transfer" | "wallet";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Filter and state interfaces
export interface ProductFilters {
  status: "all" | "active" | "inactive" | "out_of_stock" | "draft";
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  stockStatus: "all" | "in_stock" | "low_stock" | "out_of_stock";
  searchQuery: string;
}

export interface OrderFilters {
  status:
    | "all"
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  paymentStatus: "all" | "pending" | "paid" | "failed" | "refunded";
  dateRange: {
    from: string;
    to: string;
  };
  searchQuery: string;
}
