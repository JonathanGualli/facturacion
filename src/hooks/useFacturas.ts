import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchFacturasService } from "../services/api.service"

export const useFacturas = (page: number, pageSize: number) => {

    return useQuery({
        queryKey: ['facturas', page, pageSize],
        queryFn: () => fetchFacturasService(page, pageSize),
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}