import React from "react";
import Header from "@/components/header";
import InvoiceCard from "@/components/InvoiceCard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {createInvoice, getUserInvoices} from "@/lib/api";
import {router} from "next/client";

interface userInvoiceData {
  id: number;
  companyName: string;
  createdAt: string;
  billingName: string;
}

const blankInvoice = {
    companyName: "",
    companyAddress: "",
    cityStatePin: "",
    invoiceNumber: "",
    billingInfo: {
        name: "",
        address: "",
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        email: ""
    },
    items: [
        {
            description: "",
            hours: 0,
            cost: 0,
            amount: 0
        }
    ],
    notes: "",
    subtotal: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    total: 0
};

const handleCreateNewInvoice = async () => {
    try {
        const response = await createInvoice(blankInvoice)
        router.push(`/invoice/${response.id}`)
    } catch (error) {
        console.error('Failed to create invoice:', error)
    }
}

const Dashboard: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
  const userInvoices = await getUserInvoices();
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <h1 className="font-mono text-white text-3xl font-bold mb-8 mt-8">
        Invoices
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-4/5">
        {userInvoices.map((invoice: userInvoiceData) => (
          <InvoiceCard
            key={invoice.id}
            invoiceTitle={invoice.companyName}
            invoiceContent={`Invoice Created At ${invoice.createdAt}`}
            invoiceFooter={invoice.billingName}
            invoiceId={invoice.id}
          />
        ))}
        <div className="flex items-center justify-center">
            <button onClick={handleCreateNewInvoice}>
                <Image
                    src="/plusOne.png"
                    alt="Create an Invoice"
                    width={150}
                    height={150}
                />
            </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
