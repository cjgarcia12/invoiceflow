using invoiceFlow.Models;
using Microsoft.EntityFrameworkCore;

namespace invoiceFlow.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceItem> InvoiceItems { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure relationships
        modelBuilder.Entity<Invoice>()
            .HasOne(i => i.User)
            .WithMany(u => u.Invoices)
            .HasForeignKey(i => i.UserId);
            
        modelBuilder.Entity<InvoiceItem>()
            .HasOne(ii => ii.Invoice)
            .WithMany(i => i.Items)
            .HasForeignKey(ii => ii.InvoiceId);
            
        // Configure decimal precision
        modelBuilder.Entity<InvoiceItem>()
            .Property(ii => ii.Cost)
            .HasPrecision(18, 2);
            
        modelBuilder.Entity<InvoiceItem>()
            .Property(ii => ii.Amount)
            .HasPrecision(18, 2);
            
        modelBuilder.Entity<Invoice>()
            .Property(i => i.Total)
            .HasPrecision(18, 2);
    }
}
