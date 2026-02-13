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
