using System.Security.Claims;
using invoiceFlow.Models;
using invoiceFlow.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace invoiceFlow.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]  // This will check for a valid JWT token
public class InvoiceController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;
    
    public InvoiceController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }
    
    [HttpPost]
    public async Task<ActionResult<Invoice>> CreateInvoice(Invoice invoice)
    {
        // Get the user ID from the JWT token
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        invoice.UserId = userId;
        
        var createdInvoice = await _invoiceService.CreateInvoiceAsync(invoice);
        return CreatedAtAction(nameof(GetInvoice), new { id = createdInvoice.Id }, createdInvoice);
    }

    
    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var invoice = await _invoiceService.GetInvoiceAsync(id, userId);
        
        if (invoice == null)
            return NotFound();
            
        return invoice;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetUserInvoices()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var invoices = await _invoiceService.GetUserInvoicesAsync(userId);
        return Ok(invoices);
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<Invoice>> UpdateInvoice(int id, Invoice invoice)
    {
        if (id != invoice.Id)
            return BadRequest();
            
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        invoice.UserId = userId;
        
        try
        {
            var updatedInvoice = await _invoiceService.UpdateInvoiceAsync(invoice);
            return Ok(updatedInvoice);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _invoiceService.DeleteInvoiceAsync(id, userId);
        return NoContent();
    }
}
