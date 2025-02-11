import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
    },
    section: {
        marginBottom: 20,
        borderColor: '#000'
    },
    flexBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textRight: {
        textAlign: 'right',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#bcc8d5',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000000',
    },
    headerCell: {
        width: '25%',
        padding: 8,
        borderRightWidth: 1,
        borderColor: '#000000',
    },
    tableCell: {
        width: '25%',
        padding: 8,
        borderRightWidth: 1,
        borderColor: '#000000',
    },
    footerInc: {
        bottom: 0,
        position: 'absolute',
        textAlign: "center",
        color: '#8d8d8d',
        width: '100%',
        paddingRight: '25px'
    }
});

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

const formatCurrency = (amount?: number): string => {
    return amount?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    }) ?? '';
};

const PDFInvoiceTemplate = ({ data }: { data?: InvoiceData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <View style={styles.flexBetween}>
                <View>
                    <Image src="/invoiceLogo.jpg" style={{ width: 200, marginBottom: 10 }} />
                </View>
                <View style={styles.textRight}>
                    <Text>{data?.companyName || 'Your Company Name'}</Text>
                    <Text>{data?.companyAddress || 'Your Company Address'}</Text>
                    <Text>{data?.cityStatePin || 'City, State Pin'}</Text>
                </View>
            </View>

            {/* Invoice Info */}
            <View style={styles.section}>
                <Text>Invoice No: {data?.invoiceNumber}</Text>
            </View>

            {/* Billing Information */}
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>BILLING INFORMATION</Text>
                <View>
                    <Text>Name: {data?.billingInfo?.name}</Text>
                    <Text>Address: {data?.billingInfo?.address}</Text>
                    <Text>Date: {data?.billingInfo?.date}</Text>
                    <Text>Email: {data?.billingInfo?.email}</Text>
                </View>
            </View>

            {/* Invoice Table */}
            <View style={styles.section}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, { width: '40%' }]}>DESCRIPTION</Text>
                    <Text style={[styles.headerCell, { width: '20%' }]}>HOURS</Text>
                    <Text style={[styles.headerCell, { width: '20%' }]}>COST</Text>
                    <Text style={[styles.headerCell, { width: '20%', borderRightWidth: 0 }]}>AMOUNT</Text>
                </View>

                {/* Table Rows */}
                {(data?.items ?? Array(9).fill({})).map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { width: '40%' }]}>{item.description}</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{item.hours}</Text>
                        <Text style={[styles.tableCell, { width: '20%' }]}>{formatCurrency(item.cost)}</Text>
                        <Text style={[styles.tableCell, { width: '20%', borderRightWidth: 0 }]}>{formatCurrency(item.amount)}</Text>
                    </View>
                ))}
            </View>

            {/* Notes Section */}
            <View style={styles.section}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Notes:</Text>
                <Text>{data?.notes}</Text>
            </View>

            {/* Totals Section */}
            <View style={{ marginTop: 20 }}>
                <Text>SUBTOTAL: {formatCurrency(data?.subtotal)}</Text>
                <Text>DISCOUNT: {formatCurrency(data?.discount)}</Text>
                <Text>TAX: {formatCurrency(data?.tax)}</Text>
                <Text>SHIPPING: {formatCurrency(data?.shipping)}</Text>
                <Text style={{ fontWeight: 'bold' }}>TOTAL: {formatCurrency(data?.total)}</Text>
            </View>

            <View style={styles.footerInc}>
                <Text>© Invoice Flow</Text>
            </View>
        </Page>
    </Document>
);

export default PDFInvoiceTemplate;