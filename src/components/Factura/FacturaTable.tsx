/* type Factura = {
  number: string;
  date: string;
  documentoId: string;
  ptEstadoCodigo: string;
  response?: {
    claveAcceso?: string;
  };
};

type Props = {
  facturas: Factura[];
  isLoading?: boolean;
};

export const FacturasTable = ({ facturas, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Cargando facturas...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-600">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
            <th className="px-4 py-3 font-medium">Documento</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Clave de acceso</th>
            <th className="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {facturas.map((factura) => {
            const estado =
              factura.ptEstadoCodigo === "201"
                ? "AUTORIZADO"
                : "PENDIENTE";

            return (
              <tr
                key={factura.number}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {factura.number}
                </td>

                <td className="px-4 py-3">
                  {factura.date}
                </td>

                <td className="px-4 py-3">
                  {factura.documentoId}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      estado === "AUTORIZADO"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {estado}
                  </span>
                </td>

                <td className="px-4 py-3 max-w-60 truncate text-gray-600">
                  {factura.response?.claveAcceso ?? "-"}
                </td>

                <td className="px-4 py-3 text-right">
                  <button className="text-blue-600 hover:underline text-sm">
                    Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {facturas.length === 0 && (
        <div className="p-6 text-center text-gray-500 text-sm">
          No hay facturas registradas
        </div>
      )}
    </div>
  );
};
 */

import { getCoreRowModel, useReactTable, flexRender } from "@tanstack/react-table";
import type { Invoice } from "../../models/factura.model";
import { invoiceColumns } from "./Columns";

interface Props {
  data: Invoice [];
  totalCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (pagination: any) => void;
  isLoading: boolean;
}

export function InvoicesTable({ data, totalCount, pagination, setPagination, isLoading }: Props) {
  
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  const table = useReactTable({
    data,
    columns: invoiceColumns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // ahora lo hará el servidor: getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-xl border bg-white relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 items-center justify-center flex">
          <span className="text-sm font-semibold text-gray-500">Cargando ...</span>
        </div>
      )}
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(group => (
            <tr key={group.id}>
              {group.headers.map(header => (
                <th key={header.id} className="p-3 text-left text-sm">
                  {header.column.columnDef.header as string}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-3 text-sm">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-3 text-sm border-t">
        <span className="text-gray-500">
          {/* Page {table.getState().pagination.pageIndex + 1} */}
          Mostrando {table.getRowModel().rows.length} de {totalCount} registros
        </span>

        <div className="flex gap-2 items-center">
          <span className="mr-2">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </span>
          
          <button onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">
              Anterior
          </button>

          <button
            onClick={() => table.nextPage()} 
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">
              Siguiente
          </button>
        </div>

      </div>
    </div>
  );
}
