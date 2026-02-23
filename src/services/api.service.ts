import axios from "axios";

const API_URL = 'https://facturacion.server.coorporativo.live/api';
// const API_URL = 'https://localhost:5121/api';

interface FetchParams {
    page: number;
    pageSize: number;
    filterMethod: number;
    search?: string;
}

interface FetchParamsExcelexport {
    startDate: string;
    endDate: string;
    filterMethod: number;
    search?: string;
}

export const loginService = async (email: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/Auth/login`, { email, password }, { withCredentials: true });
    return data;
}

// Servicio para registrarse
export const signUpService = async (name: string, email: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/Auth/register`, { name, email, password }, { withCredentials: true });
    return data;
}

// Servicio para cerrar sesión
export const logOutService = async () => {
    const { data } = await axios.post(`${API_URL}/Auth/logout`, {}, { withCredentials: true });
    return data;
}

// Servicio para verificar la autenticación
export const verifyService = async () => {
    const { data } = await axios.get(`${API_URL}/Auth/profile`, { withCredentials: true });
    return data;
}

// Servicio para listar facturas
export const fetchFacturasService = async (page: number, pageSize: number, filterMethod: number, search: string = '') => {

    const params: FetchParams = { page, pageSize, filterMethod }

    // Si existe algo en params lo mandamos, sino pues no.
    if (search) {
        params.search = search;
    }

    const { data } = await axios.get(`${API_URL}/Facturacion/ListarFacturas`, {
        params: params,
        withCredentials: true
    });
    return data;

}

// Servicio para descargar facturas
export const downloadFacturaService = async (facturaId: number) => {
    const response = await axios.get(`${API_URL}/Facturacion/${facturaId}/pdf`, {
        responseType: 'blob',
        headers: {
            'Accept': 'application/pdf'
        },
        withCredentials: true,
    });

    return response.data;
}

// Servicio para descargar factura XML
export const downloadXmlService = async (facturaId: number) => {
    const response = await axios.get(`${API_URL}/Facturacion/${facturaId}/xml`, {
        responseType: 'blob',
        headers: {
            'Accept': 'application/xml'
        },
        withCredentials: true,
    });

    return response.data;
}

// Servicio para exportar reporte a Excel
export const exportExcelService = async (startDate: string, endDate: string, filterMethod: number, search: string = '') => {

    // Armamos los parámetros
    const params: FetchParamsExcelexport = { startDate, endDate, filterMethod };
    if (search) {
        params.search = search;
    }

    const response = await axios.get(`${API_URL}/Facturacion/ExportarExcel`, {
        params: params,
        responseType: 'blob', // Vital para descargar el .xlsx sin corromperlo
        withCredentials: true,
    });

    return response.data;
}