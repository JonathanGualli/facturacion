import { useState } from "react";
import { useDownloadFactura } from "../../hooks/useDownloadFactura";
import type { Invoice } from "../../models/factura.model";
import { FileDown, Loader2, KeyRound, Check, FileCode } from "lucide-react";
import { useDownloadXml } from "../../hooks/useDownloadXml";

interface Props {
    invoice: Invoice;
}

export function InvoiceActions({ invoice }: Props) {

    // instanciamos el hook 
    const { mutate: downloadPdf, isPending: isPendingFactura } = useDownloadFactura();
    const { mutate: downloadXml, isPending: isPendingXml } = useDownloadXml();
    const [copied, setCopied] = useState(false);

    const copyAccessKey = (accessKey: string) => {
        navigator.clipboard.writeText(accessKey)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Vuelve al icono original en 2s
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className="flex gap-2">
            {invoice.xml && (
                <button title="Descargar XML"
                onClick={() => downloadXml(invoice.id)}
                disabled = {isPendingXml}
                className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isPendingXml ? (<Loader2 size={18} className="animate-spin"/>) 
                : (<FileCode size={18}/>)} 
                </button>
            )}
            {invoice.xml && (
                <button title="Descargar PDF"
                    onClick={() => downloadPdf(invoice.id)}
                    disabled = {isPendingFactura}
                    className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPendingFactura ? (<Loader2 size={18} className="animate-spin"/>) 
                    : (<FileDown size={18}/>)}
                </button>
            )}
            {invoice.accessKey && (
                <button 
                    title="Copiar clave de acceso"
                    onClick={() => copyAccessKey(invoice.accessKey)}
                    className={`p-2 rounded transition-all duration-300 ${
                        copied ? "bg-green-100 text-green-600" : "hover:bg-gray-100 text-gray-600 hover:text-blue-600"
                    }`}>
                    {copied ? <Check size={18} /> : <KeyRound size={18} />}
                </button>
            )}
            
        </div>
    );
}