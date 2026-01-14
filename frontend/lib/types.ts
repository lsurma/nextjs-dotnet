export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export interface Order {
  id?: number;
  userId?: string;
  orderDate?: string;
  totalAmount: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface ApiRequest {
  id: string;
  method: string;
  endpoint: string;
  body?: any;
}

export interface BulkRequest {
  requests: ApiRequest[];
}

export interface ApiResponse {
  id: string;
  statusCode: number;
  data?: any;
  error?: string;
}

export interface BulkResponse {
  responses: ApiResponse[];
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string; // JSON content from Puck editor
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}
