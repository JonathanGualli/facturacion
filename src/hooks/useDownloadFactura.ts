import { useMutation } from "@tanstack/react-query"
import { downloadFacturaService } from "../services/api.service";

export const useDownloadFactura = () => {
    return useMutation({
        mutationFn: (facturaId: number) => downloadFacturaService(facturaId),
        onSuccess: (data, variables) => {
            // crear una url temporal para el blob
            const url = window.URL.createObjectURL(new Blob([data]));

            // crear un elmento
            const link = document.createElement('a');
            link.href = url;

            // Ponerle nombre al archivo
            link.setAttribute('download', `factura_${variables}.pdf`);

            // Agregar al dom
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            // librear memoria
            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.log("Error al descargar la factura:", error);
            alert("No se pudo descargar la factura");
        }
    });
}