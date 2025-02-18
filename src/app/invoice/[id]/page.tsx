"use client";
import React, {useEffect, useState} from "react";
import InvoiceTemplate from "@/components/InvoiceTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import PDFInvoiceTemplate from "@/components/PDFInvoiceTemplate";
import { pdf } from "@react-pdf/renderer";
import { UserButton } from "@clerk/nextjs";
import {getInvoice, updateInvoice} from "@/lib/api";
import {useRouter} from "next/router";

interface InvoiceData {
  companyName?: string;
  companyAddress?: string;
  cityStatePin?: string;
  invoiceNumber?: string;
  billingInfo?: {
    name: string;
    address: string;
    date: string;
    email: string;
  };
  items: Array<{
    description: string;
    hours: number;
    cost: number;
    amount: number;
  }>;
  notes?: string;
  subtotal?: number;
  discount?: number;
  tax?: number;
  shipping?: number;
  total?: number;
}

const InvoicePage: React.FC = () => {
    const router = useRouter();
  const { id } = router.query;

  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    items: [{ description: "", hours: 0, cost: 0, amount: 0 }],
    companyName: "",
    companyAddress: "",
    cityStatePin: "",
    invoiceNumber: "",
    billingInfo: {
      name: "",
      address: "",
      date: "",
      email: ""
    },
    notes: "",
    subtotal: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    total: 0
  });

  useEffect(() => {
    if (id && typeof id === 'string') {
      getInvoice(parseInt(id))
        .then(data => {
          setInvoiceData(prev => ({
            ...prev,
            ...data
          }));
        })
        .catch(error => {
          console.error('Failed to fetch invoice:', error);
          // Consider adding error handling UI here
        });
    }
  }, [id]);

  const handleUpdateInvoice = async () => {
    if (!id) {
      alert("No Invoice ID Found");
      return;
    }

    const invoiceId = typeof id === 'string' ? parseInt(id) : id;

    try {
      await updateInvoice(invoiceId, invoiceData);
      alert("invoice Saved Successfully");
    } catch (error) {
      console.error("invoice Failed To Save", error);
      alert("Something Went Wrong With Saving. Please try again later.");
    }
  }

  const updateCompanyInfo = (
    field: keyof Omit<InvoiceData, "billingInfo" | "items">,
    value: string | number,
  ) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const updateBillingInfo = (
    field: keyof NonNullable<InvoiceData["billingInfo"]>,
    value: string,
  ) => {
    setInvoiceData((prev) => ({
      ...prev,
      billingInfo: {
        ...prev.billingInfo,
        [field]: value,
      } as InvoiceData["billingInfo"],
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", hours: 0, cost: 0, amount: 0 }],
    }));
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceData["items"][0],
    value: string | number,
  ) => {
    setInvoiceData((prev) => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
      return {
        ...prev,
        items: newItems,
        subtotal: newItems.reduce((sum, item) => sum + item.amount, 0),
      };
    });
  };

  const handleDownload = async () => {
    const blob = await pdf(<PDFInvoiceTemplate data={invoiceData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Header>
        <UserButton />
      </Header>
      <div className="container mx-auto p-4 space-y-8 pt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  value={invoiceData.companyName || ""}
                  onChange={(e) =>
                    updateCompanyInfo("companyName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Company Address</Label>
                <Input
                  value={invoiceData.companyAddress || ""}
                  onChange={(e) =>
                    updateCompanyInfo("companyAddress", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>City, State, Pin</Label>
                <Input
                  value={invoiceData.cityStatePin || ""}
                  onChange={(e) =>
                    updateCompanyInfo("cityStatePin", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Invoice Number</Label>
                <Input
                  value={invoiceData.invoiceNumber || ""}
                  onChange={(e) =>
                    updateCompanyInfo("invoiceNumber", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={invoiceData.billingInfo?.name || ""}
                  onChange={(e) => updateBillingInfo("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={invoiceData.billingInfo?.address || ""}
                  onChange={(e) => updateBillingInfo("address", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={invoiceData.billingInfo?.date || ""}
                  onChange={(e) => updateBillingInfo("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={invoiceData.billingInfo?.email || ""}
                  onChange={(e) => updateBillingInfo("email", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                  <div className="flex-col">
                    <Label>Description</Label>
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex-col">
                    <Label>Hours</Label>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={item.hours}
                      onChange={(e) =>
                        updateItem(index, "hours", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex-col">
                    <Label>Cost</Label>
                    <Input
                      type="number"
                      placeholder="Cost"
                      value={item.cost}
                      onChange={(e) =>
                        updateItem(index, "cost", Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex-col">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={item.amount}
                      onChange={(e) =>
                        updateItem(index, "amount", Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addItem}>Add Item</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input
                  value={invoiceData.notes || ""}
                  onChange={(e) => updateCompanyInfo("notes", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discount</Label>
                  <Input
                    type="number"
                    value={invoiceData.discount || ""}
                    onChange={(e) =>
                      updateCompanyInfo("discount", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax</Label>
                  <Input
                    type="number"
                    value={invoiceData.tax || ""}
                    onChange={(e) =>
                      updateCompanyInfo("tax", Number(e.target.value))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Shipping</Label>
                  <Input
                    type="number"
                    value={invoiceData.shipping || ""}
                    onChange={(e) =>
                      updateCompanyInfo("shipping", Number(e.target.value))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total</Label>
                  <Input
                    type="number"
                    value={invoiceData.total || ""}
                    onChange={(e) =>
                      updateCompanyInfo("total", Number(e.target.value))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-col">
          <div className="w-full flex justify-end pr-4 pb-2">
            <Button
              onClick={handleDownload}
              className="hover:scale-105 transition ease-in-out"
            >
              Download PDF
            </Button>
          </div>
          <div className="w-full flex justify-center bg-gray-800 p-8">
            <div className="w-[210mm] min-h-[297mm] max-sm:scale-75 bg-white shadow-lg">
              <div className="p-8">
                <InvoiceTemplate data={invoiceData} />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end pr-4 pt-2">
            <Button
              onClick={handleUpdateInvoice}
              className="hover:scale-105 transition ease-in-out"
            >
              Save Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
