import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchFacturasService } from "../services/api.service"

export const useFacturas = (page: number, pageSize: number, filterMethod: number, search: string = '', companyId: number) => {

    return useQuery({
        queryKey: ['facturas', page, pageSize, search, filterMethod, companyId],
        queryFn: () => fetchFacturasService(page, pageSize, filterMethod ?? 1, search), // mandamos 1 si no hay nada
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}