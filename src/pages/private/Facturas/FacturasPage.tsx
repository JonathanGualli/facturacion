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

  // Aplicamos el metodo de filtrado
  const [filterMethod, setFilterMethod ] = useState(1);

  // Enviamos el debounced al hook
  const { data, isLoading, isPlaceholderData } = useFacturas(
    pagination.pageIndex + 1, 
    pagination.pageSize,
    filterMethod,
    debouncedSearch
  );

  const facturas = data?.data || [];
  const totalCount = data?.totalCount || 0;

  // Si el usuario busca algo regresar a la página 1
  useEffect(() => {
    setPagination((prev) => ({...prev, pageIndex: 0}));
  }, [debouncedSearch, filterMethod]);

  return (
    <div className="p-6">
      {/* Header + Switch */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-5">
        <div className="flex-5">
          <h1 className="text-2xl font-bold">Facturas</h1>
          <p className="text-gray-500 text-sm">Gestiona tus documentos electrónicos</p>
        </div>

        <div className="flex flex-row justify-between gap-3 flex-5">
          {/* Selector de Método de Filtro */}
          <select 
            value={filterMethod}
            onChange={(e) => setFilterMethod(Number(e.target.value))}
            className="flex-1 px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value={1}>N° Factura</option>
            <option value={2}>Cédula/RUC</option>
          </select>

          <div className="flex-3">
            <input type="text"
                  placeholder={filterMethod === 1 ? "Ej: 001-001..." : "Ej: 1726..."}                  
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
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