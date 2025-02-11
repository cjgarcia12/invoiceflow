import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import Header from "@/components/header";
import InvoiceCard from "@/components/InvoiceCard";

const Home: React.FC = async () => {
  // const clerkUser = await currentUser()
  // if (!clerkUser) redirect('/sign-in');
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header>
        <h1 className="text-white">Hello</h1>
        {/*<SignedIn>*/}
        {/*  <UserButton />*/}
        {/*</SignedIn>*/}
      </Header>
      <h1 className="font-mono text-white text-3xl font-bold mb-8 mt-8">
        Invoices
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-4/5">
        <InvoiceCard
          invoiceTitle="invoice no1"
          invoiceContent="card content"
          invoiceFooter="card footer"
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
        />
        <InvoiceCard
          invoiceTitle="invoice no2"
          invoiceContent="cardcontent"
          invoiceFooter="card footer"
        />
      </div>
    </div>
  );
};
export default Home;
