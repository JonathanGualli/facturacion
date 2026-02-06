export type InvoiceStatus = 
    | "ISSUED"
    | "PROCESSED"
    | "CANCELLED"
    | "ERROR";

export interface Invoice { 
    id: number;
    issueDate: string; 
    invoiceNumber: string;
    accessKey: string;
    buyerBusinessName: string;
    totalAmount: number;
    status: InvoiceStatus;
    xml?: string;
}