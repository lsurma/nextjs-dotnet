using ShopApi.Models;

namespace ShopApi.Services;

public class ProductService
{
    private readonly List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop Dell XPS 15", Description = "Powerful laptop for professionals", Price = 1299.99m, Stock = 10, ImageUrl = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400" },
        new Product { Id = 2, Name = "iPhone 15 Pro", Description = "Latest Apple smartphone", Price = 999.99m, Stock = 25, ImageUrl = "https://images.unsplash.com/photo-1592286927505-0a1b00b70000?w=400" },
        new Product { Id = 3, Name = "Sony WH-1000XM5", Description = "Premium noise-canceling headphones", Price = 399.99m, Stock = 15, ImageUrl = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400" },
        new Product { Id = 4, Name = "Samsung 4K Monitor", Description = "27-inch 4K display", Price = 449.99m, Stock = 8, ImageUrl = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
        new Product { Id = 5, Name = "Mechanical Keyboard", Description = "RGB gaming keyboard", Price = 129.99m, Stock = 20, ImageUrl = "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400" },
        new Product { Id = 6, Name = "Logitech MX Master", Description = "Wireless ergonomic mouse", Price = 99.99m, Stock = 30, ImageUrl = "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" }
    };

    private int _nextId = 7;

    public List<Product> GetAllProducts() => _products;

    public Product? GetProductById(int id) => _products.FirstOrDefault(p => p.Id == id);

    public Product CreateProduct(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);
        return product;
    }

    public bool UpdateProduct(int id, Product product)
    {
        var existing = _products.FirstOrDefault(p => p.Id == id);
        if (existing == null) return false;

        existing.Name = product.Name;
        existing.Description = product.Description;
        existing.Price = product.Price;
        existing.Stock = product.Stock;
        existing.ImageUrl = product.ImageUrl;
        return true;
    }

    public bool DeleteProduct(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null) return false;
        
        _products.Remove(product);
        return true;
    }
}
