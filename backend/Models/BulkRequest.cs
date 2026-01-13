namespace ShopApi.Models;

public class BulkRequest
{
    public List<ApiRequest> Requests { get; set; } = new();
}

public class ApiRequest
{
    public string Id { get; set; } = string.Empty;
    public string Method { get; set; } = string.Empty;
    public string Endpoint { get; set; } = string.Empty;
    public object? Body { get; set; }
}

public class BulkResponse
{
    public List<ApiResponse> Responses { get; set; } = new();
}

public class ApiResponse
{
    public string Id { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public object? Data { get; set; }
    public string? Error { get; set; }
}
