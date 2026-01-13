using ShopApi.Models;

namespace ShopApi.Services;

public class OrderService
{
    private readonly List<Order> _orders = new();
    private int _nextOrderId = 1;

    public List<Order> GetUserOrders(string userId) => 
        _orders.Where(o => o.UserId == userId).ToList();

    public Order? GetOrderById(int id) => _orders.FirstOrDefault(o => o.Id == id);

    public Order CreateOrder(Order order, string userId)
    {
        order.Id = _nextOrderId++;
        order.UserId = userId;
        order.OrderDate = DateTime.UtcNow;
        _orders.Add(order);
        return order;
    }

    public List<Order> GetAllOrders() => _orders;
}
