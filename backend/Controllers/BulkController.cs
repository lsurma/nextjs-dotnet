using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApi.Models;
using ShopApi.Services;

namespace ShopApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BulkController : ControllerBase
{
    private readonly ProductService _productService;
    private readonly OrderService _orderService;

    public BulkController(ProductService productService, OrderService orderService)
    {
        _productService = productService;
        _orderService = orderService;
    }

    [HttpPost]
    public IActionResult ProcessBulkRequests([FromBody] BulkRequest bulkRequest)
    {
        var bulkResponse = new BulkResponse();
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        foreach (var request in bulkRequest.Requests)
        {
            var response = new ApiResponse { Id = request.Id };

            try
            {
                response = ProcessSingleRequest(request, userId);
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.Error = ex.Message;
            }

            bulkResponse.Responses.Add(response);
        }

        return Ok(bulkResponse);
    }

    private ApiResponse ProcessSingleRequest(ApiRequest request, string? userId)
    {
        var response = new ApiResponse { Id = request.Id };

        switch (request.Endpoint.ToLower())
        {
            case "/api/products":
                if (request.Method.ToUpper() == "GET")
                {
                    response.Data = _productService.GetAllProducts();
                    response.StatusCode = 200;
                }
                else if (request.Method.ToUpper() == "POST" && request.Body != null)
                {
                    var product = JsonSerializer.Deserialize<Product>(
                        JsonSerializer.Serialize(request.Body),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    
                    if (product != null)
                    {
                        response.Data = _productService.CreateProduct(product);
                        response.StatusCode = 201;
                    }
                    else
                    {
                        response.Error = "Invalid product data";
                        response.StatusCode = 400;
                    }
                }
                break;

            case var endpoint when endpoint.StartsWith("/api/products/"):
                var productId = int.Parse(endpoint.Split('/').Last());
                
                if (request.Method.ToUpper() == "GET")
                {
                    var product = _productService.GetProductById(productId);
                    if (product != null)
                    {
                        response.Data = product;
                        response.StatusCode = 200;
                    }
                    else
                    {
                        response.Error = "Product not found";
                        response.StatusCode = 404;
                    }
                }
                else if (request.Method.ToUpper() == "PUT" && request.Body != null)
                {
                    var product = JsonSerializer.Deserialize<Product>(
                        JsonSerializer.Serialize(request.Body),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    
                    if (product != null && _productService.UpdateProduct(productId, product))
                    {
                        response.StatusCode = 204;
                    }
                    else
                    {
                        response.Error = "Product not found or invalid data";
                        response.StatusCode = 404;
                    }
                }
                else if (request.Method.ToUpper() == "DELETE")
                {
                    if (_productService.DeleteProduct(productId))
                    {
                        response.StatusCode = 204;
                    }
                    else
                    {
                        response.Error = "Product not found";
                        response.StatusCode = 404;
                    }
                }
                break;

            case "/api/orders":
                if (request.Method.ToUpper() == "GET")
                {
                    if (userId != null)
                    {
                        response.Data = _orderService.GetUserOrders(userId);
                        response.StatusCode = 200;
                    }
                    else
                    {
                        response.Error = "Unauthorized";
                        response.StatusCode = 401;
                    }
                }
                else if (request.Method.ToUpper() == "POST" && request.Body != null)
                {
                    var order = JsonSerializer.Deserialize<Order>(
                        JsonSerializer.Serialize(request.Body),
                        new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    
                    if (order != null && userId != null)
                    {
                        response.Data = _orderService.CreateOrder(order, userId);
                        response.StatusCode = 201;
                    }
                    else
                    {
                        response.Error = "Invalid order data or unauthorized";
                        response.StatusCode = 400;
                    }
                }
                break;

            default:
                response.Error = "Endpoint not found";
                response.StatusCode = 404;
                break;
        }

        return response;
    }
}
