namespace invoiceFlow.Models;

public class Invoice
{
    public int Id { get; set; }
    public string UserId { get; set; }  // Foreign key to User
    public string CompanyName { get; set; }
    public string CompanyAddress { get; set; }
    public string CityStatePin { get; set; }
    public string InvoiceNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Billing Information
    public string BillingName { get; set; }
    public string BillingAddress { get; set; }
    public DateTime BillingDate { get; set; }
    public string BillingEmail { get; set; }
    
    // Financial Details
    public decimal Subtotal { get; set; }
    public decimal? Discount { get; set; }
    public decimal? Tax { get; set; }
    public decimal? Shipping { get; set; }
    public decimal Total { get; set; }
    public string Notes { get; set; }
    
    // Navigation properties
    public User User { get; set; }
    public ICollection<InvoiceItem> Items { get; set; }
    
}