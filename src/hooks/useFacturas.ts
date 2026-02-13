import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchFacturasService } from "../services/api.service"

export const useFacturas = (page: number, pageSize: number, search: string = '') => {

    return useQuery({
        queryKey: ['facturas', page, pageSize, search],
        queryFn: () => fetchFacturasService(page, pageSize, search),
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    })
}