import { LoginRequest, LoginResponse, Product, Order, BulkRequest, BulkResponse, Page } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  }

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  }

  async updateProduct(id: number, product: Omit<Product, 'id'>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }
  }

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }

  async createOrder(order: Order): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  }

  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  }

  async bulkRequest(bulkRequest: BulkRequest): Promise<BulkResponse> {
    const response = await fetch(`${API_BASE_URL}/api/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(bulkRequest),
    });

    if (!response.ok) {
      throw new Error('Bulk request failed');
    }

    return response.json();
  }

  // Pages API
  async getPages(): Promise<Page[]> {
    const response = await fetch(`${API_BASE_URL}/api/pages`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pages');
    }

    return response.json();
  }

  async getPage(id: number): Promise<Page> {
    const response = await fetch(`${API_BASE_URL}/api/pages/${id}`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }

    return response.json();
  }

  async getPageBySlug(slug: string): Promise<Page> {
    const response = await fetch(`${API_BASE_URL}/api/pages/slug/${slug}`, {
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch page');
    }

    return response.json();
  }

  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    const response = await fetch(`${API_BASE_URL}/api/pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      throw new Error('Failed to create page');
    }

    return response.json();
  }

  async updatePage(id: number, page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
      },
      body: JSON.stringify(page),
    });

    if (!response.ok) {
      throw new Error('Failed to update page');
    }
  }

  async deletePage(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/pages/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete page');
    }
  }
}

export const apiClient = new ApiClient();
