import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TableHeaderProps {
    children: React.ReactNode;
}

interface TableCellProps {
    children?: React.ReactNode;
}

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
    items?: Array<{
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

const InvoiceTemplate: React.FC<{ data?: InvoiceData }> = ({ data = {} }) => {
    const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
        <th className="p-2 border border-gray-600 text-left">{children}</th>
    );

    const TableCell: React.FC<TableCellProps> = ({ children }) => (
        <td className="p-2 border border-gray-600">{children}</td>
    );

    const formatCurrency = (amount?: number): string => {
        return amount?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        }) ?? '';
    };

    return (
        <Card className="max-w-4xl mx-auto p-8">
            <CardContent>
                {/* Header Section */}
                <div className="flex justify-between mb-8">
                    <div>
                        <img src="/invoiceLogo.webp" alt="Company Logo" className="mb-4" width={300} />
                    </div>
                    <div className="text-right">
                        <p className="text-sm">{data.companyName ?? 'Your Company Name'}</p>
                        <p className="text-sm">{data.companyAddress ?? 'Your Company Address'}</p>
                        <p className="text-sm">{data.cityStatePin ?? 'City, State Pin'}</p>
                    </div>
                </div>

                {/* Invoice Info */}
                <div className="mb-8">
                    <p>Invoice No: {data.invoiceNumber}</p>
                </div>

                {/* Billing Information */}
                <div className="mb-8">
                    <h2 className="font-bold mb-4">BILLING INFORMATION</h2>
                    <div className="space-y-2">
                        <p>Name: {data.billingInfo?.name}</p>
                        <p>Address: {data.billingInfo?.address}</p>
                        <p>Date: {data.billingInfo?.date}</p>
                        <p>Email: {data.billingInfo?.email}</p>
                    </div>
                </div>

                {/* Invoice Table */}
                <table className="w-full mb-8">
                    <thead>
                    <tr className="bg-gray-50">
                        <TableHeader>DESCRIPTION</TableHeader>
                        <TableHeader>HOURS</TableHeader>
                        <TableHeader>COST</TableHeader>
                        <TableHeader>AMOUNT</TableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {(data.items ?? Array(9).fill({})).map((item, index) => (
                        <tr key={index}>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.hours}</TableCell>
                            <TableCell>{formatCurrency(item.cost)}</TableCell>
                            <TableCell>{formatCurrency(item.amount)}</TableCell>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Notes Section */}
                <div className="mb-8">
                    <p className="font-bold mb-2">Notes:</p>
                    <p>{data.notes}</p>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                    <p>yourmailaddress@mail.com</p>
                    <p>123-456-7890</p>
                </div>

                {/* Totals */}
                <div className="space-y-2 text-right">
                    <p>SUBTOTAL: {formatCurrency(data.subtotal)}</p>
                    <p>DISCOUNT: {formatCurrency(data.discount)}</p>
                    <p>TAX: {formatCurrency(data.tax)}</p>
                    <p>SHIPPING: {formatCurrency(data.shipping)}</p>
                    <p className="font-bold">TOTAL: {formatCurrency(data.total)}</p>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>© Invoice Flow</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default InvoiceTemplate;