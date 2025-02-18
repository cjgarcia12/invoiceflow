using invoiceFlow.Data;
using invoiceFlow.Models;
using Microsoft.EntityFrameworkCore;

namespace invoiceFlow.Services;
public class InvoiceService : IInvoiceService
{
    private readonly ApplicationDbContext _context;
    
    public InvoiceService(ApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Invoice> CreateInvoiceAsync(Invoice invoice)
    {
        invoice.CreatedAt = DateTime.UtcNow;
        invoice.UpdatedAt = DateTime.UtcNow;
        
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }
    
    public async Task<Invoice> GetInvoiceAsync(int id, string userId)
    {
        return await _context.Invoices
            .Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
    }
    
    public async Task<IEnumerable<Invoice>> GetUserInvoicesAsync(string userId)
    {
        return await _context.Invoices
            .Where(i => i.UserId == userId)
            .OrderByDescending(i => i.CreatedAt)
            .ToListAsync();
    }
    
    public async Task<Invoice> UpdateInvoiceAsync(Invoice invoice)
    {
        var existingInvoice = await _context.Invoices
            .Include(i => i.Items)
            .FirstOrDefaultAsync(i => i.Id == invoice.Id && i.UserId == invoice.UserId);
            
        if (existingInvoice == null)
            throw new Exception("Invoice not found");
            
        // Update properties
        _context.Entry(existingInvoice).CurrentValues.SetValues(invoice);
        existingInvoice.UpdatedAt = DateTime.UtcNow;
        
        // Update items
        _context.InvoiceItems.RemoveRange(existingInvoice.Items);
        existingInvoice.Items = invoice.Items;
        
        await _context.SaveChangesAsync();
        return existingInvoice;
    }
    
    public async Task DeleteInvoiceAsync(int id, string userId)
    {
        var invoice = await _context.Invoices
            .FirstOrDefaultAsync(i => i.Id == id && i.UserId == userId);
            
        if (invoice != null)
        {
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
        }
    }
}
