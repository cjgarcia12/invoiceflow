import React from "react";
import Header from "@/components/header";
import InvoiceCard from "@/components/InvoiceCard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Dashboard: React.FC = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");
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
        <InvoiceCard
          invoiceTitle="invoice no1"
          invoiceContent="card content"
          invoiceFooter="card footer"
          invoiceId={1}
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
          invoiceId={2}
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
          invoiceId={3}
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
          invoiceId={4}
        />
        <div className="flex items-center justify-center">
          <Link href="/invoice/21">
            <Image
              src="/plusOne.png"
              alt="Create an Invoice"
              width={150}
              height={150}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
