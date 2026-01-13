# Bulk API Example

This document demonstrates how to use the bulk API endpoint to send multiple requests in a single HTTP call.

## Endpoint

```
POST /api/bulk
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

## Request Format

```json
{
  "requests": [
    {
      "id": "unique-request-id-1",
      "method": "GET|POST|PUT|DELETE",
      "endpoint": "/api/resource",
      "body": { /* optional request body */ }
    }
  ]
}
```

## Response Format

```json
{
  "responses": [
    {
      "id": "unique-request-id-1",
      "statusCode": 200,
      "data": { /* response data */ },
      "error": null
    }
  ]
}
```

## Example: Get Products and Orders

```bash
curl -X POST http://localhost:5000/api/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "requests": [
      {
        "id": "get-products",
        "method": "GET",
        "endpoint": "/api/products"
      },
      {
        "id": "get-orders",
        "method": "GET",
        "endpoint": "/api/orders"
      }
    ]
  }'
```

## Example: Create Order and Get Updated Products

```bash
curl -X POST http://localhost:5000/api/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "requests": [
      {
        "id": "create-order",
        "method": "POST",
        "endpoint": "/api/orders",
        "body": {
          "totalAmount": 999.99,
          "items": [
            {
              "productId": 1,
              "productName": "Laptop",
              "quantity": 1,
              "price": 999.99
            }
          ]
        }
      },
      {
        "id": "get-products",
        "method": "GET",
        "endpoint": "/api/products"
      }
    ]
  }'
```

## Supported Endpoints in Bulk Requests

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

## Benefits

1. **Reduced Network Overhead**: Send multiple requests in a single HTTP call
2. **Batch Operations**: Perform multiple operations atomically
3. **Legacy API Compatibility**: Convert multiple internal API calls into a single bulk request
4. **Improved Performance**: Reduce latency by eliminating multiple round trips

## Error Handling

Each request in the bulk is processed independently. If one request fails, others will still be processed. Check the `statusCode` and `error` fields in each response to handle errors appropriately.

```json
{
  "responses": [
    {
      "id": "req1",
      "statusCode": 200,
      "data": { /* success data */ },
      "error": null
    },
    {
      "id": "req2",
      "statusCode": 404,
      "data": null,
      "error": "Product not found"
    }
  ]
}
```
