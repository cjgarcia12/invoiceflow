namespace invoiceFlow.Models;

public class InvoiceItem
{
    public int Id { get; set; }
    public int InvoiceId { get; set; } // Foreign Key to Invoice
    public string Description { get; set; }
    public decimal Hours { get; set; }
    public decimal Cost { get; set; }
    public decimal Amount { get; set; }
    
    // Navigation Property
    public Invoice Invoice { get; set; }
}