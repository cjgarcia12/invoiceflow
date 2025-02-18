// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { auth } from "@clerk/nextjs";
import {redirect} from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const session = await auth();
    if (!session || !session.userId) {
        throw new Error('Not authenticated');
    }

    // Get the session token
    const token = await auth().getToken();

    return fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
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

// Update the type annotations to use InvoiceData
export async function createInvoice(invoiceData: InvoiceData) {
    const response = await fetchWithAuth('/api/invoice', {
        method: 'POST',
        body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
        throw new Error('Failed to create invoice');
    }

    return response.json();
}

export async function getInvoice(id: number) {
    const response = await fetchWithAuth(`/api/invoice/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch invoice');
    }

    return response.json();
}

export async function getUserInvoices() {
    const response = await fetchWithAuth('/api/invoice');

    if (!response.ok) {
        throw new Error('Failed to fetch invoices');
    }

    return response.json();
}

export async function updateInvoice(id: number, invoiceData: InvoiceData) {
    const response = await fetchWithAuth(`/api/invoice/${id}`, {
        method: 'PUT',
        body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
        throw new Error('Failed to update invoice');
    }

    return response.json();
}

export async function deleteInvoice(id: number) {
    const response = await fetchWithAuth(`/api/invoice/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete invoice');
    }
}
