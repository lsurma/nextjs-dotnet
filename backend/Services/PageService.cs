using ShopApi.Models;

namespace ShopApi.Services;

public class PageService
{
    private readonly List<Page> _pages = new()
    {
        new Page 
        { 
            Id = 1, 
            Slug = "homepage", 
            Title = "Homepage", 
            Content = "{\"content\":[],\"root\":{}}",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsPublished = true
        }
    };

    private int _nextId = 2;

    public List<Page> GetAllPages() => _pages;

    public Page? GetPageById(int id) => _pages.FirstOrDefault(p => p.Id == id);

    public Page? GetPageBySlug(string slug) => _pages.FirstOrDefault(p => p.Slug == slug);

    public Page CreatePage(Page page)
    {
        page.Id = _nextId++;
        page.CreatedAt = DateTime.UtcNow;
        page.UpdatedAt = DateTime.UtcNow;
        _pages.Add(page);
        return page;
    }

    public bool UpdatePage(int id, Page page)
    {
        var existing = _pages.FirstOrDefault(p => p.Id == id);
        if (existing == null) return false;

        existing.Slug = page.Slug;
        existing.Title = page.Title;
        existing.Content = page.Content;
        existing.IsPublished = page.IsPublished;
        existing.UpdatedAt = DateTime.UtcNow;
        return true;
    }

    public bool DeletePage(int id)
    {
        var page = _pages.FirstOrDefault(p => p.Id == id);
        if (page == null) return false;
        
        _pages.Remove(page);
        return true;
    }
}
