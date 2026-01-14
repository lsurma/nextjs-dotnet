using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopApi.Models;
using ShopApi.Services;

namespace ShopApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PagesController : ControllerBase
{
    private readonly PageService _pageService;

    public PagesController(PageService pageService)
    {
        _pageService = pageService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_pageService.GetAllPages());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var page = _pageService.GetPageById(id);
        if (page == null)
            return NotFound();

        return Ok(page);
    }

    [HttpGet("slug/{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var page = _pageService.GetPageBySlug(slug);
        if (page == null)
            return NotFound();

        return Ok(page);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Create([FromBody] Page page)
    {
        var created = _pageService.CreatePage(page);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(int id, [FromBody] Page page)
    {
        if (!_pageService.UpdatePage(id, page))
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(int id)
    {
        if (!_pageService.DeletePage(id))
            return NotFound();

        return NoContent();
    }
}
