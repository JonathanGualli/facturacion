type FacturaProps = {
  factura: any;
};

export const FacturaCard = ({ factura }: FacturaProps) => {
  const estado =
    factura.ptEstadoCodigo === "201" ? "AUTORIZADO" : "PENDIENTE";

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">
          Factura #{factura.number}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            estado === "AUTORIZADO"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {estado}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <p><strong>Fecha:</strong> {factura.date}</p>
        <p><strong>Ambiente:</strong> PRODUCCIÓN</p>
        <p><strong>Total:</strong> $12.32</p>
        <p><strong>Documento:</strong> {factura.documentoId}</p>
      </div>

      <div className="mt-3 text-xs text-gray-500 truncate">
        <strong>Clave acceso:</strong> {factura.response?.claveAcceso}
      </div>
    </div>
  );
};
