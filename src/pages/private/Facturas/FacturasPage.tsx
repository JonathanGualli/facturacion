import { useState } from "react";
import { useFacturas } from "../../../hooks/useFacturas";
import { InvoicesTable } from "../../../components/Factura/FacturaTable";
import { useDebounce } from "../../../hooks/useDebounce";
import { useExportExcel } from "../../../hooks/useExportExcel";

export const FacturasPage = () => {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [filterMethod, setFilterMethod] = useState(1);

  const { data, isLoading, isPlaceholderData } = useFacturas(
    pagination.pageIndex + 1, 
    pagination.pageSize,
    filterMethod,
    debouncedSearch
  );

  const facturas = data?.data || [];
  const totalCount = data?.totalCount || 0;

/*   useEffect(() => {
    setPagination((prev) => ({...prev, pageIndex: 0}));
  }, [debouncedSearch, filterMethod]);
 */
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const { mutate: exportExcel, isPending: isExporting } = useExportExcel();

  return (
    <div className="pt-6 pb-6 pr-10 pl-10 mx-auto">
      
      {/* Header con colores corporativos */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Facturas</h1>
        <p className="text-slate-500 text-sm mt-1">Gestiona y exporta tus documentos electrónicos.</p>
      </div>

      {/* Toolbar */}
      <div className="bg-blue-900 p-3 rounded-xl border border-slate-200 shadow-sm shadow-slate-100 mb-3 flex flex-col lg:flex-row gap- justify-between items-center">
        
        {/* Izquierda: Buscador y Filtros */}
        <div className="flex w-full lg:w-auto gap-2 flex-col sm:flex-row">
          <select 
            value={filterMethod}
            onChange={(e) => {
              setFilterMethod(Number(e.target.value));
              setPagination((prev) => ({...prev, pageIndex: 0}));
            }}
            className="w-full sm:w-40 px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none text-sm transition-all cursor-pointer font-medium"
          >
            <option value={1}>N° Factura</option>
            <option value={2}>Cédula/RUC</option>
          </select>

          <input 
            type="text"
            placeholder={filterMethod === 1 ? "Ej: 001-001..." : "Ej: 1726..."}                  
            className="w-full sm:w-72 px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination((prev) => ({...prev, pageIndex: 0}));
            }}
          />
        </div>

        {/* Derecha: Rango de Fechas y Botón Excel */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3">
            <div className="flex w-full sm:w-auto items-center justify-between gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
              <span className="font-medium">Desde</span>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-700 cursor-pointer"
              />
              <span className="text-slate-300">|</span>
              <span className="font-medium">Hasta</span>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none outline-none text-slate-700 cursor-pointer"
              />
            </div>

            <button 
              onClick={() => exportExcel({ startDate, endDate, filterMethod, search: debouncedSearch })}
              disabled={isExporting}
              className={`w-full sm:w-auto px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                isExporting 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 border border-transparent active:scale-95'
              }`}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Exportando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Descargar Excel
                </>
              )}
            </button>
        </div>
      </div>

      {/* Tabla */}
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