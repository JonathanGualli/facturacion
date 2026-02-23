import { useMutation } from "@tanstack/react-query";
import { exportExcelService } from "../services/api.service";

// Interfaz para agrupar los parámetros
interface ExportExcelVariables {
    startDate: string;
    endDate: string;
    filterMethod: number;
    search: string;
}

export const useExportExcel = () => {
    return useMutation({
        mutationFn: (variables: ExportExcelVariables) =>
            exportExcelService(variables.startDate, variables.endDate, variables.filterMethod, variables.search),
        onSuccess: (data, variables) => {
            // crear una url temporal para el blob
            const url = window.URL.createObjectURL(new Blob([data]));

            // crear un elmento
            const link = document.createElement('a');
            link.href = url;

            // Ponerle nombre al archivo usando las fechas enviadas
            link.setAttribute('download', `Reporte_${variables.startDate}_al_${variables.endDate}.xlsx`);

            // Agregar al dom
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);

            // liberar memoria
            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.log("Error al descargar el Excel:", error);
            alert("No se pudo descargar el reporte de facturas");
        }
    });
}