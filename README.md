# Next.js + .NET E-commerce Application

A simple online shop with Next.js frontend and .NET backend API, featuring JWT authentication, bulk request capabilities, and a backoffice management interface.

## Features

- **Frontend (Next.js)**
  - Login with test credentials
  - Product listing
  - Shopping cart
  - Order placement
  - JWT token authentication
  - **Backoffice SPA** - Product management interface with shadcn/ui components
  
- **Backend (.NET Web API)**
  - JWT authentication
  - Product CRUD operations
  - Order management
  - Bulk API endpoint for multiple requests in one call
  - CORS enabled for Next.js

## Test Credentials

- `test@shop.com` / `Test123!` - Regular user
- `admin@shop.com` / `Admin123!` - Admin user (for backoffice access)

## Getting Started

### Prerequisites

- .NET SDK 8.0 or later (tested with .NET 10.0)
- Node.js 20.x or later
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

## Application Routes

### Customer-Facing Routes
- `/` - Home page (redirects to login or products)
- `/login` - Login page
- `/products` - Product listing page
- `/cart` - Shopping cart

### Backoffice Routes
- `/backoffice` - Product management interface (requires authentication)
  - View all products in a table
  - Create new products
  - Edit existing products
  - Delete products

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
- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library for the backoffice interface
- **Context API** for state management (Auth & Cart)
- JWT token stored in localStorage

### Backoffice Interface
The backoffice is a full React SPA built with shadcn/ui components featuring:
- **Authentication Protection** - Automatically redirects to login if not authenticated
- **Product Management** - Complete CRUD interface with modal dialogs
- **Data Table** - Clean table view of all products with inline actions
- **Form Validation** - Client-side validation for product data
- **Real-time Updates** - Product list refreshes after create/update/delete operations

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

## Security Considerations

⚠️ **This is a demonstration application. The following security practices are simplified for demo purposes and should NOT be used in production:**

1. **Passwords**: Test account passwords are stored in plain text in the code. In production, use proper password hashing (e.g., BCrypt, Argon2).
2. **JWT Secret**: The JWT signing key is hardcoded in `appsettings.json`. In production, use environment variables or secure configuration management (e.g., Azure Key Vault, AWS Secrets Manager).
3. **Data Storage**: Data is stored in-memory. Use a proper database in production.
4. **HTTPS**: The application uses HTTP. In production, always use HTTPS.
5. **Input Validation**: Add comprehensive input validation and sanitization.
6. **Rate Limiting**: Implement rate limiting to prevent abuse.

## License

MIT
