import axios from "axios";

const API_URL = 'https://facturacion.server.coorporativo.live/api';
// const API_URL = 'https://localhost:44323/api';

export const loginService = async (email: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/Auth/login`, { email, password }, {withCredentials: true});
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
export const fetchFacturasService = async (page: number, pageSize: number, search: string = '') => {
    
    const params: any = { page, pageSize}

    // Si existe algo en params lo mandamos, sino pues no.
    if(search) {
        params.search = search;
    }

    const { data } = await axios.get(`${API_URL}/Facturacion/ListarFacturas`, {
        params: params,
        withCredentials: true });
    return data;
}

// Servicio para descargar facturas
export const downloadFacturaService = async (facturaId: number) => {
    const response = await axios.get(`${API_URL}/Facturacion/${facturaId}/pdf`,  {
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
    const response = await axios.get(`${API_URL}/Facturacion/${facturaId}/xml`,  {
        responseType: 'blob',
        headers: {
            'Accept': 'application/xml'
        },
        withCredentials: true, 
    });

    return response.data;
}