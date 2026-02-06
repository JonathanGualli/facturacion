import { useState } from "react";
import { useFacturas } from "../../../hooks/useFacturas";
import { InvoicesTable } from "../../../components/Factura/FacturaTable";

export const FacturasPage = () => {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isPlaceholderData } = useFacturas(pagination.pageIndex + 1, pagination.pageSize);

/*   const [facturas, setFacturas] = useState<any[]>([]); */
//  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const facturas = data?.data || [];
  const totalCount = data?.totalCount || 0;

/*   useEffect(() => {
    if (data) setFacturas(data);
  }, [data]);
 */
  return (
    <div className="p-6">
      {/* Header + Switch */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facturas</h1>
        </div>

        {/* <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 text-sm rounded-md transition ${
              viewMode === "table"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            📋 Tabla
          </button>

          <button
            onClick={() => setViewMode("cards")}
            className={`px-4 py-2 text-sm rounded-md transition ${
              viewMode === "cards"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            🧾 Tarjeta
          </button>
        </div> */}
      </div>

      {/* Content */}
      {/* {isLoading ? (
        <p>Cargando facturas...</p>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {facturas.map((factura) => (
            <FacturaCard key={factura.id} factura={factura} />
          ))}
        </div>
      ) : (
        <InvoicesTable data={facturas}></InvoicesTable>
      )} */}
      <InvoicesTable data={facturas} totalCount={totalCount} pagination={pagination} setPagination={setPagination} isLoading={isLoading || isPlaceholderData} />
    </div>
  );
};