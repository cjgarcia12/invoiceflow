import React from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

interface invoiceProps {
    invoiceTitle: string;
    invoiceContent: string;
    invoiceFooter: string;
}

const InvoiceCard = ({ invoiceTitle, invoiceContent, invoiceFooter }: invoiceProps) => {
    return (
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
                <CardTitle className='text-center'>
                    { invoiceTitle }
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{ invoiceContent }</p>
            </CardContent>
            <CardFooter>
                <p>{ invoiceFooter }</p>
            </CardFooter>
        </Card>
    )
}
export default InvoiceCard
