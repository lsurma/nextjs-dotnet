# Next.js + .NET E-commerce Application

A simple online shop with Next.js frontend and .NET backend API, featuring JWT authentication and bulk request capabilities.

## Features

- **Frontend (Next.js)**
  - Login with test credentials
  - Product listing
  - Shopping cart
  - Order placement
  - JWT token authentication
  
- **Backend (.NET Web API)**
  - JWT authentication
  - Product CRUD operations
  - Order management
  - Bulk API endpoint for multiple requests in one call
  - CORS enabled for Next.js

## Test Credentials

- `test@shop.com` / `Test123!`
- `admin@shop.com` / `Admin123!`

## Getting Started

### Prerequisites

- .NET 10.0 SDK
- Node.js 20.x
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the .NET API:
   ```bash
   dotnet run
   ```

   The API will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create order
- `GET /api/orders/all` - Get all orders

### Bulk Operations
- `POST /api/bulk` - Execute multiple API requests in a single call

#### Bulk Request Example

```json
{
  "requests": [
    {
      "id": "req1",
      "method": "GET",
      "endpoint": "/api/products"
    },
    {
      "id": "req2",
      "method": "GET",
      "endpoint": "/api/orders"
    },
    {
      "id": "req3",
      "method": "POST",
      "endpoint": "/api/products",
      "body": {
        "name": "New Product",
        "description": "Description",
        "price": 99.99,
        "stock": 10,
        "imageUrl": "https://example.com/image.jpg"
      }
    }
  ]
}
```

## Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Context API** for state management (Auth & Cart)
- JWT token stored in localStorage

### Backend
- **.NET 10 Web API**
- **JWT Bearer Authentication**
- **In-memory data storage** (for demo purposes)
- **CORS** configured for local development

### Bulk Request Implementation

The bulk endpoint (`/api/bulk`) allows the frontend to send multiple API requests in a single HTTP call. This is useful for:
- Reducing network overhead
- Batch operations
- Legacy API compatibility where a single operation needs to be split into multiple backend calls

Each request in the bulk payload is processed independently, and responses are returned with corresponding IDs for matching requests to responses.

## License

MIT
