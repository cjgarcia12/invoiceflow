import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface invoiceProps {
  invoiceTitle: string;
  invoiceContent: string;
  invoiceFooter: string;
  invoiceId: number;
}

const InvoiceCard = ({
  invoiceTitle,
  invoiceContent,
  invoiceFooter,
  invoiceId,
}: invoiceProps) => {
  return (
    <Link
      href={`/invoice/${invoiceId}`}
      className="hover:scale-105 transition duration-300 ease-in-out"
    >
      <Card>
        <CardHeader>
          <div className="h-[125px] overflow-hidden">
            <Image
              src="/invoice.png"
              width={400}
              height={300}
              alt="Picture of invoice"
            />
          </div>
          <CardTitle className="text-center">{invoiceTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{invoiceContent}</p>
        </CardContent>
        <CardFooter>
          <p>{invoiceFooter}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
export default InvoiceCard;
