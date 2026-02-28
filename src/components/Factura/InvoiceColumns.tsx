import type { ColumnDef } from "@tanstack/react-table";
import type { Invoice } from "../../models/factura.model";
import { InvoiceActions } from "./InvoiceActions";

export const invoiceColumns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "issueDate",
        header: "Fecha Emisión",
        cell: ({row}) => new Date(row.original.issueDate).toLocaleDateString(),
    },
    {
        accessorKey: "invoiceNumber",
        header: "Número Factura",
    },
    {
        accessorKey: "buyerBusinessName",
        header: "Razón Social Comprador",
    },
    {
        accessorKey: "totalAmount",
        header: "Monto Total",
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({row}) => {
            const status = row.original.status;

            const statusStyles: Record<string, string> = {
                PROCESSED: "bg-green-100 text-green-700",
                CANCELLED: "bg-red-100 text-red-700",
                ISSUED: "bg-yellow-100 text-yellow-700",
                ERROR: "bg-gray-100 text-gray-700",
                VOIDED: "bg-red-100 text-red-700",   
            };
            
            // 2. Creas un nuevo mapeo para las traducciones
            const statusTranslations: Record<string, string> = {
                PROCESSED: "PROCESADA",
                CANCELLED: "CANCELADA",
                ISSUED: "EMITIDA",
                ERROR: "ERROR",
                VOIDED: "ANULADA",
            };
            

            return (
                <span
                    className={`px-2 py-1 rounded-md text-xs  ${statusStyles[status]}`}>
                        {statusTranslations[status] || status}
                </span>
            );
        },
    },
    {
        id: "actions",
        header: "Aciones",
        cell: ({ row }) => <InvoiceActions invoice={row.original}/>
    }
]