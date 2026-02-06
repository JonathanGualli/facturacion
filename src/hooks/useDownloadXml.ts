import { useMutation } from "@tanstack/react-query";
import { downloadXmlService } from "../services/api.service";

export const useDownloadXml = () => {
    return useMutation({
        mutationFn: (facturaId: number) => downloadXmlService(facturaId),
        onSuccess: (data, variables) => { 
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `factura_${variables}.xml`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.log("Error al descargar el XML de la factura:", error);
            alert("No se pudo descargar el XML de la factura");
        }
    });
}