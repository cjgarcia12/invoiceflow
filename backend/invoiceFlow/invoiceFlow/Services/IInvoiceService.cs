using invoiceFlow.Models;

namespace invoiceFlow.Services;
public interface IInvoiceService
{
    Task<Invoice> CreateInvoiceAsync(Invoice invoice);
    Task<Invoice> GetInvoiceAsync(int id, string userId);
    Task<IEnumerable<Invoice>> GetUserInvoicesAsync(string userId);
    Task<Invoice> UpdateInvoiceAsync(Invoice invoice);
    Task DeleteInvoiceAsync(int id, string userId);
}
