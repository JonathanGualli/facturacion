import { useEffect, useState } from "react";
import { useFacturas } from "../../../hooks/useFacturas";
import { InvoicesTable } from "../../../components/Factura/FacturaTable";
import { useDebounce } from "../../../hooks/useDebounce";

export const FacturasPage = () => {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Estado del texto de búscqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Aplicamos el debounde
  const debouncedSearch = useDebounce(searchTerm, 500);

  // Enviamos el debounced al hook
  const { data, isLoading, isPlaceholderData } = useFacturas(
    pagination.pageIndex + 1, 
    pagination.pageSize,
    debouncedSearch
  );

  const facturas = data?.data || [];
  const totalCount = data?.totalCount || 0;

  // Si el usuario busca algo regresar a la página 1
  useEffect(() => {
    setPagination((prev) => ({...prev, pageIndex: 0}));
  }, [debouncedSearch]);

  return (
    <div className="p-6">
      {/* Header + Switch */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facturas</h1>
          <p className="text-gray-500 text-sm">Gestiona tus documentos electrónicos</p>
        </div>

        <div className="w-1/3">
          <input type="text"
                 placeholder="Buscar por número (001-001...)"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>

      </div>
      <InvoicesTable 
        data={facturas} 
        totalCount={totalCount} 
        pagination={pagination} 
        setPagination={setPagination} 
        isLoading={isLoading || isPlaceholderData} 
      />
    </div>
  );
};